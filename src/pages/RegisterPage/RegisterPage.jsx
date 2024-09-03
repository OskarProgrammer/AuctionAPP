// importing functions and components from react library
import { Form, Link } from "react-router-dom"

//importing styles 
import "./RegisterPage.css"

// login page in which user can log into the system
export const RegisterPage = () => {


    return (

        /* form
            in db.json => in form
            login => login
            pass => password
            -- => repeatedPassword
        */
        <Form className=" mt-5 container-lg col-lg-5 col-12 bg-light d-flex flex-column gap-2 text-center p-3 shadow-lg rounded">
        

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

                {/* button to submit the data */}
                <button className="btn btn-outline-success col-6 mx-auto">Sign up</button>
                
            </div>


        </Form>

    )
}