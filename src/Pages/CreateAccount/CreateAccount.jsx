import './createAccount.css'
import { useState } from 'react'
import GoogleButton from '../../Services/GoogleButton'
export default function CreateAccount() {
    const [googleData, setGoogleData] = useState(null)
    return (
        <>
            <section className="CreateAccount w-full min-h-screen flex flex-col items-center justify-center text-center">
                <header>

                    <h1>Cadastro</h1>
                    <p className='text-gray text-sm'>Preenche o cadastro, crie sua conta e tenha uma experiencia magica!</p>
                </header>
                <form className="flex flex-col items-center justify-center">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder="Coloque seu nome" />

                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Coloque seu e-mail" />

                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Crie sua senha" />
                    <button type="submit">Enviar</button>
                </form>
                <div className="flex items-center justify-center gap-3 w-full">
                    <div className="w-40 border-t border-gray-400" />
                    <span>OU</span>
                    <div className="w-40 border-t border-gray-400" />
                </div>
                <GoogleButton setGoogleData={setGoogleData}/>
            </section>
        </>
    )
}