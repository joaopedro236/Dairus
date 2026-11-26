import './Post.css'
import hiddenPhoto from "../../assets/no-profile-picture-icon.webp";

export default function Post({info}) {
    return (
        <>
            <section className="post flex flex-col w-full gap-5">
                <header className='flex gap-1'>
                    <img
                        src={info?.image_url || hiddenPhoto}
                        alt="image user"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = hiddenPhoto;
                        }}
                        className=" w-5 h-5 rounded-full "
                    />
                    <p className='text-sm text-gray'>{info?.name}</p>
                </header>
                <h1>{info?.title}</h1>
                <p className='text-gray'>{info?.description}</p>
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