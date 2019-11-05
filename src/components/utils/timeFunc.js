export const timeFunc = (updatedAt) => {
    const minPassed = Math.floor((new Date() - new Date(updatedAt))/1000/60)
    if(minPassed < 1)
        return 'Now'
    else if(minPassed < 60)
        return `${minPassed} min ago`
    else if(minPassed < 24*60)
        return `${Math.floor(minPassed/60)} hours ago`
    else
        return updatedAt
}