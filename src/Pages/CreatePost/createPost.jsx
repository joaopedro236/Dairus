import './createPost.css'
import createPostRequisition from '../../Requisitions/createPost'
import { useState } from 'react'
export default function CreatePost({section, setErrorMessage}) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await createPostRequisition(formData, setErrorMessage, setLoading);
    }
    return (
        <>
        <section className={`createPost  ${section =='CreatePost' ? 'flex' : 'hidden'} flex-col gap-5 w-full`}>
            <header className='flex flex-col gap-1'>
                <h1>Criar Post</h1>
                <p className='text-sm text-gray'>Nessa seção, você cria posts, preencha os inputs e envia</p>
            </header>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="title" className='text-lg'>Titulo <span className='text-red-600 text-lg font-bold'>*</span></label>
                <input type="text" name="title" id="title"  placeholder='Preencha o titulo' required minlength="3" maxlength="100"/>
                <label htmlFor="description" className='text-lg'>Descrição <span className='text-red-600 text-lg font-bold'>*</span></label>
                <textarea name="description" id="description"  placeholder='Digite sua descrição' required  minlength="10" maxlength="200"/>
                <label htmlFor="image" className='text-lg'>Imagem</label>
                <input type="file" name="image" id="image" accept='image/*' />
                <div className="buttons flex flex-wrap gap-3 mt-8!">
                    <button type='submit' className='bg-color-primary text-white w-full max-w-28 h-12  rounded-md '>{loading ? 'Enviando...' : 'Enviar'}</button>
                    <button type='reset' className='border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors w-full max-w-28 h-12 rounded-md '>Reset</button>
                </div>
            </form>
        </section>
        </>
    )
}