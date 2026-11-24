import './editProfile.css'
import { useState } from 'react'

export default function EditProfile({ section, setSection }) {
    const [activeField, setActiveField] = useState(null)

    const toggleField = (field) => {
        setActiveField(activeField === field ? null : field)
    }

    return (
        <>
            <section className={`editProfile w-full ${section == 'editProfile' ? 'flex' : 'hidden'} flex-col justify-center `}>
                <header>
                    <h1>Editar Seu perfil</h1>
                    <p className='text-gray'>Nessa sessão você pode editar seu perfil</p>
                    <button className='fixed top-4 left-4 w-8 h-8 rounded-full bg-transparent border-2 border-black' onClick={() => { setSection('Profile') }}>X</button>
                </header>
                {activeField === null ? (
                    <div className='editProfileFields flex flex-col gap-3'>
                        <button type='button' onClick={() => toggleField('name')}>Editar Nome</button>
                        <button type='button' onClick={() => toggleField('photo')}>Editar Foto</button>
                        <button type='button' onClick={() => toggleField('description')}>Editar Descrição</button>
                        <button type='button' onClick={() => toggleField('email')}>Editar Email</button>
                        <button type='button' onClick={() => toggleField('password')}>Editar Senha</button>
                    </div>
                ) : (
                    <div className='editProfileField'>
                        {activeField === 'name' && (
                            <div className='inputGroup'>
                                <label htmlFor='editName'>Nome</label>
                                <input id='editName' name='name' type='text' placeholder='Digite seu nome' />
                            </div>
                        )}
                        {activeField === 'photo' && (
                            <div className='inputGroup'>
                                <label htmlFor='editPhoto'>Foto de perfil</label>
                                <input id='editPhoto' name='photo' type='file' accept='image/*' />
                            </div>
                        )}
                        {activeField === 'description' && (
                            <div className='inputGroup'>
                                <label htmlFor='editDescription'>Descrição</label>
                                <textarea id='editDescription' name='description' placeholder='Digite sua descrição' />
                            </div>
                        )}
                        {activeField === 'email' && (
                            <div className='inputGroup'>
                                <label htmlFor='editEmail'>Email</label>
                                <input id='editEmail' name='email' type='email' placeholder='Digite seu email' />
                            </div>
                        )}
                        {activeField === 'password' && (
                            <div className='inputGroup'>
                                <label htmlFor='editPassword'>Senha</label>
                                <input id='editPassword' name='password' type='password' placeholder='Digite sua nova senha' />
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    )
}
