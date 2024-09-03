
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