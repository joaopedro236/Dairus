import './Post.css'
import hiddenPhoto from "../../assets/no-profile-picture-icon.webp";

export default function Post({ info }) {
    return (
        <>
            <section className="post flex flex-col w-full gap-4">
                <header className='flex gap-2 items-center'>
                    <img
                        src={info?.image_url || hiddenPhoto}
                        alt="image user"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = hiddenPhoto;
                        }}
                        className="rounded-full "
                    />
                    <p className=' text-gray'>{info?.name}</p>
                </header>
                <div className='flex flex-col gap-2'>
                    <h1>{info?.title}</h1>
                    <p className='text-gray text-sm'>{info?.description}</p>
                </div>
                {info?.post_image_url && (
                    <div className="post-image-container">
                        <div
                            className="post-image-blur"
                            style={{
                                backgroundImage: `url(${info.post_image_url})`
                            }}
                        />

                        <img
                            src={info.post_image_url}
                            alt="Imagem da publicação"
                            loading="lazy"
                            className="post-image-original"
                        />
                    </div>
                )}
            </section>
        </>
    )
}