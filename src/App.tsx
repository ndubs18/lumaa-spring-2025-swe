import { useEffect, useState } from 'react'
import { AuthForm } from './components/AuthForm'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  const setLoggedInWrapper = () => {
    if (loggedIn == false) {
      setLoggedIn(true);
    }
    else {
      localStorage.removeItem('token');
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    let token = localStorage.getItem('token')
    !token ? setLoggedIn(false) : setLoggedIn(true);
  })
  return (
    <>
      {!loggedIn ? <AuthForm onLogin={setLoggedInWrapper} /> : <Dashboard logoutHandler={setLoggedInWrapper} />}
    </>
  )
}

export default App
