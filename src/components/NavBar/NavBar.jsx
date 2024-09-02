
//importing styles NavBar.css
import "./NavBar.css"

// nav bar used in src/Layouts/MainLayout/MainLayout.jsx
export const NavBar = () => {


    return (
        // nav bar
        <div className="container-fluid d-flex bg-light border border-1 border-dark shadow-lg p-3 rounded">

            {/* left side of the navbar */}
            <div className="col-6">
                <button className="btn btn-outline-dark">
                    <i class="bi bi-house fs-2"/>
                </button>
            </div>

            {/*  right side of the navbar */}
            <div className="col-6 d-flex justify-content-end gap-3 ">
                <button className="btn btn-outline-dark fw-bold">
                    Sign in
                </button>
                <button className="btn btn-outline-dark fw-bold">
                    Sign up
                </button>
            </div>

        </div>
    )
}