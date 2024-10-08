
//  importing styles
import "./BasketPage.css"

// importing api functions
import { getBasketList } from "../../api_functions/functions"

// importing functions and componetnts from react library
import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"

// importing components
import { BasketTab } from "../../components/BasketTab/BasketTab"

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
        }, 500)


        return () => { clearInterval(interval) } 
    })

    return (
        <div className="container-fluid text-center mt-3">
            
            {/* header of subpage */}
            <h2 className="display-4 fw-bold">Your basket</h2>

            {/* displaying items of the basket */}
            {basket.map((item)=>(
                <BasketTab itemInfo={item} />
            ))}
        
        </div>
    )
}

export const basketLoader =  async () => {
    // getting basket list
    const basket = await getBasketList()

    // returnign result
    return basket
}