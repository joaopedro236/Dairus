import './profile.css'
import hiddenPhoto from '../../assets/no-profile-picture-icon.webp'

export default function Profile({ userInformations,section }) {
    return (
        <>
            <section className={`Profile ${section == 'Profile' ? 'flex' : 'hidden'} flex-col `} >
                <header className='flex  mt-5 gap-2  w-full text-center'>
                    <img src={userInformations?.image_url || hiddenPhoto} alt="image user" loading='lazy' className=' w-full h-full  rounded-full ' />
                
                    <h1>{userInformations?.name}</h1>
        
                </header>
                <p className='text-gray '>{userInformations?.description}</p>

            </section>
        </>
    )
}