import "./profile.css";
import hiddenPhoto from "../../assets/no-profile-picture-icon.webp";
import EditProfile from "../EditProfile/EditProfile";
export default function Profile({ userInformations, section, setSection }) {
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

            <div className="flex gap-4">
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
          <button onClick={()=> {setSection('editProfile')}}>Editar Perfil</button>
          <button>Compartilhar Perfil</button>
        </div>
      </section>
        <EditProfile section={section} setSection={setSection}/>
    </>
  );
}
