export default async function createAccountRequisition(data, setLoading) {
    try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/createAccount`, {
            method: 'POST'
            , credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json()
        if (responseData?.Error) {
            alert(responseData?.Error)
        }
    } catch (error) {
        alert(error)
    }finally{
        setLoading(false)
    }
}   