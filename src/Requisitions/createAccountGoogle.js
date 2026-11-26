export default async function createAccountRequisition(data, setErrorMessage, setLoading,token) {
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
                    password: data.password,

                    recaptcha_token: token
                })
            }
        )

        const responseData = await response.json()

        if (responseData?.Error) {
            setErrorMessage(responseData.Error)
        }

        if (responseData?.Status) window.location.reload()
        return responseData

    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}