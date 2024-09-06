
// importing styles
import { useState } from "react"
import "./OrderTab.css"

// importing functions and components from react library
import { Form, useActionData } from "react-router-dom"

// import api functions
import { putRequest } from "../../api_functions/functions"

export const OrderTab = (props) => {

    // getting orderInfo from props
    let order = props.orderInfo 

    // getting actionData
    const actionData = useActionData()

    // creating useState variable 
    let [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="container-fluid shadow text-center p-3 my-5">

            {/* header of the order */}
            <h1 className="display-5">{order.title}</h1>

            {/* status */}
            <p className="fs-4">Status : {order.status}</p>

            {/* checking if delivery informations are filled up */}
            { order.city == undefined  ? <p className="fs-5 bg-danger text-light fw-bold p-3 mx-auto col-md-4 col-12 rounded">You have to fill delivery informations</p> : ""}

            {/* button container */}
            <div className="container-fluid d-flex flex-column gap-2 my-2 justify-content-center">

                {/* open delivery form button */}
                <button className="container btn btn-lg btn-outline-danger mx-auto col-lg-4 col-md-8 col-sm-8 col-12"
                        onClick={()=>{setIsExpanded(!isExpanded)}}>{isExpanded ? "Hide form" : "Fill delivery form"}</button>

                {/* delivery form */}
                {isExpanded ? <Form method="POST" action="/account/orders" className="col-lg-5 col-md-6 col-sm-10 col-12 d-flex flex-column gap-2 mx-auto">
                    <input type="text" name="city" placeholder="City" className="p-3 text-center" />
                    <input type="number" name="zipCode" placeholder="Zip-code" className="p-3 text-center" />
                    <input type="text" name="street" placeholder="Street" className="p-3 text-center" />
                    {actionData && actionData.error && <p className="py-2 fs-3 bg-danger text-light">{actionData.error}</p>}
                    <button className="btn btn-outline-success col-lg-4 mx-auto">Submit</button>
                </Form> : ""}

            </div>
        </div>
    )
}

export const orderAction = async ( {request}) => {
    // getting props data
    console.log(request);

    // getting form data
    const dataFromForm = await request.formData()

    // getting city field
    const city = dataFromForm.get("city")

    // getting zipCode field
    const zipCode = dataFromForm.get("zipCode")

    // getting street field
    const street = dataFromForm.get("street")

    // checking if any field is empty
    if (street == "" || zipCode == "" || city == "") {
        return { error : "All fields could not be empty"}
    }

    // adding new fields into orderInfo
    orderInfo.city = city
    orderInfo.zipCode = zipCode
    orderInfo.street = street

    // putting data to the database
    try {
        await putRequest(`http://localhost:3000/orders/${orderInfo.id}`, orderInfo)
    } catch {
        return { error : "Something went wrong during process of updating data"}
    }

    return null
}