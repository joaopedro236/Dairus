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
            <header clsassName="flex flex-col items-center justify-center text-center gap-2">
                <h1>Login</h1>
                <p className='text-gray text-sm'>Faça login para ter acesso a sua conta e aproveitar todos os recursos!</p>
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <label htmlFor="email">Seu Email</label>
                <input type="email" name="email" id="email" placeholder='Digite seu email' required/>
                <label htmlFor="password">Sua Senha</label>
                <input type="password" name="password" id="password"  placeholder='Digite sua senha' required/>
                <button type="submit">Enviar</button>
            </form>
            <p>Você não tem uma conta? <span onClick={() => setSection('createAccount')} className="text-blue-500 hover:underline cursor-pointer">Crie uma</span></p>
        </section>
        </>
    )
}