import React, { useState, useContext } from "react";
import "./Signup.css";
import OlxSignup from "../../assets/OlxSignup.png";
import { FirebaseContext } from "../../store/FirebaseContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateLogin = () => {
    navigate("/login");
  };

  const usernameRegex = /^[a-zA-Z]{3,}$/; // At least three characters, only letters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

  // Function to check if email or username already exists in Firestore
  const checkExistingUser = async () => {
    const emailQuery = query(collection(db, "users"), where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);

    const usernameQuery = query(collection(db, "users"), where("username", "==", username));
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!emailSnapshot.empty) {
      alert("Email is already registered.");
      return true;
    }

    if (!usernameSnapshot.empty) {
      alert("Username is already taken.");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username
    if (!usernameRegex.test(username)) {
      alert("Username must be at least 3 characters and contain only letters.");
      return;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone (only numbers)
    if (isNaN(phone) || phone.trim().length < 10) {
      alert("Phone number must contain only digits and be at least 10 characters long.");
      return;
    }

    // Validate password (you can add more rules here if needed)
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Check if email or username already exists
    const userExists = await checkExistingUser();
    if (userExists) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);

      await updateProfile(user, {
        displayName: username,
      });

      console.log("User signed up with displayName:", user.displayName);

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username,
        email,
        phone,
      });

      console.log("User data added to Firestore");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message); // Display error to the user
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="180px" src={OlxSignup} alt="OLX Signup" />
        <form onSubmit={handleSubmit} noValidate>
          <label className="labels" htmlFor="username">
            Username
          </label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            required
          />
          <br />
          <label className="labels" htmlFor="email">
            Email
          </label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
          />
          <br />
          <label className="labels" htmlFor="phone">
            Phone
          </label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            required
          />
          <br />
          <label className="labels" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={navigateLogin}>Login</a>
      </div>
    </div>
  );
}
