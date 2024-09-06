
//  importing styles
import "./BasketPage.css"

// importing api functions
import { getBasketList } from "../../api_functions/functions"

// importing functions and componetnts from react library
import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"

export const BasketPage = () => {
    // getting loader data 
    const basketList = useLoaderData()

    // creating useState variables
    let [basket, setBasket] = useState(basketList)

    // useEffect interval that uppdate info about basketList
    useEffect(()=>{
        const interval = setInterval(async () => {
            basket = await getBasketList()
            setBasket(basket)
        }, 1000)


        return () => { clearInterval(interval) } 
    })

    return (
        <>
            BASKET
        </>
    )
}

export const basketLoader =  async () => {
    // getting basket list
    const basket = await getBasketList()

    // returnign result
    return basket
}