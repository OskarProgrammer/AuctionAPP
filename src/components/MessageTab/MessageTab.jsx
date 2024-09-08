
// importing styles
import "./MessageTab.css"

export const MessageTab = (props) => {

    // getting message from props
    const message = props.messageInfo

    // getitng currentUser from props
    const currentUser = props.currentUser

    return (
        <>
            {/* message container */}
            { message.ownerID == currentUser.id ? <p className="fs-3 bg-primary text-light p-3 rounded">{message.message}</p> : 
            <p className="fs-3 bg-dark text-light p-3 rounded">{message.ownerName} : {message.message}</p>}
        </>
    )
}
