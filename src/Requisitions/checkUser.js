export default async function checkUserRequisition({setAccountExists, setLoading}) {
    setLoading(true)
    try {
    
        const response = await fetch(`${import.meta.env.VITE_API_URL}/checkUser`, {
            credentials:'include'
        })
        const data = await response.json()
        if (data?.Error) {
            alert(data?.Error)
        }
        setAccountExists(true)
    } catch (error) {
        alert(error)
    } finally{
        setLoading(false)
    }
}