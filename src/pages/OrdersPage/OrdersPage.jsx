
// importng styles
import "./OrdersPage.css"

// importing api functions
import { getOrdersList } from "../../api_functions/functions"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import { OrderTab } from "../../components/OrderTab/OrderTab"

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
        }, 100)

        return () => { clearInterval(interval) }
    })

    return (
        <div className="container-fluid text-center mt-3">
            {/* header of the subpage */}
            <h2 className="display-4 fw-bold">Your orders</h2>

            {/* displaying orders */}
            {orders.map((order)=> (
                <OrderTab orderInfo={order} />
            ))}

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