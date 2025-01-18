import React from 'react'
import Home from './pages/Home'
import Signupone from './components/login/Signups'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected_route/Protectedroutes';
import Admincontent from './pages/admincontent';
import Studentcontent from './pages/Studentcontent';
import Staffcontent from './pages/Staffcontent';
import Parentscontent from './pages/Parentscontent';
import DisableBackButton from './components/disable_back_button/DisableBackButton';


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
    <Route path="*" element={<Home/>} />
    </Routes>
</Router>
  )
}

export default App
