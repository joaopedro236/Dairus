import './navbar.css'
import hiddenPhoto from '../../assets/no-profile-picture-icon.webp'
import iconMenu from '../../assets/menu-alt-1-svgrepo-com.svg'
export default  function Navbar({userInformations}){
    return (
        <>
        <section className="Navbar flex fixed z-[99] bg-primary top-0 left-0 w-full h-40 items-center justify-between p-2 px-6">
            <h1 className='font-bold'>Dairus</h1>
            <div className='flex gap-2 items-center '>
                <img src={userInformations?.image_url || hiddenPhoto} alt="User photo" loading='lazy' className='w-full max-w-8 rounded-full h-8' />
                <img src={iconMenu} alt="icon Menu" loading='lazy' className='w-full max-w-8 ' />
            </div>
        </section>
        </>
    )
}