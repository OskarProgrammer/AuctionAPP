// importing styles
import "./AccountBalancePage.css"

// importing api functions
import { getCurrentUserInfo, putRequest } from "../../api_functions/functions"

// importing functions and components from react library
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"


export const AccountBalancePage = () => {
    // getting loader data
    const loaderData = useLoaderData()

    // initializing useState variable
    let [currentUserData, setCurrentUserData] = useState(loaderData)

    // initializing useState variable isExpanded
    let [isExpanded, setIsExpanded] = useState(false)

    // initializing useState variable newBalance
    let [newBalance, setNewBalance] = useState(0)

    // initializing useState variable message
    let [message, setMessage] = useState("")


    // function that add balance to the account
    const addBalance = async ()=>{
        // checking if value is positive
        if (newBalance < 0) {
            // setting form message
            setMessage("Value has to be positive number")
            
            // hidding the form
            setIsExpanded(false)

            // setting newBalance to default 
            setNewBalance(0)

            return
        }

        // setting newBalance of account
        currentUserData.balance = parseInt(newBalance) + parseInt(currentUserData.balance)
        
        // setting useState variable newBalance to default
        setNewBalance(0)

        // putting new data
        try {
            await putRequest(`http://localhost:3000/users/${currentUserData.id}`, currentUserData)
        } catch {
            // throwing error if occurs
            throw new Error("Error during updating balance of the account")
        }

        // hidding the form
        setIsExpanded(false)

        // setting form message
        setMessage("Funds have been added")

        // setting new value of currentUserData useState variable
        currentUserData = await getCurrentUserInfo()
        setCurrentUserData(currentUserData)
    }


    // preview page of account balance
    return (
        <div className="container-fluid p-3 text-center">
            
            {/* header of the sub page */}
            <h1 className="display-4 fw-bold mb-5">Account balance page</h1>

            {/* displaying balance */}
            <p className="fs-4">Current balance: {currentUserData.balance}</p>

            {/* displaying form message, negative or positive depending on result of the action */}
            {message != "" ? <p className="fs-4">{message}</p> : ""}
            
            {/* button to open form */}
            <button className="btn btn-outline-primary" onClick={()=>{setIsExpanded(!isExpanded); setMessage("")}}>
                {isExpanded ? "Close form" : "Add funds"}
            </button>

            {/* form of adding funds */}
            {isExpanded ? 
                <div className="container col-lg-4 col-md-5 col-sm-7 col-12 shadow-lg p-3 mt-3 d-flex flex-column gap-3">

                    {/* displaying input of balance that will be added to the balance */}
                    <input className="p-2 text-center col-6 mx-auto" type="number" value={newBalance} onChange={(e)=>{setNewBalance(e.target.value)}}/>
                    
                    {/* button that add balance to the account */}
                    <button className="btn btn-outline-success mx-auto col-6" onClick={ () =>{ addBalance() } }> Add </button>
                
                </div>
            : ""}

        </div>
    )
}


// loader function
export const accountBalanceLoader = async () => {
    // getting current user data
    const currentUser = await getCurrentUserInfo() 

    // returning currentUser
    return currentUser
}