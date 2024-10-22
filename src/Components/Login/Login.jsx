import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate
    const { db } = useContext(FirebaseContext);

    const navigateSignup = () => {
        navigate("/signup");
    };

    // Email format validation
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Form validation function
    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // If form validation fails, stop submission
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((usercredentials) => {
                alert("You are successfully logged in");
                navigate("/");
            })
            .catch((error) => {
                alert("Login failed. Please check your email and password.");
            });
    };

    return (
        <div>
            <div className="loginParentDiv">
                {/* <img width="200px" height="200px" src={Logo}></img> */}
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <br />
                    <br />
                    <button type="submit">Login</button>
                </form>
                <a onClick={navigateSignup} style={{ cursor: "pointer" }}>
                    Signup
                </a>
            </div>
        </div>
    );
}

export default Login;
