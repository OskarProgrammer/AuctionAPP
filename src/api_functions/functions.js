
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
    currentUserAuctions = auctions.filter(e => (e.ownerID == currentUserData.id))

    // returning results
    return currentUserAuctions
}

//function getCurrentUserFinishedAuctions is getting finished auctions of current user
export const getCurrentUserFinishedAuctions = async () => {
    
    // getting currentUserData
    const currentUserData = await getCurrentUserInfo()

    // getting all auctions
    const auctions = await getRequest("http://localhost:3000/finishedAuctions/")

    // creating array of this user auctions
    let currentUserFinishedAuctions = []

    // looping through auctions
    currentUserFinishedAuctions = auctions.filter(e => (e.ownerID == currentUserData.id))

    // returning results
    return currentUserFinishedAuctions
}

//function getAllAuctionsWithoutCurrentUser is getting all auctions without auctions of current user  
export const getAllAuctionsWithoutCurrentUser = async () => {

    // getting currentUserData 
    const currentUserData = await getCurrentUserInfo()
    
    // getting all auctions
    const auctions = await getRequest("http://localhost:3000/auctions/")

    // creating array of auctions
    let resultAuctions = []

    // looping through auctions
    try {
        resultAuctions = auctions.filter((e) => (e.ownerID != currentUserData.id))
    } catch {
        resultAuctions = auctions 
    }
    

    // returning results
    return resultAuctions
}

// function getBasketList is getting all auctions that were bought by current user
export const getBasketList = async () => {
    // getting current user data
    const currentUserData = await getCurrentUserInfo()

    // getting all finished auctions
    const auctions = await getRequest("http://localhost:3000/finishedAuctions/")

    // creating result array
    let resultArray = []

    // looping through auctions
    resultArray = auctions.filter((e) => (e.winnerID == currentUserData.id))

    //returning result
    return resultArray
}

// function getOrdersList is getting all auctions that were ordered by current user
export const getOrdersList = async () => {
    // getting current user data
    const currentUserData = await getCurrentUserInfo()

    // getting all finished auctions
    const auctions = await getRequest("http://localhost:3000/orders/")

    // creating result array
    let resultArray = []

    // looping through auctions
    resultArray = auctions.filter((e) => (e.winnerID == currentUserData.id))

    //returning result
    return resultArray
}

// function getDeliveriesList is getting all auctions that were ordered
export const getDeliveriesList = async () => {
    // getting current user data
    const currentUserData = await getCurrentUserInfo()

    // getting all paid auctions
    const auctions = await getRequest("http://localhost:3000/orders/")

    // creating result array
    let resultArray = []

    // looping through auctions
    resultArray = auctions.filter((e) => (e.ownerID == currentUserData.id))

    //returning result
    return resultArray
}

// function getUsersAuctions gets given users aucitons 
export const getUsersAuctions = async (userID) => {
    // getting auctions
    const auctions = await getRequest("http://localhost:3000/auctions/")

    // creatintg result array
    let resultArray = []

    // looping throught auctions
    resultArray = auctions.filter(e => e.ownerID == userID)

    // returning result
    return resultArray
}

// function getUsersChats gets given users aucitons 
export const getUsersChats = async (userID) => {
    // getting chats
    const chats = await getRequest("http://localhost:3000/chats/")

    // creatintg result array
    let resultArray = []

    // looping throught chats
    resultArray = chats.filter(e => e.participants.includes(userID))

    // returning result
    return resultArray
}

// function getChatMessages gets messages from the chat
export const getChatMessages = async (chatID) => {
    // getting all messages
    const messages = await getRequest(`http://localhost:3000/messages/`)

    // creating resultArray
    let resultArray = []

    // looping through messages
    resultArray = messages.filter(e => e.chatID == chatID)

    // returning resukltArray
    return resultArray
}

// function getChatByName gets message with given name otherwise return null
export const getChatByName = async (name) => {
    // getting all chats
    const chats = getRequest(`http://localhost:3000/chats/`)

    // looping through array to find chat
    chats.map((chat) => {
        if (chat.name == name){ return chat}
    })

    // if not found return null
    return null
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


// DELETE REQUESTS

// TODO CREATE DELETEREQUEST FUNCTION

// function that delete record from endpoint
export const deleteRequest = async ( endpoint) => {
    // creating request options object to implement the body, headers and method of the request
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }

    //sending request
    try {

        // putting data to endpoint with given payload
        await fetch ( endpoint , requestOptions)
        
    } catch {

        //throwing error if occurs
        throw new Error(`Error during deleting data from ${endpoint} `)

    }
}