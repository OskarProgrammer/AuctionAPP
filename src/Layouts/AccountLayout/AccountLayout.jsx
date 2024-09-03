// importing styles
import "./AccountLayout.css"

//importing functions and components from react library
import { Outlet } from "react-router-dom"


export const AccountLayout = () => {


    return (
        <>
            <h1 className="display-3">ACCOUNT LAYOUT</h1>
            <div className="container-fluid">
                <Outlet/>
            </div>
        </>
    )
}