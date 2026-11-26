import "./StylesGlobals/reset.css";
import "./StylesGlobals/root.css";
import "./StylesGlobals/assets.css";
import { useState, useEffect } from "react";
import Loading from "./Pages/Loading/Loading";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import Login from "./Pages/Login/Login";
import getUserRequisition from "./Requisitions/getUser";
import Navbar from "./Pages/Navbar/Navbar";
import checkUserRequisition from "./Requisitions/checkUser";
import Profile from "./Pages/Profile/Profile";
import Alert from "./Components/Alert/Alert";
import CreatePost from "./Pages/CreatePost/createPost";
function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [section, setSection] = useState("login");
  const [loading, setLoading] = useState(false);
  const [userInformations, setUserInformations] = useState({});
  const [accountExists, setAccountExists] = useState(false);
  useEffect(() => {
    checkUserRequisition({ setAccountExists, setLoading, setErrorMessage });
  }, []);
  useEffect(() => {
    if (accountExists){
        getUserRequisition(setUserInformations, setErrorMessage);
    }
  }, [accountExists]);
  useEffect(() => {
    if (!accountExists) {
      document.body.style.paddingTop = "";
      return;
    }

    const navbar = document.querySelector(".Navbar");
    if (!navbar) return;

    const originalPosition = navbar.style.position;
    const originalTop = navbar.style.top;
    const updateBodyPadding = () => {
      navbar.style.position = "fixed";
      navbar.style.top = "0";
      document.body.style.paddingTop = `${navbar.getBoundingClientRect().height + 35}px`;
    };

    updateBodyPadding();
    window.addEventListener("resize", updateBodyPadding);
    return () => {
      window.removeEventListener("resize", updateBodyPadding);
      navbar.style.position = originalPosition;
      navbar.style.top = originalTop;
      document.body.style.paddingTop = "";
    };
  }, [accountExists]);
  
  return (
    <>
      {errorMessage && (
        <Alert errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      {loading && <Loading />}
      <section className={`${!accountExists ? "flex" : "hidden"}`}>
        <CreateAccount
          setErrorMessage={setErrorMessage}
          section={section}
          setSection={setSection}
        />
        <Login
          section={section}
          setErrorMessage={setErrorMessage}
          setSection={setSection}
        />
      </section>
      <main className={`${accountExists ? "flex" : "hidden"} flex-col `}>
        <Navbar userInformations={userInformations} setSection={setSection} />
        <Profile  userInformations={userInformations} section={section} setSection={setSection} setErrorMessage={setErrorMessage}/>
        <CreatePost section={section} setErrorMessage={setErrorMessage} setLoading={setLoading}/>
      </main>
    </>
  );
}

export default App;
