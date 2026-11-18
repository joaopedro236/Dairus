
import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import { useState, useEffect } from 'react'
import Loading from './Pages/Loading/Loading'
import CreateAccount from './Pages/CreateAccount/CreateAccount'
import Login from './Pages/Login/Login'
import getUserRequisition from './Requisitions/getUser'
import Navbar from './Pages/Navbar/Navbar'
import checkUserRequisition from './Requisitions/checkUser'
function App() {
  const [section, setSection] = useState('login')
  const [loading, setLoading] = useState(false)
  const [userInformations, setUserInformations] = useState({})
  const [accountExists, setAccountExists] = useState(false)
  useEffect(() => {
    checkUserRequisition(setAccountExists, setLoading)
  }, [])
  useEffect(() => {
    getUserRequisition(setUserInformations)
  }, [accountExists])
  return (
    <>
      {
        loading && <Loading />
      }
      <section className={`${!accountExists ? 'flex' : 'hidden'}`}>

        <CreateAccount section={section} setSection={setSection} />
        <Login section={section} setSection={setSection} />
      </section>
      <main className={`${accountExists ? 'flex' : 'hidden'}`}>
        <Navbar accountExists={accountExists}/>
      </main>
    </>
  )
}

export default App
