// importing functions and components from react library
import { Form, Link, redirect, useActionData } from "react-router-dom"


//importing styles 
import "./RegisterPage.css"


//importing API
import { getRequest, postRequest, putRequest } from "../../api_functions/functions"


// login page in which user can log into the system
export const RegisterPage = () => {

    // getting data from action form , if error occured
    const actionData = useActionData()


    return (

        /* form
            in db.json => in form
            login => login
            pass => password
            -- => repeatedPassword
        */
        <Form method="POST" action="/register" className=" mt-5 container-lg col-lg-5 col-12 bg-light d-flex flex-column gap-2 text-center p-3 shadow-lg rounded">
        

            {/* header of the form*/}
            <h2 className="display-4">Register form</h2>

            {/* container with all inputs and buttons that is in the center of the form and take half space */}
            <div className="container-lg col-lg-8 col-8 d-flex flex-column gap-3 p-3">

                {/* login input with name='login' */}
                <input type="text" name="login" placeholder="Login" className="p-2 fs-5 text-center shadow-lg border-0"/>

                {/* password input with name='password' */}
                <input type="password" name="password" placeholder="Password" className="p-2 fs-5 text-center shadow-lg border-0"/>

                {/* password input with name='repeatedPassword' */}
                <input type="password" name="repeatedPassword" placeholder="Repeat Password" className="p-2 fs-5 text-center shadow-lg border-0"/>

                {/* redirection if useer havent got account */}
                <p className="">Have got account already? <Link to="/login" className="text-dark linkParagraph">Click here</Link></p>

                {/* displaying error message if exist */}
                {actionData && actionData.error && <p className="text-danger fw-bold"> {actionData.error} </p>}

                {/* button to submit the data */}
                <button className="btn btn-outline-success col-6 mx-auto">Sign up</button>
                
            </div>


        </Form>

    )
}


// action form of route '/register' 
export const registerAction = async ( {request} ) => {

    // getting data from form
    const data = await request.formData()

    // getting login field from form
    const login = data.get("login")
    
    // getting password field from form
    const password = data.get("password")

    // getting repeatedPassword field from form
    const repeatedPassword = data.get("repeatedPassword")

    // checking if login , password or repeatedPassword is null
    if (login == "" || password == "" || repeatedPassword == ""){

        // returning error message 'All fields must be provided'
        return { error : "All fields must be provided"}

    }

    // checking if password and repeatedPassword are the same
    if (password != repeatedPassword) {

        //returning error message 'Repeated password and password must be the same'
        return { error : "Repeated password and password must be the same"}

    }


    // getting users data from endpoint 'http://localhost:3000/users/'
    const users = await getRequest("http://localhost:3000/users/")


    // checking if login exists in users table
    if (users.some(e => e.login === login)) {

        // returning error message 'This login is already taken'
        return { error : "This login is already taken"}

    }

    // creating new object of user
    const newUser = {
        id : crypto.randomUUID(),
        login : login,
        password: password,
        balance : 0
    }

    // posting data to 'users' table
    try {
        await postRequest("http://localhost:3000/users/", newUser)
    } catch {
        // returning error message 'Something went wrong during creating user'
        return { error : "Something went wrong during creating user"}
    }

    // logging into account
    try {
        await putRequest("http://localhost:3000/currentUser/", { id : newUser.id, isLogged : true})
    } catch {
        return { error : "Something went wrong during logging process"}
    }

    // redirecting to the main page if everything is successfully done
    return redirect("/")
}