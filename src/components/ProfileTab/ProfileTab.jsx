
// importing styles
import "./ProfileTab.css"

// importing api functions
import { getUsersAuctions } from "../../api_functions/functions"

// importing functions and components from react library
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"


export const ProfileTab = (props) => {

    // getting user info
    const user = props.userInfo

    // getting amount of auctions 
    let [amountOfAuctions, setAmountOfAuctions] = useState(0)

    // useEffect that updates amount of auctions 
    useEffect( () => {
        const interval = setInterval( async () => {
            // getting user auctions
            const auctions = await getUsersAuctions(user.id)
            
            // setting amount of auctions
            amountOfAuctions = auctions.length
            setAmountOfAuctions(amountOfAuctions)
        }, 100)

        return () => { clearInterval(interval) } 
    })

    return (
        <div className="childContainer d-flex flex-column bg-light text-dark rounded m-3 p-3 gap-3">
            {/* header of profile */}
            <h1 className="display-5">{user.login}</h1>

            {/* amount of auctions */}
            <p className="fs-4">Auctions : {amountOfAuctions}</p>

            {/* NavLink to details of profile */}
            <NavLink to={`/user/${user.id}`} className="btn btn-outline-primary">Check profile</NavLink>

        </div>
    )
}