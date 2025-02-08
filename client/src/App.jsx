import {React,lazy} from 'react'
import Home from './pages/Home'
import Signupone from './components/login/Signups'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected_route/Protectedroutes';
const Admincontent =lazy(()=>import('./pages/admincontent'));
const Studentcontent = lazy(()=>import('./pages/Studentcontent'));
const Staffcontent =lazy(()=>import('./pages/Staffcontent')) ;
const Parentscontent =lazy(()=>import('./pages/Parentscontent')) ;
const DisableBackButton =lazy(()=>import('./components/disable_back_button/DisableBackButton')) ;
const Superstaffcontent =lazy(()=>import('./pages/Superstaffcontent')) ;


function App() {
  return (
    
    <Router>
      <DisableBackButton/>
    <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/signupone' element={<Signupone/>}/>
        

        {/* Protected Route */}
        <Route
            path="/Admincontent"
            element={
                <ProtectedRoute>
                    <Admincontent/>
                </ProtectedRoute>
            }
        />
        <Route
      path="/Studentcontent"
      element={
        <ProtectedRoute>
          <Studentcontent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/Staffcontent"
      element={
        <ProtectedRoute>
          <Staffcontent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/Parentscontent"
      element={
        <ProtectedRoute>
          <Parentscontent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/superstaffcontent"
      element={
        <ProtectedRoute>
          <Superstaffcontent />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Home/>} />
    </Routes>
</Router>
  )
}

export default App
