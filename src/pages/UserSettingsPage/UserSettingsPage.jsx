
// importing styles
import "./UserSettingsPage.css"

// importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"

// importing functions and components from react library 
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"


export const UserSettingsPage = () => {

    // getting loader data
    const loaderData = useLoaderData()

    // declaring and initializing useState variable
    let [currentUser, setCurrentUser] = useState(loaderData)

    // creating useEffect with setInterval 
    useEffect(()=>{
        const interval = setInterval( async ()=>{
            const data = await getCurrentUserInfo()

            // setting useState
            setCurrentUser(data)
        }, 1)

        // clearing interval
        return ()=>{ clearInterval(interval) }
    }, [])


    // preview page
    return (
        <>
            <div className="container-fluid p-3 text-center">
            <h1 className="display-4 fw-bold mb-5">User data page</h1>
            <p className="fs-4"> Login : {currentUser.login} </p>
            <p className="fs-4"> Password : {currentUser.password} </p>
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