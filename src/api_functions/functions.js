
// GET REQUESTS


// function getRequest is getting data from given endpoint param
export const getRequest = async (endpoint) => {

    // declaring and initializing data array
    let data = []

    // try catch clause to check if this endpoint response with 200 status
    try {

        // fetching data from endpoint
        data = await fetch (endpoint)

    } catch {

        //throwing error if occurs 
        throw new Error(`Error during getting data from ${endpoint}`)
    
    }

    // returning data in json format
    return data.json()
}

//function getCurrentUserInfo is getting data about current user
export const getCurrentUserInfo = async () => {
    // getting id of current user
    const { id } = await getRequest("http://localhost:3000/currentUser/")
    
    // getting all users
    const users = await getRequest("http://localhost:3000/users/")

    // looking for current user id
    const i = users.findIndex(e => e.id === id )
    
    // declaring and initializing currentUserData tuple
    let currentUserData = users[i]

    // returning data
    return currentUserData
}

//function getCurrentUserAuctions is getting auctions of current user
export const getCurrentUserAuctions = async () => {
    
    // getting currentUserData
    const currentUserData = await getCurrentUserInfo()

    // getting all auctions
    const auctions = await getRequest("http://localhost:3000/auctions/")

    // creating array of this user auctions
    let currentUserAuctions = []

    // looping through auctions
    currentUserAuctions = auctions.filter(e => e.ownerId == currentUserData.id)

    // returning results
    return currentUserAuctions
}

// POST REQUESTS

export const postRequest = async (endpoint, payload) => {

    // creating request options object to implement the body, headers and method of the request
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }

    //sending request
    try {

        // posting data to endpoint with given payload
        await fetch ( endpoint , requestOptions)
        
    } catch {

        //throwing error if occurs
        throw new Error(`Error during posting data to ${endpoint} with payload ${payload}`)

    }
}


// PUT REQUESTS

// function that put payload param into the endpoint param 
export const putRequest = async ( endpoint , payload ) => {

    // creating request options object to implement the body, headers and method of the request
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }

    //sending request
    try {

        // putting data to endpoint with given payload
        await fetch ( endpoint , requestOptions)
        
    } catch {

        //throwing error if occurs
        throw new Error(`Error during putting data to ${endpoint} with payload ${payload}`)

    }
}