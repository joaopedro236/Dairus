export default async function createAccountRequisition(data, setLoading, setErrorMessage) {
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
            setErrorMessage(responseData?.Error)
        }
        if (responseData?.Status) window.location.reload()

    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}   