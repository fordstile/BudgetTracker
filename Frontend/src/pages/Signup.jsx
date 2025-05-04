// //

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../components/context/AppContext";
// //import axios from "axios";
// // import { default as axios } from "axios";
// import axios from "../api/axiosInstance"; // Make sure the path is correct

// // import * as axios from "axios";
// import { toast } from "react-toastify";
// import "./Signup.css";
// import { assets } from "../assets/assets";

// const Signup = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       axios.defaults.withCredentials = true;
//       const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
//         name,
//         email,
//         password,
//       });

//       if (data.success) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setIsLoggedIn(true);
//         getUserData();
//         navigate("/dashboard");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="Logo"
//         className="logo"
//       />

//       <div className="signup-box">
//         <h2 className="title">Create Account</h2>
//         <p className="subtitle">Create Your Account</p>

//         <form onSubmit={onSubmitHandler}>
//           <div className="input-group">
//             <img src={assets.person_icon} alt="Person Icon" className="icon" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <img src={assets.mail_icon} alt="Email Icon" className="icon" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <img src={assets.lock_icon} alt="Lock Icon" className="icon" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="signup-button" disabled={loading}>
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="switch-auth">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} className="switch-link">
//             Login Now
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../components/context/AppContext";
// import axios from "../api/axiosInstance"; // Correct Axios instance
// import { toast } from "react-toastify";
// import "./Signup.css";
// import { assets } from "../assets/assets";

// const Signup = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
//         name,
//         email,
//         password,
//       });

//       if (data.success) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setIsLoggedIn(true);
//         getUserData();
//         toast.success("Signup successful! 🚀");
//         navigate("/dashboard");
//       } else {
//         toast.error(data.message || "Signup failed");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="Logo"
//         className="logo"
//       />

//       <div className="signup-box">
//         <h2 className="title">Create Account</h2>
//         <p className="subtitle">Create Your Account</p>

//         <form onSubmit={onSubmitHandler}>
//           <div className="input-group">
//             <img src={assets.person_icon} alt="Person Icon" className="icon" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <img src={assets.mail_icon} alt="Email Icon" className="icon" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <img src={assets.lock_icon} alt="Lock Icon" className="icon" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="signup-button" disabled={loading}>
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="switch-auth">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} className="switch-link">
//             Login Now
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";
import axios from "../api/axiosInstance"; // Custom axios instance
import { toast } from "react-toastify";
import "./Signup.css";
import { assets } from "../assets/assets";

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success("Signup successful! Please log in. 🚀");
        navigate("/login"); // ✅ Redirect to login after signup
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="logo"
      />

      <div className="signup-box">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Create Your Account</p>

        <form onSubmit={onSubmitHandler}>
          <div className="input-group">
            <img src={assets.person_icon} alt="Person Icon" className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <img src={assets.mail_icon} alt="Email Icon" className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <img src={assets.lock_icon} alt="Lock Icon" className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="switch-auth">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="switch-link">
            Login Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
