export default async function editProfileRequisition(formData, setErrorMessage, setLoading) {
    try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/editProfile`, {
            method: 'PUT',
            credentials: "include",
            body: formData
        });
        const data = await response.json();
        if (data?.Error) {setErrorMessage(data?.Error);}
        if (data?.Status) {window.location.reload();}
    } catch (error) {
        console.error(error);
        setErrorMessage("Ocorreu um erro ao criar o post.");
    } finally {
        setLoading(false);
    }
}