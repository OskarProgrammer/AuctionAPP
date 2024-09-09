
// importing styles
import { useState } from "react"
import "./OrderTab.css"

// importing functions and components from react library
import { Form, redirect, useActionData } from "react-router-dom"

// import api functions
import { getRequest, putRequest } from "../../api_functions/functions"

export const OrderTab = (props) => {

    // getting orderInfo from props
    let order = props.orderInfo 

    // getting actionData
    const actionData = useActionData()

    // creating useState variable 
    let [isExpanded, setIsExpanded] = useState(false)

    const received = async () => {
        // changing status
        order.status = "Received"
        order.received = true

        // updating data
        try {
            await putRequest(`http://localhost:3000/orders/${order.id}`, order)
        } catch {
            throw new Error("Error during updating order")
        }

    }

    return (
        <div className="container-fluid shadow text-dark text-center p-3 my-5 rounded">

            {/* header of the order */}
            <h1 className="display-5">{order.title}</h1>

            {/* status */}
            <p className="fs-4">Status : {order.status}</p>

            {/* checking if delivery informations are filled up */}
            { order.city == undefined  ? <p className="fs-5 bg-danger text-light fw-bold p-3 mx-auto col-md-4 col-12 rounded">You have to fill delivery informations</p> 
                : <p className="fs-5 bg-success text-light fw-bold p-3 mx-auto col-md-4 col-12 rounded">Delivery informations are filled up</p>}

            {/* button container */}
            { order.city == undefined ? 
                <div className="container-fluid d-flex flex-column gap-2 my-2 justify-content-center">

                    {/* open delivery form button */}
                    <button className="container btn btn-lg btn-outline-danger mx-auto col-lg-4 col-md-8 col-sm-8 col-12"
                            onClick={()=>{setIsExpanded(!isExpanded)}}>{isExpanded ? "Hide form" : "Fill delivery form"}</button>

                    {/* delivery form */}
                    {isExpanded ? 
                        <Form   method="POST" 
                                action="/account/orders" 
                                className="col-lg-5 col-md-6 col-sm-10 col-12 d-flex flex-column gap-2 mx-auto"
                                state={{id : order.id}}>
                            <input name='id' readOnly hidden value={order.id}/>
                            <input type="text" name="city" placeholder="City" className="p-3 text-center rounded" />
                            <input type="text" name="zipCode" placeholder="Zip-code" className="p-3 text-center rounded" />
                            <input type="text" name="street" placeholder="Street" className="p-3 text-center rounded" />

                            {actionData && actionData.error && <p className="py-2 fs-3 bg-danger text-light rounded">{actionData.error}</p>}

                            <button className="btn btn-outline-success col-lg-4 mx-auto">Submit</button>
                        </Form> : ""}

            </div> : 
            // delivery informations if provided
            <div className="container-fluid text-center d-flex flex-column gap-1 col-md-5 col-sm-6 col-12 shadow col-4 my-3 p-3 bg-light text-dark rounded">
                <p className="fs-4 fw-bold">Delivery informations</p>
                <p className="fs-5">City : {order.city}</p>
                <p className="fs-5">Zip code : {order.zipCode}</p>
                <p className="fs-5">Street : {order.street}</p>
            </div>}

            {order.status == "Sent" ? <button className="btn btn-outline-success btn-lg" onClick={()=>{received()}} >Received!</button>
            : ""}

        </div>
    )
}

export const orderAction = async ( {request} ) => {
    // getting form data
    const dataFromForm = await request.formData()

    // getting city field
    const city = dataFromForm.get("city")

    // getting zipCode field
    const zipCode = dataFromForm.get("zipCode")

    // getting street field
    const street = dataFromForm.get("street")

    // getting id field
    const id = dataFromForm.get("id")

    // checking if any field is empty
    if (street == "" || zipCode == "" || city == "") {
        return { error : "All fields could not be empty"}
    }

    // declaring orderInfo tuple
    let orderInfo = {}
    try {
        // getting orderInfo from endpoint `http://localhost:3000/orders/${id}`
        orderInfo = await getRequest(`http://localhost:3000/orders/${id}`)
    } catch {
        throw new Error(`Error during getting data from endpoint 'http://localhost:3000/orders/${id}'`)
    }


    // adding new fields into orderInfo
    orderInfo.city = city
    orderInfo.zipCode = zipCode
    orderInfo.street = street
    orderInfo.status = "Preparing"

    // putting data to the database
    try {
        await putRequest(`http://localhost:3000/orders/${id}`, orderInfo)
    } catch {
        return { error : "Something went wrong during process of updating data"}
    }


    // redirecting to current location
    return redirect(".")
}