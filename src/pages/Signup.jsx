import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate()
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <label htmlFor="avatar" className="avatar-label">Upload Profile Photo:</label>
          <input type="file" id="avatar" name="avatar" accept="image/*" />

          <button type="submit">Sign Up</button>
        </form>

        <p className="p3">Or signup with:</p>

      <div className="google-signup">
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

        <p className="p4">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
