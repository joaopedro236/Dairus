export default async function getUserRequisition(setErrorMessage,setUserInformations) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser`, {
            credentials:'include'
        })
        const data = await response.json()
        if (data?.Error) setErrorMessage(data?.Error)
        setUserInformations(data)
    } catch (error) {
        console.error(error)
    }
}