import React, { useContext } from "react";

import "./Header.css";
import { AuthContext } from "../../store/FirebaseContext";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import OlxLogo from "../../assets/OlxSignup.png";

function Header() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };
    function sell(){
        if(user){
            navigate("/create")
        }else{
            alert("you are not logged-in")
        }
       
    }

    return (
        <div className="headerParentDiv">
            <div className="headerChildDiv">
                <div className="brandName">
                    <img width={60} src={OlxLogo} alt="" />
                </div>
                <div className="placeSearch">
                    <select id="countries" name="countries">
                        <option value="IN">India</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                    </select>
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input type="text" placeholder="Find car,mobile phone and more..." />
                    </div>
                    <div className="searchAction">{/* <Search color="#ffffff"></Search> */}</div>
                </div>
                <div className="language">
                    <span> ENGLISH </span>
                    {/* <Arrow></Arrow> */}
                </div>
                <div className="loginPage">
                    <span>{user ? user.displayName : ""}</span>
                    <hr />
                </div>
                <button className="logoutButton" onClick={handleLogout}>{user ? "Logout" : "Login"}</button>
                <div className="sellMenu">
                    {/* <SellButton></SellButton> */}
                    <div className="sellMenuContent">
                        {/* <SellButtonPlus></SellButtonPlus> */}
                        <span onClick={sell}>SELL</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
