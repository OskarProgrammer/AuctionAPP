// importing styles
import "./AuctionListPage.css"

// importing functions and components from react library 
import { useState } from "react"
import { Form, redirect, useLoaderData } from "react-router-dom"

// importing api functions
import { getCurrentUserAuctions, getCurrentUserInfo, postRequest } from "../../api_functions/functions"


export const AuctionListPage = () => {
    // getting data from loader
    const loaderData = useLoaderData()

    // initializing useState variable
    let [currentUserData, setCurrentUserData] = useState(loaderData[0])

    // initializing useState variable
    let [currentUserAuctions, setCurrentUserAuctions] = useState(loaderData[1])

    // initializing useState variable isExpanded
    let [isExpanded, setIsExpanded] = useState(false)


    // preview page of auctions list
    return (
        <div className="container-fluid p-3 text-center d-flex flex-column gap-3">
            <h1 className="display-4 fw-bold mb-2">List of your auctions</h1>

            {/* button to open form */}
            <button className="btn col-lg-2 col-6  mx-auto btn-outline-primary shadow-lg"
                    onClick={()=>{ setIsExpanded(!isExpanded) }}>

                {/* plus icon from bootstrap icons if !isExpanded*/}
                {!isExpanded ? <i className="bi bi-plus-square icon-30"/> : ""}
                
                {/* minus icon from bootstrap icons if isExpanded */}
                {isExpanded ? <i className="bi bi-dash-square icon-30"/> : ""}

            </button>

            {/* new auction form */}
            {isExpanded ? 
                <Form   method="POST"
                        action="/account/auctionList"
                        className="container col-lg-6 p-3 shadow-lg d-flex flex-column gap-2">
                    
                    {/* header of the form */}
                    <h3 className="display-5">Create new auction</h3>

                    {/* fields of the form */}

                    {/* title field */}
                    <input  type="text" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Title of your auction"
                            name="title"/>

                    {/* description field */}
                    <input  type="text" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Description of your auction"
                            name="desc"/>

                    {/* buyoutCost field */}
                    <input  type="number" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Buyout cost"
                            name="buyoutCost"/>
                    
                    {/* minBidCost field */}
                    <input  type="text" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Min bidding cost"
                            name="minBid"/>

                    {/* time field */}
                    <input  type="number" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Time of the auction in hours"
                            name="time"/>

                    {/* submit button */}
                    <button className="btn btn-outline-success col-lg-4 col-md-4 col-sm-4 col-6 mx-auto">Create</button>

                </Form> 
            : ""}

        </div>
    )
}

export const auctionListLoader = async () => {
    // getting current user data
    const currentUser = await getCurrentUserInfo()

    // getting current user auctions
    const currentUserAuctions = await getCurrentUserAuctions()

    // returning currentUser and currentUserAuctions
    return [currentUser,currentUserAuctions]
}

export const auctionAction = async ( {request} ) => {
    // getting form data
    const data = await request.formData()

    // getting title
    const title = data.get("title")

    // getting desc
    const desc = data.get("desc")

    // getting buyoutCost
    const buyoutCost = data.get("buyoutCost")

    // getting minBid
    const minBid = data.get("minBid")

    // getting time
    const time = data.get("time")

    // checking if any field is empty 
    if ( title == "" || desc == "" || buyoutCost == "" || minBid == "" || time == "") {
        // returning error message
        return { error : "All fields must be provided" }
    }

    // getting currentUserData 
    const currentUserData = await getCurrentUserInfo()

    // creating newAuction object
    const newAuction = {
        id: crypto.randomUUID(),
        ownerID: currentUserData.id,
        title: title,
        desc: desc,
        buyoutCost: buyoutCost,
        minBid: minBid,
        currentBid: 0,
        time: time * 60 * 60
    }

    // posting data into database
    try {
        // posting data to the endpoint 'http://localhost:3000/auctions/'
        await postRequest("http://localhost:3000/auctions/", newAuction)
    } catch {
        // returning error message
        return { error : "Something went wrong during creating auction"}
    }

    // redirecting to same route 
    return redirect(".")
}