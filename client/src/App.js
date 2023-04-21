import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Students from './components/Students';
import Messaging from './components/Messaging';
import Pairing from './components/Pairing';
import Feedback from './components/Feedback';
import Instructor from './components/Instructor';
import Footer from './components/Footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Admindashboard from './components/Admindashboard';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserRole(null);
  };

  return (
    <Router>
    <NavBar logout={logout} token={token} />

    <Routes>
      <Route path="/loginform" element={!token ? <LoginForm setToken={setToken} setUserRole={setUserRole} /> : <Navigate to={userRole === 'admin' ? '/admindashboard' : '/studentdashboard'} />} />
      <Route path="/signupform" element={!token ? <SignupForm setToken={setToken} setUserRole={setUserRole} /> : <Navigate to={userRole === 'admin' ? '/admindashboard' : '/studentdashboard'} />} />
            {userRole === 'admin' && (
      <Route path="/admindashboard" element={ <div className="dashboard-container">
            <Sidebar userRole={userRole}/>
            <Admindashboard />
          </div>} />
          )}
          {userRole === 'student' && (
      <Route path="/studentdashboard" element={ <div className="dashboard-container">
              <Sidebar userRole={userRole}/>
              <Messaging />
              </div>} />
          )}
      <Route path="/pairing" element={ <div className="dashboard-container">
              <Sidebar userRole={userRole}/>
              <Pairing />
              </div>} />
      <Route path="/students" element={ <div className="dashboard-container">
              <Sidebar userRole={userRole}/>
              <Students token={token} />
              </div>} />
    </Routes>

    <Footer />
  </Router>
    // <Router>
    
    //   <NavBar logout={logout} token={token} />
   
    //     <Routes>
    //       <Route
    //         path="/loginform"
    //         element={!token ? <LoginForm setToken={setToken} setUserRole={setUserRole} /> : <Homepage token={token} />}
    //       />
    //       <Route
    //         path="/signupform"
    //         element={!token ? <SignupForm setToken={setToken} setUserRole={setUserRole} /> : <Homepage token={token} />}
    //       />
    //        <Route
    //         path="/pairing"
    //         element={token ? (<Pairing setToken={setToken} setUserRole={setUserRole} />) : (<Homepage token={token} />)}
    //       />
    //       <Route
    //         path="/"
    //         element={
    //           token ? (
    //             <Homepage token={token} />
    //           ) : (
    //             <Homepage setToken={setToken} setUserRole={setUserRole} />
    //           )
    //         }
    //       />
    //       {userRole === 'admin' && (
    //         <Route path="/admindashboard" element={ <div className="dashboard-container">
    //         <Sidebar userRole={userRole}/>
    //         <Admindashboard />
    //       </div>} />
    //       )}
    //       {userRole === 'student' && (
    //         <Route path="/studentdashboard" element={ <div className="dashboard-container">
    //           <Sidebar userRole={userRole}/>
    //           <Messaging />
    //           </div>} />
    //       )}

    //     </Routes>
      
    //   <Footer />
    // </Router>

  );
}

export default App;
