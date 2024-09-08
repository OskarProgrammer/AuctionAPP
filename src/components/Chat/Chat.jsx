
//  importing styles
import "./Chat.css"

// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getChatMessages, getCurrentUserInfo, getRequest } from "../../api_functions/functions"

// importing components
import { MessageTab } from "../MessageTab/MessageTab"
import { PersonTab } from "../PersonTab/PersonTab"

export const Chat = (props) => {


    // creating useState variable of chat
    let [chat, setChat] = useState(props.chatInfo)

    // creating useState variable currentUserInfo
    let [currentUser, setCurrentUser] = useState({
        id : ""
    })

    // creasting useState variable messages
    let [messages, setMessages] = useState([])

    // useEffect function to fetch messages
    useEffect(()=>{
        const interval = setInterval( async () => {
            // getting currentChat
            chat = await getRequest(`http://localhost:3000/currentChat/`)

            // setting chat
            setChat(chat)

            // getting messages
            messages = await getChatMessages(chat.id)

            // setting messages
            setMessages(messages.reverse())

            // getting currentUser
            currentUser = await getCurrentUserInfo()
        
            // setting currentUser
            setCurrentUser(currentUser)

        }, 100)


        return () => { clearInterval(interval) }
    })

    return (
        <div className="container-fluid chatContainer d-flex flex-column-reverse p-3 shadow-lg border border-dark rounded">

            { messages.map( (message) => {

                return (
                    <div className={`message container-fluid d-flex text-dark ${ message.ownerID == currentUser.id ?
                        "justify-content-end" : "justify-content-start"}`}>
                
                        <MessageTab messageInfo={message} currentUser={currentUser}/>
    
                    </div>
                )
            })}

            <h1 className="display-3 p-3 text-center">
                Chat with {chat.participants.length-1}{chat.participants.length-1 == 1 ? " person" : " people"}<br/>
            
                <p className="people text-muted">
                    {chat.participants.map((person) => {

                        // returning if person is not the currentUser to avoid unlogical list, because you
                        // are not chatting with yourself
                        if (person != currentUser.id) {
                            return <PersonTab personID={person}/>
                        }

                    })}
                </p>

            </h1>
            
        </div>
        )
}