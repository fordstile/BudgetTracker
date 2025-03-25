// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // ✅ Import global CSS
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID ="484415681658-q9gm0qsr2adtnrm2erk00kkmndg92230.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
