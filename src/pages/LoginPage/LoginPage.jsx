
// importing functions and components from react library
import { Form, Link, redirect, useActionData } from "react-router-dom"

//importing styles 
import "./LoginPage.css"
import { getRequest, putRequest } from "../../api_functions/functions"

// login page in which user can log into the system
export const LoginPage = () => {

    // getting data from action if error occured
    const actionData = useActionData()


    return (

        /* form
            in db.json => in form
            login => login
            pass => password
        */
        <Form method="POST" action="/login" className=" mt-5 container-lg col-lg-5 col-12 bg-light d-flex flex-column gap-2 text-center p-3 shadow-lg rounded">
        

            {/* header of the form*/}
            <h2 className="display-4">Login form</h2>

            {/* container with all inputs and buttons that is in the center of the form and take half space */}
            <div className="container-lg col-lg-8 col-8 d-flex flex-column gap-3 p-3">

                {/* login input with name='login' */}
                <input type="text" name="login" placeholder="Login" className="p-2 fs-5 text-center shadow-lg border-0"/>

                {/* password input with name='password' */}
                <input type="password" name="password" placeholder="Password" className="p-2 fs-5 text-center shadow-lg border-0"/>

                {/* redirection if user havent got account */}
                <p className="">Havent got account yet? <Link to="/register" className="text-dark linkParagraph">Click here</Link></p>

                {/* displaying error message if exist */}
                {actionData && actionData.error && <p className="text-danger fw-bold"> {actionData.error} </p>}

                {/* button to submit the data */}
                <button className="btn btn-outline-success col-6 mx-auto">Sign in</button>
                
            </div>


        </Form>

    )
}

// action function to route '/login' 
export const loginAction = async ( {request}  ) => {

    // getting data form
    const data = await request.formData()

    // getting login input
    const login = data.get("login")

    // getting password input 
    const password = data.get("password")


    // checking if login and password are not empty
    if (login == "" || password == "") {

        //returning error message 'All fields cannot be empty'
        return { error : "All fields cannot be empty"}

    }

    // getting all users from endpoint 'http://localhost:3000/users/'
    const users = await getRequest("http://localhost:3000/users/")

    // initiazlizing object 'newCurrentUser'
    let newCurrentUser = {}

    // checking if login and password are valid
    const i = users.findIndex(e => (e.login == login && e.password == password) )
    if (i > -1){
        newCurrentUser.id = users[i].id
        newCurrentUser.isLogged = true
    }else{
        //returning error message 'Login or password is invalid'
        return { error : "Login or password is invalid"}
    }

    // putting newCurrentUser into endpoint 'http://localhost:3000/currentUser/'
    try {
        await putRequest("http://localhost:3000/currentUser/", newCurrentUser)
    } catch {
        //returning error message 'Something went wrong during login process'
        return { error : "Something went wrong during login process"}
    }

    //redirecting to '/' if everything was ok
    return redirect("/account/")
}   