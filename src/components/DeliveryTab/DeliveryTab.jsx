
// importing styles
import { getRequest, putRequest } from "../../api_functions/functions"
import "./DeliveryTab.css"

// importing functions and components from react library
import { useEffect, useState } from "react"

export const DeliveryTab = (props) => {

    // getting delivery informations from props
    let delivery = props.deliveryInfo

    // creating useState variable winnerInfo
    let [winnerInfo, setWinnerInfo] = useState({})

    // useEffect function that get info about winner of the auction
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            winnerInfo = await getRequest(`http://localhost:3000/users/${delivery.winnerID}`)
            setWinnerInfo(winnerInfo)
        },1)

        return () => { clearTimeout(timeout) }
    })

    const changeStatus = async ( newStatus ) => {
        // changing status to newStatus
        delivery.status = newStatus

        // if newStatus 'sent' adding another field
        if ( newStatus = "Sent") {
            delivery.received = false
        }

        // sending new data to endpoint `http://localhost:3000/orders/`
        try {
            await putRequest(`http://localhost:3000/orders/${delivery.id}`,delivery)
        } catch {
            throw new Error("Error during updating data")
        }
    }

    return (
        <div className="container-fluid shadow-lg d-flex flex-column text-light text-center p-3 my-5 rounded col-lg-8 col-12">
            {/* title of delivery */}
            <h3 className="display-5 fw-bold text-dark">{delivery.title}</h3>

            {/* price info */}
            <p className="fs-4 fw-bold text-dark">Price : {delivery.currentBid}</p>

            {/* container */}
            <div className="container-fluid d-flex flex-lg-row flex-sm-column flex-column p-4 gap-4">

                {/* left side */}
                <div className="container fs-3 bg-success p-3 rounded glowSuccess">
                    <p className="fs-2">Owner information</p>
                    <p className="fs-5">Name : {winnerInfo.login}</p>
                    <p className="fs-5">ID : {winnerInfo.id} </p>
                </div>

                {/* right side */}
                <div className="container fs-3 bg-primary p-3 rounded glowPrimary">
                    <p className="fs-2">Delivery information</p>

                    {/* container with delivery informations */}
                    {delivery.city == undefined ? 
                    <p className="fs-4 bg-danger text-light p-3 rounded fw-bold">User did not fill delivery form!</p> 
                    : 
                    <div className="d-flex flex-column gap-2">
                        <p className="fs-5">City : {delivery.city}</p>
                        <p className="fs-5">Zip Code : {delivery.zipCode}</p>
                        <p className="fs-5">Street : {delivery.street}</p>
                    </div>
                    }
                </div>
            </div>

            {/* date info container */}
            <div className="container col-6 d-flex flex-column shadow p-3 my-3">
                <p className="fs-4 text-dark">Auction created at : {new Date(delivery.creatingDate).toLocaleString() } </p>
                <p className="fs-4 text-dark">Auction ended at : {new Date(delivery.expireDate).toLocaleString() } </p>
            </div>

            <p className="fs-4 text-dark fw-bold">Status : {delivery.status}</p>
            
            {/* buttons container */}
            {delivery.city == undefined || delivery.status == "Sent" || delivery.status == "Received" ? "" 
            : 
                <div className="container-fluid d-flex flex-lg-row flex-column gap-2 justify-content-center">
                    <button className="btn btn-outline-success btn-lg fw-bold" onClick={()=>{ changeStatus("Sent") }} >Sent!</button>
                </div>
            }

        </div>
    )
}