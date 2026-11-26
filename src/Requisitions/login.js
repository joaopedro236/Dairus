export default async function loginRequisition(token,formData,setErrorMessage,) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method:'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                recaptcha_token: token
            }),
        })
        const data = await response.json()
        if (data?.Error) setErrorMessage(data?.Error)
        if (data?.Status) window.location.reload()
    } catch (error) {
        console.error(error)
    }
}