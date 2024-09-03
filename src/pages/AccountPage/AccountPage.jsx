//importing styles
import "./AccountPage.css"

//importing functions and components from react library
import { useEffect } from "react"

//importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"

export const AccountPage = () => {

    let [userData, setUserData] = useState({})

    useEffect(()=>{
        // declaring interval
        const interval = setInterval(async () => {
            // getting data about current user
            const data = await getCurrentUserInfo()
            // setting state of 'userData' to new 'data'
            setUserData(data)
        }, 1);

        // clearing the interval
        return () => { clearInterval(interval) }
    })

    return (
        <>
            ACCOUNT PAGE
        </>
    )
}