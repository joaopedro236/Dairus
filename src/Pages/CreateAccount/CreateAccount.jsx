import './createAccount.css'
import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import GoogleButton from '../../Services/GoogleButton'
import createAccountGoogleRequisition from '../../Requisitions/createAccountGoogle'
import createAccountRequisition from '../../Requisitions/createAccount'
export default function CreateAccount({section, setSection}) {
    const [googleData, setGoogleData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')

    const passwordStrength = zxcvbn(password).score

    const strengthLabels = [
        'Muito fraca',
        'Fraca',
        'Razoável',
        'Forte',
        'Muito forte'
    ]
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordStrength < 3) return;

        if (googleData) {
            await createAccountGoogleRequisition({
                credential: googleData,
                password
            }, setLoading);
            return;
        }

        const data = Object.fromEntries(new FormData(e.target));
        await createAccountRequisition(data, setLoading);
    };
    return (
        <>
            <section className={`CreateAccount w-full min-h-screen ${section === 'createAccount' ? 'flex' : 'hidden'} flex-col items-center justify-center text-center`}>
                <header>

                    <h1>Cadastro</h1>
                    <p className='text-gray text-sm'>Preenche o cadastro, crie sua conta e tenha uma experiencia magica!</p>
                </header>
                {!googleData ? (
                    <>

                        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" id="name" placeholder="Coloque seu nome" required />

                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" placeholder="Coloque seu e-mail" required />

                            <label htmlFor="password">Senha</label>
                            <input type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="Crie sua senha" required />
                            {password && (
                                <div className="w-full text-left">
                                    <div className="flex gap-1 mt-2">
                                        {[0, 1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${level < passwordStrength
                                                    ? [
                                                        'bg-red-500',
                                                        'bg-orange-500',
                                                        'bg-yellow-400',
                                                        'bg-green-500'
                                                    ][passwordStrength - 1]
                                                    : 'bg-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm mt-1">
                                        Força da senha: {strengthLabels[passwordStrength]}
                                    </p>
                                </div>
                            )}
                            <button type="submit" disabled={passwordStrength < 3}>{loading ? 'Carregando' : 'Enviar'}</button>
                        </form>
                        <div className="flex items-center justify-center gap-3 w-full">
                            <div className="w-40 border-t border-gray-400" />
                            <span>OU</span>
                            <div className="w-40 border-t border-gray-400" />
                        </div>
                        <GoogleButton setGoogleData={setGoogleData} />
                    </>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                            <label>Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            {password && (
                                <div className="w-full text-left">
                                    <div className="flex gap-1 mt-2">
                                        {[0, 1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${level < passwordStrength
                                                    ? [
                                                        'bg-red-500',
                                                        'bg-orange-500',
                                                        'bg-yellow-400',
                                                        'bg-green-500'
                                                    ][passwordStrength - 1]
                                                    : 'bg-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm mt-1">
                                        Força da senha: {strengthLabels[passwordStrength]}
                                    </p>
                                </div>
                            )}
                            <button type="submit" disabled={passwordStrength < 3 || loading}>
                                {loading ? 'Carregando' : 'Finalizar cadastro'}
                            </button>
                        </form>

                    </>
                )}
                <p>Você já tem uma conta? <span onClick={() => setSection('login')} className="text-blue-500 hover:underline">Faça login</span></p>
            </section>
        </>
    )
}