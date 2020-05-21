import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
// pages
import SignInSignUp from './pages/SignInSignUp'
import { AuthContext } from './utils/contexts'
import { isUserLogedApi } from './api/auth'

export default function App() {

  // estados en react
  const [user, setUser]=useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refresCheckLogin, setRefresCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLogedApi())
    setRefresCheckLogin(false)
    setLoadUser(true)
  }, [refresCheckLogin])

  if(!loadUser) return null;

  return (
  <AuthContext.Provider value={user} >{user ? <h1>Estas logueado</h1> :<SignInSignUp setRefresCheckLogin={setRefresCheckLogin} /> }
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
  </AuthContext.Provider >
    );  
}
