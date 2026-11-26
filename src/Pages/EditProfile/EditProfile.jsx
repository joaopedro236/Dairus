import './editProfile.css'
import { useState } from 'react'
import editProfileRequisition from '../../Requisitions/editProfie'
export default function EditProfile({ section, setSection, setErrorMessage }) {
    const [activeField, setActiveField] = useState(null)

    const [loading, setLoading] = useState(false)
    const toggleField = (field) => {
        setActiveField(activeField === field ? null : field)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await editProfileRequisition(formData, setErrorMessage, setLoading);
    }
    return (
        <>
            <section className={`editProfile w-full ${section == 'editProfile' ? 'flex' : 'hidden'} flex-col justify-center  gap-3 `}>
                <header>
                    <h1>Editar Seu perfil</h1>
                    <p className='text-gray'>Nessa sessão você pode editar seu perfil</p>
                    <button className={`buttonRemove fixed top-6 left-4 w-8 h-8 rounded-full bg-transparent ${activeField ? 'hidden' : 'flex items-center justify-center'}`} onClick={() => { setSection('Profile') }}>X</button>
                </header>
                {activeField === null ? (
                    <div className='editProfileFields flex flex-col gap-3'>
                        <button type='button' className='editProfileButton' onClick={() => toggleField('name')}>Editar Nome</button>
                        <button type='button' className='editProfileButton' onClick={() => toggleField('photo')}>Editar Foto</button>
                        <button type='button ' className='editProfileButton' onClick={() => toggleField('description')}>Editar Descrição</button>
                        <button type='button' className='editProfileButton' onClick={() => toggleField('email')}>Editar Email</button>
                        <button type='button' className='editProfileButton' onClick={() => toggleField('password')}>Editar Senha</button>
                    </div>
                ) : (
                    <form
                        className='editProfileField'
                        onSubmit={handleSubmit}
                    >
                        <button className='buttonRemove fixed top-4 left-4 w-8! h-8 rounded-full bg-transparent' onClick={() => { setActiveField(null) }}>X</button>


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
                        <button type='submit' className='editProfileSubmit' >
                            {loading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                )}
            </section >
        </>
    )
}
