import './profile.css'
export default function Profile({ userInformations,section }) {
    return (
        <>
            <section className={`Profile ${section == 'Profile' ? 'flex' : 'hidden'} flex-col p-3`} >
                <header className='flex flex-col mt-5 gap-2'>
                    <img src={userInformations?.image_url} alt="image user" loading='lazy' className=' w-full max-w-40 h-full max-h-40 rounded-full ' />
                    <h1>{userInformations?.name}</h1>
                    <p className='text-gray text-sm'>{userInformations?.email}</p>
                </header>
            </section>
        </>
    )
}