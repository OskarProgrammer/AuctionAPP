
// importng styles
import "./OrdersPage.css"

// importing api functions
import { getOrdersList } from "../../api_functions/functions"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

export const OrdersPage = () => {

    // getting loader data 
    const loaderData = useLoaderData()

    // creating useState variables
    let [orders, setOrders] = useState(loaderData)

    // useEffect to update orders
    useEffect(()=>{
        const interval = setInterval( async () => {
           orders = await getOrdersList()
           setOrders(orders)
        }, 1000)

        return () => { clearInterval(interval) }
    })

    return (
        <div className="container-fluid text-center">
            <h2 className="display-4 fw-bold">Your orders</h2>

            {/* TODO DISPLAYING ORDERS AND DELIVERY INFORMATIONS */}
        </div>
    )
}

// loader function
export const ordersLoader = async () => {
    // getting orders of the current user
    const orders = await getOrdersList()

    // returning orders
    return orders
}