
// importing styles
import "./UserSettingsPage.css"

// importing api functions
import { getCurrentUserInfo, putRequest } from "../../api_functions/functions"

// importing functions and components from react library 
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"


export const UserSettingsPage = () => {

    // getting loader data
    const loaderData = useLoaderData()

    // declaring and initializing useState variable
    let [currentUser, setCurrentUser] = useState(loaderData)

    // declaring and initiliainzg useState variable isPasswordBeingModified
    let [isPasswordBeingModified, setIsPasswordBeingModified] = useState(false)

    // declaring and initializing useState variable newPassword
    let [newPassword, setNewPassword] = useState("")

    // declaring and initiliainzg useState variable isLoginBeingModified
    let [isLoginBeingModified, setIsLoginBeingModified] = useState(false)

    // declaring and initializing useState variable newLogin
    let [newLogin, setNewLogin] = useState("")

    // declaring and initiliazing useState variable loginMessage
    let [loginMessage, setLoginMessage] = useState("")

    // declaring and initiliazing useState variable passwordMessage
    let [passwordMessage, setPasswordMessage] = useState("")

    // function that modifies login
    const modifyLogin = async () => {
        // checking if newLogin is not empty
        if ( newLogin == "" ) {
            // setting loginMessage
            setLoginMessage("New login cannot be empty")

            // hiding form
            setIsLoginBeingModified(false)

            return
        }

        // setting newLogin
        currentUser.login = newLogin

        // putting new data into db.json
        try {
            await putRequest(`http://localhost:3000/users/${currentUser.id}`,currentUser)
        } catch {
            // setting loginMessage
            setLoginMessage("Something went wrong during updating data")
            return
        }

        // setting newLogin useState variable to default
        setNewLogin("")

        // getting new current user data
        currentUser = await getCurrentUserInfo()
        
        // setting useState variable
        setCurrentUser(currentUser)

        // setting loginMessage
        setLoginMessage("Login has been changed successfully")

        // hiding form
        setIsLoginBeingModified(false)
    }

    // function that modifies password
    const modifyPassword = async () => {
        // checking if newPassword is not empty
        if ( newPassword == "" ) {
            // setting loginMessage
            setPasswordMessage("New password cannot be empty")

            // hiding form
            setIsPasswordBeingModified(false)

            return
        }

        // setting newPassword
        currentUser.password = newPassword

        // putting new data into db.json
        try {
            await putRequest(`http://localhost:3000/users/${currentUser.id}`,currentUser)
        } catch {
            // setting passMessage
            setPasswordMessage("Something went wrong during updating data")
            return
        }

        // setting newPassword useState variable to default
        setNewPassword("")

        // getting new current user data
        currentUser = await getCurrentUserInfo()
        
        // setting useState variable
        setCurrentUser(currentUser)

        // setting passwordMessage
        setPasswordMessage("Password has been changed successfully")

        // hiding form
        setIsPasswordBeingModified(false)
    }

    // preview page
    return (
        <>
            <div className="container-fluid p-3 text-center d-flex flex-column gap-3">
            
            {/* header of the subpage */}
            <h1 className="display-4 fw-bold mb-5">User data page</h1>
            
            {/* login div */}
            <div className="container d-flex flex-column gap-3 shadow-lg p-3 col-lg-6 col-md-10 col-sm-10 col-12 gap-3">

                {/* displaying login */}
                <p className="fs-4"> Login : {currentUser.login} </p>

                {/* displaying form message, negative or positive depending on result of the action */}
                {loginMessage != "" ? <p className="fs-4">{loginMessage}</p> : ""}

                <button className="btn btn-outline-primary col-lg-3 col-sm-4 col-5 mx-auto" onClick={()=>{ setIsLoginBeingModified(!isLoginBeingModified); setLoginMessage("");}}>
                    {isLoginBeingModified ? "Hide form" : "Modify"}
                </button>

                {/* new login form */}
                {isLoginBeingModified ? 

                    <div className="container d-flex flex-column col-6 gap-3">

                        <input  type="text" 
                                value={newLogin} 
                                className="text-center col-10 mx-auto p-2" 
                                onChange={(e)=>{setNewLogin(e.target.value)}}
                                placeholder="Your new login"/>

                        <button className="btn btn-outline-success col-5 mx-auto" onClick={()=>{modifyLogin()}} >Confirm</button>

                    </div> 
                :""}
            </div>


            {/* password div */}
            <div className="container d-flex flex-column gap-3 shadow-lg p-3 col-lg-6 col-md-10 col-sm-10 col-12 gap-3">

                {/* displaying password */}
                <p className="fs-4"> Password : {currentUser.password} </p>

                {/* displaying form message, negative or positive depending on result of the action */}
                {passwordMessage != "" ? <p className="fs-4">{passwordMessage}</p> : ""}


                <button className="btn btn-outline-primary col-lg-3 col-sm-4 col-5 mx-auto" onClick={()=>{ setIsPasswordBeingModified(!isPasswordBeingModified); setPasswordMessage("") }}>
                    {isPasswordBeingModified ? "Hide form" : "Modify"}
                </button>

                {/* new password form */}
                {isPasswordBeingModified ? 

                    <div className="container d-flex flex-column col-6 gap-3">
                        <input  type="password" 
                                value={newPassword} 
                                className="text-center col-10 mx-auto p-2" 
                                onChange={(e)=>{setNewPassword(e.target.value)}}
                                placeholder="Your new password"/>

                        <button className="btn btn-outline-success col-5 mx-auto" onClick={()=>{modifyPassword()}}>Confirm</button>

                    </div> 
                :""}
            </div>

            <p className="fs-4"> Account ID : {currentUser.id} </p>
        </div>
        </>
    )
}

export const userSettingsLoader = async () => {
    
    // getting current user data
    const currentUser = await getCurrentUserInfo()

    // returning currentUser
    return currentUser

}