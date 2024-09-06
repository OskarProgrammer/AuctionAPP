
// importing styles
import "./FinishedAuctionTab.css"

export const FinishedAuctionTab = (props) => {
    
    // auction prop
    let auction = props.auctionInfo


    return (
        // auction tab
        <div className="container-lg shadow-lg rounded p-3">

            {/* header of auction tab */}
            <h2 className="display-5">{auction.title}</h2>

            <div className="container-lg row">

                {/* left side */}
                <div className="container col-lg-6">

                    <h5 className="display-6 fst-italic">Money info</h5>
                    <p>Buy out price: {auction.buyoutCost}</p>
                    <p>Min bidding price: {auction.minBid}</p>
                </div>

                {/* right side */}
                <div className="container col-lg-6">

                    <h5 className="display-6 fst-italic">Time info</h5>
                    <p>Date of creation : {new Date(auction.creatingDate).toLocaleString()}</p>
                    <p>Auction end date : {new Date(auction.expireDate).toLocaleString()}</p>

                </div>

            </div>


            {/* status informations */}
            <h2 className="display-6 my-4 fw-bold">Status</h2>
            {
                auction.winnerID != "" ? <p className="fs-3 col-lg-3 text-light bg-success mx-auto rounded p-2">SOLD for {auction.winnerID}</p> :
                <p className="fs-3 col-lg-3 text-light bg-danger mx-auto rounded p-2">FAILED</p>
            }

            {auction.winnerID == "" ? "" : <p className="fs-3">Final price: {auction.currentBid}</p>}

            {/* auctions id */}
            <p className="fs-5 p-3">Auction ID : {auction.id}</p>

        </div>
    )
}