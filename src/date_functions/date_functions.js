
// fucntion that get hours between two dates
export const getHoursDiff = (firstDate, secondDate) => {
    // calculating diff between two dates
    let diff = new Date( 
        Math.abs(firstDate.getTime() - secondDate.getTime())
     ) // in miliseconds

    // caluclation hours diff
    const hoursDiff = Math.round(diff / (1000 * 60 * 60))

    // returning result
    return hoursDiff
}

// fucntion that get minutes between two dates
export const getMinutesDiff = (firstDate, secondDate) => {
    // calculating diff between two dates
    let diff = new Date( 
        Math.abs(firstDate.getTime() - secondDate.getTime())
     ) // in miliseconds

    // caluclation hours diff
    const minutesDiff = Math.round(diff / (1000 * 60) )

    // returning result
    return minutesDiff
}

// fucntion that get seconds between two dates
export const getSecondsDiff = (firstDate, secondDate) => {
    // calculating diff between two dates
    let diff = new Date( 
        Math.abs(firstDate.getTime() - secondDate.getTime())
     ) // in miliseconds

    // caluclation seconds diff
    const secondsDiff = Math.round(diff / (1000) )

    // returning result
    return secondsDiff
}

// function that give full diff between dates in hours:minutes:seconds
export const getFullDiff = (firstDate, secondDate) => {

    // calculating diff between two dates
    let s = new Date( 
        Math.abs(firstDate.getTime() - secondDate.getTime())
    ) // in miliseconds

    // removing miliseconds
    let ms = s % 1000
    s = (s - ms) / 1000

    // creating seconds
    let secs = s % 60
    s = (s - secs) / 60

    // creating minutes
    let mins = s % 60

    // creating hours
    let hrs = (s - mins) / 60

    return hrs + ':' + mins + ':' + secs
}


// function that calculates expire time after given hours minutes seconds
export const getExpireTime = (date, hours, minutes, seconds) =>{
    // calculating additive hours into miliseconds
    let additiveHours = hours * 60 * 60 * 1000
    // calculating additive minutes into miliseconds
    let additiveMinutes = minutes * 60 * 1000
    // calculating additive seconds into miliseconds
    let additiveSeconds = seconds * 1000

    if ( date == "" ){
        return new Date(Date.now() + additiveHours + additiveMinutes + additiveSeconds)
    }else{ 
        return new Date(new Date(date).getTime() + additiveHours + additiveMinutes + additiveSeconds )
    }
}

// function that add hours to date
export const addHours = (date, hours) => {
    // calculating additive hours into miliseconds
    let additiveHours = hours * 60 * 60 * 1000

    return new Date(new Date(date).getTime() + additiveHours)
}

// function that add minutes to date
export const addMinutes = (date, minutes) => {
    // calculating additive minutes into miliseconds
    let additiveMinutes = minutes * 60 * 1000

    return new Date(new Date(date).getTime() + additiveMinutes)
}

// function that add seconds to date
export const addSeconds = (date, seconds) => {
    // calculating additive seconds into miliseconds
    let additiveSeconds = seconds * 1000

    return new Date(new Date(date).getTime() + additiveSeconds)
}

