
// importing styles
import "./DeliveriesPage.css"

// importing api functions
import { getDeliveriesList } from "../../api_functions/functions"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"


export const DeliveriesPage = () => {

    // getting loaderData
    const loaderData = useLoaderData()

    // creating useState variable deliveries
    let [deliveries, setDeliveries] = useState(loaderData)

    // useEffect that update deliveries variable
    useEffect(()=>{
        const interval = setInterval( async () => {
            deliveries = await getDeliveriesList()
            setDeliveries(deliveries)
        }, 1000)

        return () => { clearInterval(interval) } 
    }, [])

    return (
        // container
        <div className="container-fluid text-center mt-3">
            
            {/* header of the subpage */}
            <h2 className="display-4 fw-bold">Deliveries</h2>

        </div>
    )
}

// loader function
export const deliveriesLoader = async () => {
    // getting current users deliveries to make
    const deliveries = await getDeliveriesList()

    // returning deliveries
    return deliveries
}