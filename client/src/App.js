import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Students from './components/Students';
import Messaging from './components/Messaging';
import Pairing from './components/Pairing1';
import Feedback from './components/Feedback';
import Instructor from './components/Instructor';
import PairList from './components/Pairlist';
import Footer from './components/Footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Admindashboard from './components/Admindashboard';
import Studentdashboard from './components/Studentdashboard';
import Adminprofile from './components/profile/Adminprofile';
import Studentprofile from './components/profile/Studentprofile';
import axios from 'axios';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.user.role); // Store the role of the logged-in user
      setToken(response.data.token);
      setUserRole(response.data.user.role); // Set the role of the logged-in user
   
      console.log(response.data.user.email);
    } catch (error) {
      console.error(error);
    }
  };

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
          
          {/* <Route path="/" component={PairList} /> */}
          <Route
            path="/loginform"
            element={!token ? <LoginForm setToken={setToken} setUserRole={setUserRole} /> : <Homepage token={token} />}
          />
          <Route
            path="/signupform"
            element={!token ? <SignupForm setToken={setToken} setUserRole={setUserRole} /> : <Homepage token={token} />}
          />
          <Route
            path="/"
            element={
              token ? (
                <Pairing token={token} />
              ) : (
                <Pairing setToken={setToken} setUserRole={setUserRole} />
              )
            }
          />
          {userRole === 'admin' && (
            <Route path="/admindashboard" element={ <div className="dashboard-container">

            <Sidebar userRole={userRole}/>
            <Admindashboard />
          </div>} />
          )}
          {userRole === 'student' && (
      <Route path="/studentdashboard" element={ <div className="dashboard-container">
              <Sidebar userRole={userRole}/>
              <Studentdashboard />
              </div>} />
          )}
          {userRole === 'student' && (
      <Route path="/studentprofile" element={ <div className="dashboard-container">
              <Sidebar userRole={userRole}/>
              <Studentprofile token={token}/>
              </div>} />
          )}
                    {userRole === 'admin' && (
      <Route path="/adminprofile" element={ <div className="dashboard-container">
              <Sidebar userRole={userRole}/>
              <Adminprofile token={token} />
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


  );
}

export default App;
