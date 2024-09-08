
// importing styles
import "./MessageTab.css"

// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/functions"

export const MessageTab = (props) => {

    // getting message from props
    const message = props.messageInfo

    // getitng currentUser from props
    const currentUser = props.currentUser

    // creating useState variable messageAuthorInfo
    let [messageAuthorInfo, setMessageAuthorInfo] = useState({})


    // useEffect to message author info
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            // getting message author info
            messageAuthorInfo = await getRequest(`http://localhost:3000/users/${message.ownerID}`)

            // setting messageAuthorInfo
            setMessageAuthorInfo(messageAuthorInfo)
        }, 1)

        return () => { clearTimeout(timeout) }
    })

    return (
        <>
            {/* message container */}
            { message.ownerID == currentUser.id ? <p className="fs-3 bg-primary text-light p-3 rounded">{message.message}</p> : 
            <p className="fs-3 bg-dark text-light p-3 rounded">{messageAuthorInfo.login} : {message.message}</p>}
        </>
    )
}
