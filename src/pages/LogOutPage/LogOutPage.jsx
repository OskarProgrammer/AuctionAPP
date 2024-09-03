
//importing styles
import { redirect } from "react-router-dom"
import { putRequest } from "../../api_functions/functions"
import "./LogOutPage.css"


export const LogOutPage = () => {
    

}


// loader to log out
export const logOutLoader = async () => {

    // creating new object of current user
    const newCurrent = {
        id : "",
        isLogged : false
    }

    // putting data into endpoint 'http://localhost:3000/currentUser/'
    try {
        await putRequest('http://localhost:3000/currentUser/', newCurrent)
    } catch {
        // throwing error if occurs
        throw new Error(`Error during log out process`)
    }

    //redirecting if everything went ok
    return redirect("/")
}