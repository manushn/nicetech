import React ,{lazy}from 'react'
const  Tops =lazy(()=>import('../components/top/Tops')) ;
const Popupss =lazy(()=>import('../components/popup/Popupss')); 
const Login =lazy(()=>import('../components/login/Login')); 
const DisableBackButton =lazy(()=>import('../components/disable_back_button/DisableBackButton')) ;



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
