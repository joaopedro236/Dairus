import './login.css'
import loginRequisition from '../../Requisitions/login'
export default function Login({section, setSection}) {
    const handleSubmit = async (e)=>{
         e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        await loginRequisition(formData)
    }
    return(
        <>
        <section className={`login CreateAccount w-full min-h-screen ${section === 'login' ? 'flex' : 'hidden'} flex-col items-center justify-center gap-3`}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Seu Email</label>
                <input type="email" name="email" id="email" placeholder='Digite seu email' required/>
                <label htmlFor="password">Sua Senha</label>
                <input type="password" name="password" id="password"  placeholder='Digite sua senha' required/>
                <button type="submit">Enviar</button>
            </form>
            <p>Você não tem uma conta? <button type="button" onClick={() => setSection('createAccount')} className="text-blue-500 hover:underline">Crie uma</button></p>
        </section>
        </>
    )
}