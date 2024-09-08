
//  importing styles
import "./PersonTab.css"

// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/functions"

export const PersonTab = (props) => {

    // getting id of person from props
    const personID = props.personID

    // creating useState variable personInfo
    let [personInfo, setPersonInfo] = useState({})

    // useEffect timeout that gets info from endpoint /users/:id
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            // geting info about person
            personInfo = await getRequest(`http://localhost:3000/users/${personID}`)

            // setting personInfo
            setPersonInfo(personInfo)

        },1)

        return () => { clearTimeout(timeout) }
    })

    // creating userInfo 
    return (
        <>{personInfo.login} </>
    )
}