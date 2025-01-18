import React from 'react'
import Tops from '../components/top/Tops'
import Popupss from '../components/popup/Popupss'
import Login from '../components/login/Login'
import DisableBackButton from '../components/disable_back_button/DisableBackButton';



function Home() {
  sessionStorage.removeItem('isLoggedin');
  sessionStorage.removeItem('role')
  return (
    <>
    <DisableBackButton/>
    <Popupss/>
    <Tops/>
    <Login/>
   
    
    </>
  )
}

export default Home
