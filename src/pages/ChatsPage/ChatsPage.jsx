
// importing styles
import "./ChatsPage.css"

// importing functions and compontents from react library
import { redirect, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUserInfo, getRequest, getUsersChats, postRequest, putRequest } from "../../api_functions/functions"

//importing components
import { Chat } from "../../components/Chat/Chat"

export const ChatsPage = () => {

    // getting data from loader
    const [chatsLoader, currentChatLoader] = useLoaderData()

    // creating useState variables
    let [chats, setChats] = useState(chatsLoader)
    let [currentChat, setCurrentChat] = useState(currentChatLoader)
    let [currentUser, setCurrentUser] = useState({})
    let [newMessage, setNewMessage] = useState("")


    // useEffect function to update chats
    useEffect(()=>{

        const interval = setInterval( async () => {

            // getting and setting currentUser
            currentUser = await getCurrentUserInfo()
            setCurrentUser(currentUser)

            // getting and setting chats
            chats = await getUsersChats(currentUser.id)
            setChats(chats)

            // getting and setting currentChat
            currentChat = await getRequest(`http://localhost:3000/currentChat/`)
            setCurrentChat(currentChat)

        }, 100)

        return () => ( clearInterval(interval) )
    })

    // changing currentChat
    const setChat = async (newChat) => {
        try {
            await putRequest(`http://localhost:3000/currentChat/`, newChat)
        } catch {
            throw new Error("Error during updating current chat")
        }

        setCurrentChat(newChat)
    }

    // sending message 
    const sendMessage = async () => {
        // checking if message is empty
        if (newMessage == "") { return }

        // creating newMessageObject object
        let newMessageObject = {
            "id": crypto.randomUUID,
            "chatID": currentChat.id,
            "ownerID": currentUser.id,
            "ownerName": currentUser.login,
            "message": newMessage,
            "createdAt" : new Date()
        }

        // sending newMessageObject
        try {
            await postRequest("http://localhost:3000/messages/", newMessageObject)
        } catch {
            throw new Error("Error during sending message")
        }

        // changing last message to newMessage
        currentChat.lastMessage = newMessage

        // updating currentChatData
        try {
            await putRequest("http://localhost:3000/currentChat/", currentChat)
        } catch {
            throw new Error("Error during sending message")
        }

        // updating data in chats table
        try {
            await putRequest(`http://localhost:3000/chats/${currentChat.id}`, currentChat)
        } catch {
            throw new Error("Error during sending message")
        }

        // clearing newMessage field
        setNewMessage("")
    }

    return (
        // main container
        <div className="container-fluid d-flex gap-2">

            {/* left side of the container */}
            <div className="col-lg-2 col-md-3 col-sm-3 col-3 bg-light d-flex flex-column gap-3 p-3 shadow-lg border border-dark rounded sideBar">

                {/* header of left side  */}
                <h3 className="display-6 text-center">Your chats: </h3>

                {/* displaying chats of currentUser */}
                {chats.map((chat)=>{
                    const backgroundColor = currentChat.id == chat.id ? "text-light bg-primary" 
                                                                      : "text-primary bg-outline-primary"

                    return (
                        <div className={`container-fluid d-flex flex-column 
                                        shadow p-2 ${backgroundColor} rounded 
                                        border border-1 border-primary chatHover`} 
                             onClick={()=>{ setChat(chat) }}>
                
                            {/* title of conversation */}
                            <p className="text-center fw-bold">{chat.name}</p>
                            <p className="text-center fst-italic">{chat.lastMessage}</p>

                        </div>
                    )
                })}
            
            </div>

            {/* right side of the container */}
            <div className={`col-lg-10 col-md-9 col-sm-9 col-9 ${currentChat.id != "" ? "" : "my-auto"}`}>

                {/* displaying if user did not choose the chat to display */}
                {currentChat.id == "" ? 
                    <h1 className="display-3 fw-bold text-center">Here you will see your chat!</h1>
                : ""}

                {/* displaying if user chose the chat to display */}
                {currentChat.id != "" ? 

                    <div className="container-fluid col-12 d-flex flex-column gap-2">
                        <h2 className="display-5 text-center">{currentChat.name}</h2>

                        {/*  chat container */}
                        <Chat chatInfo={currentChat}/>

                        {/* new message input */}
                        <div className="container-fluid d-flex flex-row gap-2">

                            {/* input message */}
                            <input  type="text" 
                                    value={newMessage} 
                                    onChange={(e)=>{setNewMessage(e.target.value)}}
                                    className="text p-2 rounded border border-1 border-dark 
                                                fs-4 col-lg-11 col-md-10 col-9" />

                            {/* button to send message */}
                            <button className="btn btn-outline-success col-lg-1 col-md-2 col-3" 
                                    onClick={()=>{sendMessage()}}>
                                        <i className="bi bi-send fs-2"/>
                            </button>

                        </div>
                        
                    </div>
                : ""}

            </div>

        </div>
    )
}

export const chatsLoader = async () => {

    // getting currentUserInfo
    const currentUser = await getCurrentUserInfo()

    // checking if user is logged in
    if (currentUser == undefined) { return redirect("/") }

    // getting usersChats
    const chats = await getUsersChats(currentUser.id)

    // getting currentChat
    const currentChat = await getRequest("http://localhost:3000/currentChat/")

    // returning chats and currentChat 
    return [chats, currentChat]

}