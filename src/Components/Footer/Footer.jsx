import React, { useContext } from "react";
import footerImg from "../../assets/FOOTER_IMG.png";
import "./Footer.css";
import { AuthContext } from "../../store/FirebaseContext";
import Dummy from "../../Dummy";
import { auth } from "../../firebase/config";



function Footer() {
    //  const componentName=Footer.name;
    //  const{user}=useContext(AuthContext)
  return (
    <div
      style={{ backgroundImage: `url(${footerImg})` }}
      className="footerParentDiv"
    >
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
            {/* <span>{user?user:""}</span> */}
            
          </div>
          <div className="list">
            <ul>
              <li>kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
          {/* <Dummy name={componentName}/> */}
            <ul>
              <li>About OLX Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>OLXPeople</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2021 OLX</p>
        
      </div>
    </div>
  );
}

export default Footer;
