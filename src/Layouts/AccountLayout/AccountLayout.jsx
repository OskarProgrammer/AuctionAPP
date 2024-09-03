// importing styles
import "./AccountLayout.css"

//importing functions and components from react library
import { Outlet } from "react-router-dom"


export const AccountLayout = () => {


    return (
        <>

            <Outlet/>

        </>
    )
}