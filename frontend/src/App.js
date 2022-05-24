import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/Actions/User";

import Login from "./screens/login";
import Signup from "./screens/signup";
import Home from "./screens/home";
import Profile from "./screens/profile";
import AddFriends from "./screens/addFriends";
import MobileAppBar from "./components/moblieAppBar";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(loadUser())
  }, [dispatch])
  
  const  { isAuthenticated }= useSelector((state)=> state.user);

  return (
    <>
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Home/>:<Login />} 
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Home/>:<Signup />}
        />
        <Route
          path="/friends"
          element={isAuthenticated ? <AddFriends/>:<Login />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <Profile/>:<Login />}
        />
      </Routes>
      <MobileAppBar/>
    </Router>
    
    </>
  );
}

export default App;
