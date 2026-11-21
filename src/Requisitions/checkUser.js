export default async function checkUserRequisition({setErrorMessage, setAccountExists, setLoading}) {
    setLoading(true)
    try {
    
        const response = await fetch(`${import.meta.env.VITE_API_URL}/checkUser`, {
            credentials:'include'
        })
        const data = await response.json()
        if (data?.Error) {
            setErrorMessage(data?.Error)
        }
        setAccountExists(data?.Status)
    } catch (error) {
        console.error(error)
    } finally{
        setLoading(false)
    }
}