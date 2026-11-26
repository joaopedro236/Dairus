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
                <div className="likes flex flex-wrap gap-3 items-center">
                    <button
                        type="button"
                        title="Quantidade de gostei"
                        className="cursor-pointer flex flex-wrap gap-2 items-center"

                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"

                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M7 10v12" />
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L13 2a3 3 0 0 1 2 3.88Z" />
                        </svg>
                        <p>{info?.likes}</p>
                    </button>
                    <button
                        type="button"
                        title="Quantidade de não gostei"
                        className="cursor-pointer flex flex-wrap gap-2 items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L11 22a3 3 0 0 1-2-3.88Z" />
                        </svg>
                        <p>{info?.deslikes}</p>
                    </button>
                </div>
            </section>
        </>
    )
}