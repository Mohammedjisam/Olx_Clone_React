import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Create from "./pages/Create";
import ViewPost from "./pages/ViewPost";
import { AuthContext } from "./store/FirebaseContext";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Post from "./store/PostContext";

function App() {
  const { user, setuser } = useContext(AuthContext);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setuser(user); // Set user state (either user object or null)
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [setuser]);

  return (
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Redirect logged-in users from signup and login pages */}
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/viewpost" element={<ViewPost />} />
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
