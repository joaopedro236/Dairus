export default async function loginRequisition(formData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method:'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (data?.Error) alert(data?.Error)
    } catch (error) {
        alert(error)
    }
}