// importing styles
import "./MainPage.css"

// importing api functions
import { getAllAuctionsWithoutCurrentUser, getRequest } from "../../api_functions/functions"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useState , useEffect } from "react"

// importing components
import { AuctionTab } from "../../components/AuctionTab/AuctionTab"
import { ProfileTab } from "../../components/ProfileTab/ProfileTab"


//main page look
export const MainPage = () => {

    // getting loaderData 
    const [loaderAuctions, loaderUsers] = useLoaderData()

    // creating useState variable auctions 
    let [auctions, setAuctions] = useState(loaderAuctions)

    // creating useState variable users 
    let [users, setUsers] = useState(loaderUsers)

    
    // useEffect that get auctions every one second
    useEffect(()=>{
        const interval = setInterval( async () => {
            // getting data from endpoint
            const newAuctions = await getAllAuctionsWithoutCurrentUser()

            // getting data from endpoint
            const newUsers = await getRequest("http://localhost:3000/users/")

            // setting auctions useState variable
            auctions = newAuctions
            setAuctions(auctions)

            // setting users useState variable
            users = newUsers
            setUsers(users)

        }, 1000)

        return () => { clearInterval(interval) }
    }, [])


    // preview page 
    return(
        <div className="container-fluid text-center p-3">

            {/* displaying users */}
            <div className="container d-flex bg-dark text-light rounded usersContainer gap-3 p-3 border border-5 border-dark">
                {/* header of users */}
                <h1 className="my-auto fw-bold p-3">Users</h1>
                
                {/* mapping */}
                {users.map((user) => (
                    <ProfileTab userInfo={user} />
                ))}

            </div>

            {/* displaying auctions */}
            {auctions.map((auction)=> (
                //  tab
                <AuctionTab auctionInfo={auction} />
            ))}

        </div>
    )
}

// loader of the mainPage
export const loaderMainPage = async () =>{
    // getting auctions which the owner is not current user
    const auctions = await getAllAuctionsWithoutCurrentUser()

    // getting users 
    const users = await getRequest("http://localhost:3000/users/")

    return [auctions,users]
}