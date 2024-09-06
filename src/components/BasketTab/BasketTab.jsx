
// importing styles
import "./BasketTab.css"

// importing date functions
import { getFullDiff } from "../../date_functions/date_functions"

// importing functions and components from react library
import { Link } from "react-router-dom"
import { useState } from "react"

// importing api functions
import { deleteRequest, getCurrentUserInfo, getRequest, postRequest, putRequest } from "../../api_functions/functions"

export const BasketTab = (props) => {
    // getting item informations from props
    let item = props.itemInfo

    // creating useState variables
    let [message, setMessage] = useState("")

    const pay = async () => {
        // getting current user info
        let currentUser = await getCurrentUserInfo()

        // getting owner of auction info
        let ownerInfo = await getRequest(`http://localhost:3000/users/${ownerID}`)

        // checking if user have got enough money
        if (currentUser.balance < item.currentBid) {
            setMessage("You haven't got enough money")
            return
        }

        // subtracting the value of an item
        currentUser.balance -= item.currentBid

        // adding price to owner balance
        ownerInfo.balance += item.currentBid

        // updating current user data
        try {
            await putRequest(`http://localhost:3000/users/${currentUser.id}`, currentUser)
            await putRequest(`http://localhost:3000/users/${ownerInfo.id}`, ownerInfo)
        } catch {
            setMessage("Something went wrong during updating current user data")
            return
        }

        // deleting item from basket
        try {
            await deleteRequest(`http://localhost:3000/finishedAuctions/${item.id}`)
        } catch {
            setMessage("Something went wrong during removing item")
            return
        }

        item.status = "Preparing"
        
        // posting data to orders
        try {
            await postRequest("http://localhost:3000/orders/", item)
        } catch {
            setMessage("Something went wrong during adding item to orders")
            return
        }

        // stopping function
        return
    }

    return (
        <div className="container-lg d-flex flex-column shadow p-3 mt-5">
             {/* title of auction */}
             <h2 className="display-5">{item.title}</h2>
                     
             {/* price info */}
             <p className="fs-4">Price : {item.currentBid}</p>

             {/* date info */}
             <div className="container-fluid shadow p-3">
                <div className="container-fluid d-flex flex-lg-row gap-lg-0 flex-column gap-3  ">
                
                    {/* left side */}
                    <div className="container col-lg-6 fs-4">
                        Created at {new Date(item.creatingDate).toLocaleString()}
                    </div>

                    {/* right side */}
                    <div className="container col-lg-6 fs-4">
                        Ended at {new Date(item.expireDate).toLocaleString()}
                    </div>
                </div>

                <div className="container-fluid text-center fs-4">Duration: {getFullDiff(new Date(item.expireDate), new Date(item.creatingDate))}</div>

            </div>

            {/* message */}
            {message ? <p className="fs-4 mt-3 bg-danger text-light mx-auto col-3 rounded p-2">{message}</p> : ""}

            {/* buttons */}
            <div className="container-fluid d-flex flex-row gap-4 mt-3 justify-content-center">
                {/* Link to '/auction/:id' */}
                <Link to={`/auction/${item.id}`} className="btn btn-lg btn-outline-primary">Check details</Link>

                {/* button to pay the order */}
                <button className="btn btn-lg btn-outline-success" onClick={()=>{ pay() }} >Pay</button>
            </div>
                     
        </div>
    )
}