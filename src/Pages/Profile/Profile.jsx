import "./profile.css";
import hiddenPhoto from "../../assets/no-profile-picture-icon.webp";
import EditProfile from "../EditProfile/EditProfile";
import Post from "../../Components/Post/Post";
export default function Profile({ userInformations, section, setSection, setErrorMessage }) {
  const posts = userInformations?.posts?.map((post) => ({
    ...post,
    name: userInformations.name,
    image_url: userInformations.image_url
  })) || [];
  return (
    <>
      <section
        className={`Profile ${section == "Profile" ? "flex" : "hidden"} flex-col `}
      >
        <header className="flex  mt-5 gap-2 w-full text-center">
          <img
            src={userInformations?.image_url || hiddenPhoto}
            alt="image user"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = hiddenPhoto;
            }}
            className=" w-full h-full  rounded-full "
          />
          <div className="flex flex-col gap-2">
            <h1>{userInformations?.name}</h1>

            <div className="flex gap-4 flex-wrap">
              <div className="flex flex-col">
                <h1>{userInformations?.followersQuantity}</h1>
                <p>Seguidores</p>
              </div>
              <div className="flex flex-col ">
                <h1>{userInformations?.followingQuantity}</h1>
                <p>Seguindo</p>
              </div>
              <div className="flex flex-col ">
                <h1>{userInformations?.postsQuantity}</h1>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </header>
        <p className="text-gray ">{userInformations?.description}</p>
        <div className="profileButtons flex items-center justify-between w-full">
          <button onClick={() => { setSection('editProfile') }}>Editar Perfil</button>
          <button>Compartilhar Perfil</button>
        </div>
        <div className="profilePosts   flex flex-col w-full gap-8 mt-5">
          <header className="flex flex-col">
            <h1 className="text-lg">Seus Posts</h1>
          </header>
          {posts.map((post, index) => (
            <Post
              key={index}
              info={post}
            />
          ))}
        </div>
      </section>
      <EditProfile section={section} setSection={setSection} setErrorMessage={setErrorMessage} />
    </>
  );
}
