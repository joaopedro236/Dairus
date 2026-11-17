
import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import { useState } from 'react'
import CreateAccount from './Pages/CreateAccount/CreateAccount'
import Login from './Pages/Login/Login'
function App() {
 const [section, setSection] = useState('login')
  return (
    <>
      <CreateAccount section={section} setSection={setSection}/>
      <Login section={section} setSection={setSection}/>
    </>
  )
}

export default App
