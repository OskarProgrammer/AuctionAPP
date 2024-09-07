//  importing styles
import "./ProfilePage.css"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getRequest, getUsersAuctions } from "../../api_functions/functions"

// importing components
import { AuctionTab } from "../../components/AuctionTab/AuctionTab"


export const ProfilePage = () => {

    // getting loader data 
    const [userLoader, auctionsLoader] = useLoaderData()

    // creating useState variables
    let [userInfo, setUserInfo] = useState(userLoader)
    let [auctions, setAuctions] = useState(auctionsLoader)

    // useEffect that updates userInfo
    useEffect( () => {
        const interval = setInterval( async () => {

            // getting data from endpoint users
            userInfo = await getRequest(`http://localhost:3000/users/${userInfo.id}`)
            setUserInfo(userInfo)

            // getting auctions of user
            auctions = await getUsersAuctions(userInfo.id)
            setAuctions(auctions)

        }, 1000)

        return () => { clearInterval(interval) }
    })



    return (
        <div className="container-fluid">
            {/* header of profile */}
            <h2 className="display-4 text-center fw-bold">{userInfo.login}</h2>
            <p className="fs-4 text-center">{userInfo.id}</p>

            {/* auctions */}
            <h3 className="display-5 text-center p-5">Auctions : {auctions.length} </h3>
            {auctions.map((auction)=>(
                <AuctionTab auctionInfo={auction} />
            ))}

        </div>
    )
}

export const profileLoader = async ( {params} ) => {
    // geting id of user
    const {id} = params

    // getting user info
    const userInfo = await getRequest(`http://localhost:3000/users/${id}`)

    // getting users auctions
    const auctionsUser = await getUsersAuctions(id)

    // returning userInfo and auctionsUser
    return [userInfo, auctionsUser]
}