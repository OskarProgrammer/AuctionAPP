
// importing styles
import "./AccessDeniedPage.css"

// importing functions and components from react library
import { useRouteError } from "react-router-dom"

export const AccessDeniedPage = () => {
    // getting error message
    const error = useRouteError()

    return(
        <div className="container-fluid bg-danger text-light rounded errorDiv p-5 text-center">
            <h1 className="display-1 fw-bold">Error</h1>
            <h2 className="display-2">{error.message}</h2>
        </div>
    )
}