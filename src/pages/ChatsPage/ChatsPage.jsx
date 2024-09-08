
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

    // getting chats of user and currentChat from loader function
    const [chatsLoader, currentChatLoader] = useLoaderData()

    // creating useState variable chats
    let [chats, setChats] = useState(chatsLoader)

    // creating useState variable currentChat
    let [currentChat, setCurrentChat] = useState(currentChatLoader)

    // creating useState variable newMessage
    let [newMessage, setNewMessage] = useState("")

    // useEffect function to update chats
    useEffect(()=>{
        const interval = setInterval( async () => {
            // getting currentUserInfo
            const currentUserInfo = await getCurrentUserInfo()

            // getting chats
            chats = await getUsersChats(currentUserInfo.id)

            // setting chats
            setChats(chats)

            // getting currentChat
            currentChat = await getRequest(`http://localhost:3000/currentChat/`)

            // setting currentChat
            setCurrentChat(currentChat)

        }, 200)

        return () => ( clearInterval(interval) )
    })

    const setChat = async (newChat) => {
        try {
            await putRequest(`http://localhost:3000/currentChat/`, newChat)
        } catch {
            throw new Error("Error during updating current chat")
        }

        setCurrentChat(newChat)
    }

    const sendMessage = async () => {
        // checking if message is empty
        if (newMessage == "") {
            return
        }

        // getting currentUserInfo 
        const currentUser = await getCurrentUserInfo()

        // sending message
        let newPayload = {
            "id": crypto.randomUUID,
            "chatID": currentChat.id,
            "ownerID": currentUser.id,
            "ownerName": currentUser.login,
            "message": newMessage
        }

        try {
            await postRequest("http://localhost:3000/messages/", newPayload)
        } catch {
            throw new Error("Error during sending message")
        }

        // changing last message
        currentChat.lastMessage = newMessage

        try {
            await putRequest("http://localhost:3000/currentChat/", currentChat)
        } catch {
            throw new Error("Error during sending message")
        }

        try {
            await putRequest(`http://localhost:3000/chats/${currentChat.id}`, currentChat)
        } catch {
            throw new Error("Error during sending message")
        }

        setNewMessage("")

    }

    return (
        // main container
        <div className="container-fluid d-flex gap-2">

            {/* left side of the layout */}
            <div className="col-lg-2 col-md-3 col-sm-3 col-3 bg-light d-flex flex-column gap-3 p-3 shadow-lg border border-dark rounded sideBar">
                
                {/* displaying chats of user */}
                {chats.map((chat)=>(
                    <div    className={`container-fluid d-flex flex-column shadow p-2 
                                    ${currentChat.id == chat.id ? "text-light bg-primary" 
                                        : "text-primary bg-outline-primary"} 
                                    rounded border border-1 border-primary chatHover`} 
                            onClick={()=>{ setChat(chat) }}>
                        
                        {/* title of conversation */}
                        <p className="text-center fw-bold">{chat.name}</p>
                        <p className="text-center fst-italic">{chat.lastMessage}</p>
                    </div>
                ))}
            
            </div>

            {/* right side of the layout */}
            <div className={`col-lg-10 col-md-9 col-sm-9 col-9 ${currentChat.id != "" ? "" : "my-auto"}`}>

                {currentChat.id == "" ? 
                    <h1 className="display-3 fw-bold text-center">Here you will see your chat!</h1>
                : ""}

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

    if (currentUser == undefined) {
        return redirect("/")
    }

    // getting usersChats
    const chats = await getUsersChats(currentUser.id)

    // getting currentChat
    const currentChat = await getRequest("http://localhost:3000/currentChat/")

    // returning chats
    return [chats, currentChat]
}