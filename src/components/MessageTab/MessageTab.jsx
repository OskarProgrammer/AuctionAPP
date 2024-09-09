
// importing styles
import "./MessageTab.css"

// importing functions and components from react library
import { useState } from "react"

// importing date functions
import { getHoursDiff, getMinutesDiff, getSecondsDiff } from "../../date_functions/date_functions"

export const MessageTab = (props) => {

    // getting data from props
    // messageInfo
    const message = props.messageInfo
    // currentUser
    const currentUser = props.currentUser

    // creating useState variable isExpanded
    let [isExpanded, setIsExpanded] = useState(false)

    const diff = () =>{
        // creating format
        const responseFormat = ( text ) =>{
            return "Sent " + text + " ago"
        }

        // creating current date
        const currentDate = new Date()

        // getting diff between current date and date of creating the message
        const secondsDiff = getSecondsDiff(currentDate, new Date(message.createdAt))
        const minutesDiff = getMinutesDiff(currentDate, new Date(message.createdAt))
        const hoursDiff = getHoursDiff(currentDate, new Date(message.createdAt))
        
        if ( secondsDiff > 60 ){
            if ( minutesDiff > 60) {
                return responseFormat(`${hoursDiff} hours`)
            }else{
                return responseFormat(`${minutesDiff} minutes`)
            }
        } else {
            return responseFormat(`${secondsDiff} seconds`)
        }

    }

    // creating format of message
    const timeOfSending = isExpanded ? <span className="text-center">{ diff() }</span> : ""

    
    return (
        <>

            {/* message container */}
            { message.ownerID == currentUser.id ? 

                // displaying message from current user
                <div className="d-flex flex-column my-2">
                    
                    <span className="fs-5 bg-primary text-light p-3 rounded text-center messageSize text-wrap" onClick={()=>{setIsExpanded(!isExpanded)}} >{message.message}</span> 
                    {timeOfSending}

                </div>
                : 
                // displaying message from other user
                <div className="d-flex flex-column my-2 ">

                    <span className="fs-5 bg-dark text-light p-3 rounded text-center messageSize" onClick={()=>{setIsExpanded(!isExpanded)}} >{message.ownerName} : {message.message}</span>
                    {timeOfSending}

                </div>
            }
        </>
    )
}
