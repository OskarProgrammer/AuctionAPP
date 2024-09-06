
// importing styles
import "./BasketTab.css"

// importing date functions
import { getFullDiff } from "../../date_functions/date_functions"

// importing functions and components from react library
import { Link } from "react-router-dom"

export const BasketTab = (props) => {
    // getting item informations from props
    const item = props.itemInfo

    return (
        <div className="container-lg d-flex flex-column shadow p-3">
             {/* title of auction */}
             <h2 className="display-5">{item.title}</h2>
                     
             {/* price info */}
             <p className="fs-4">Price : {item.currentBid}</p>

             {/* date info */}
             <div className="container-fluid shadow p-3">
                <div className="container-fluid d-flex flex-lg-row gap-lg-0 flex-column gap-3  ">
                
                    {/* left side */}
                    <div className="container col-lg-6 fs-4">
                        Created at {new Date(item.creatingDate).toLocaleString()}
                    </div>

                    {/* right side */}
                    <div className="container col-lg-6 fs-4">
                        Ended at {new Date(item.expireDate).toLocaleString()}
                    </div>
                </div>

                <div className="container-fluid text-center fs-4">Duration: {getFullDiff(new Date(item.expireDate), new Date(item.creatingDate))}</div>

            </div>

            {item.status == "paid" ? <p className="bg-success text-light p-3 fs-4 mx-auto col-6 my-3 rounded fw-bold">Paid!</p> 
            : <p className="bg-danger text-light p-3 fs-4 mx-auto col-6 my-3 rounded fw-bold">Not paid!</p>}

            {/* buttons */}
            <div className="container-fluid d-flex flex-row gap-4 mt-3 justify-content-center">
                {/* Link to '/auction/:id' */}
                <Link to={`/auction/${item.id}`} className="btn btn-lg btn-outline-primary">Check details</Link>

                {/* button to pay the order */}
                <button className="btn btn-lg btn-outline-success">Pay</button>
            </div>
                     
        </div>
    )
}