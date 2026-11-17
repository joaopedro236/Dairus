export default async function createAccountRequisition(data, setLoading) {
    try {
        setLoading(true)

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/createAccount/googleAuth`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    credential: data.credential,
                    password: data.password
                })
            }
        )

        const responseData = await response.json()

        if (responseData?.Error) {
            alert(responseData.Error)
        }

        return responseData

    } catch (error) {
        alert(error)
    } finally {
        setLoading(false)
    }
}