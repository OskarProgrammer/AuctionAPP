
// importing styles
import "./MessageTab.css"

// importing functions and components from react library
import { useState } from "react"

// importing date functions
import { getMinutesDiff, getSecondsDiff } from "../../date_functions/date_functions"

export const MessageTab = (props) => {

    // getting message from props
    const message = props.messageInfo

    // getitng currentUser from props
    const currentUser = props.currentUser

    // creating useState variable isExpanded
    let [isExpanded, setIsExpanded] = useState(false)

    const diff = () =>{
        
        if (getSecondsDiff(new Date(), new Date(message.createdAt)) > 60){
            return "Sent " + getMinutesDiff(new Date(), new Date(message.createdAt)) + " minutes ago"
        } 

        return "Sent " + getSecondsDiff(new Date(), new Date(message.createdAt)) + " seconds ago"
    }

    return (
        <>

            {/* message container */}
            { message.ownerID == currentUser.id ? 
            <div className="d-flex flex-column my-2">
                <span className="fs-3 bg-primary text-light p-3 rounded text-center messageSize text-wrap" onClick={()=>{setIsExpanded(!isExpanded)}} >{message.message}</span> 
                {isExpanded ? <span className="text-center">{ diff() }</span> : ""}
            </div>
            : 
            <div className="d-flex flex-column my-2 ">
                <span className="fs-3 bg-dark text-light p-3 rounded text-center messageSize" onClick={()=>{setIsExpanded(!isExpanded)}} >{message.ownerName} : {message.message}</span>
                {isExpanded ? <span className="text-center">{ diff() }</span> : ""}
            </div>}

        </>
    )
}
