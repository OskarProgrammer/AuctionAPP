
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

    // creating useState variable messages
    let [messages, setMessages] = useState([])


    // useEffect function to fetch messages
    useEffect(()=>{
        // creating interval
        const interval = setInterval( async () => {

            // getting currentChat and setting chat
            chat = await getRequest(`http://localhost:3000/currentChat/`)
            setChat(chat)

            // getting messages and setting messages
            messages = await getChatMessages(chat.id)
            setMessages(messages.reverse())

            // getting currentUser and setting currentUser
            currentUser = await getCurrentUserInfo()
            setCurrentUser(currentUser)

        }, 100)

        return () => { clearInterval(interval) }

    })

    const amountOfPeople = chat.participants.length-1

    return (

        // container of chat
        <div className="container-fluid chatContainer 
                        d-flex flex-column-reverse 
                        p-3 
                        shadow-lg 
                        border border-dark rounded">

            {/* displaying all messages from the array messages */}
            { messages.map( (message) => {
                const sideOfMessage = message.ownerID == currentUser.id ? "justify-content-end" : "justify-content-start"

                return (
                    <div className={`message container-fluid d-flex text-dark ${ sideOfMessage }`}>

                        {/* message component */}
                        <MessageTab messageInfo={message} 
                                    currentUser={currentUser}/>

                    </div>
                )
            })}

            {/* beginning header of chat */}
            <h3 className=" display-3 
                            p-3 
                            text-center">
                
                {/* displaying amount of people */}
                Chat with {amountOfPeople}{ amountOfPeople == 1 ? " person" : " people"}<br/>

                {/* displaying people in taking part in group */}
                <p className="people text-muted">
                    { chat.participants.map( (person) => {

                        // returning if person is not the currentUser to avoid unlogical list, because you
                        // are not chatting with yourself
                        if (person != currentUser.id) {
                            return <PersonTab personID={person}/>
                        }
                    })}
                </p>

            </h3>
            
        </div>
        )
}