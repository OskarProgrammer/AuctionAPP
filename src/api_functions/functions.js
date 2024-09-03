
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