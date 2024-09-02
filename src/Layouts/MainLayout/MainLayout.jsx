//importing components
import { NavBar } from "../../components/NavBar/NavBar"

//Layout with all things , navbar, links, title
export const MainLayout = () => {

    return (
        <div className="container-fluid">
            <h1 className="display-4 fw-bold text-center p-3">Auction App</h1>
            
            <NavBar/>

        </div>
    )
}