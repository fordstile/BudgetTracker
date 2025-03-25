import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useJwt } from "react-jwt"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
        <p className="p1">Or login with:</p>

      <div className="google-login">
        <GoogleLogin 
            
            onSuccess={(credentialResponse) =>{
            console.log(credentialResponse)
            navigate("/dashboard")
            // const Example = (credentialResponse) => {
            //   console.log(useJwt(credentialResponse.credential))
            // }
          }}
          onError={() => console.log("Login Failed")}
        />
      </div>
      
        <p className="p2"> 
          Don't have an account? <Link to="/signup">Get Started</Link>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
