//  importing styles
import "./ProfilePage.css"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/functions"


export const ProfilePage = () => {

    // getting loader data 
    const userLoader = useLoaderData()

    // creating useState variables
    let [userInfo, setUserInfo] = useState(userLoader)

    // useEffect that updates userInfo
    useEffect( () => {
        const interval = setInterval( async () => {

            // getting data from endpoint 
            userInfo = await getRequest(`http://localhost:3000/users/${userInfo.id}`)
            setUserInfo(userInfo)

        }, 1000)

        return () => { clearInterval(interval) }
    })



    return (
        <>
            PROFILE {userInfo.id}
        </>
    )
}

export const profileLoader = async ( {params} ) => {
    // geting id of user
    const {id} = params

    // getting user info
    const userInfo = await getRequest(`http://localhost:3000/users/${id}`)

    // returning userInfo
    return userInfo
}