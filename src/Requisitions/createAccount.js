export default async function createAccountRequisition(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/createAccount`, {
            method: 'POST'
            , credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const data = await response.json()

    } catch (error) {
        alert(error)
    }
}   