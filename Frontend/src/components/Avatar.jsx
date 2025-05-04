import React from "react";
import "./Avatar.css";

const Avatar = ({ name, image }) => {
  return (
    <div className="user-avatar">
      <img
        src={image}
        alt={`${name}'s avatar`}
        className="avatar-image"
      />
      <div className="user-info">
        <p className="greeting">Hello, {name} 👋</p>
        <p className="username">{name}</p>
      </div>
    </div>
  );
};

export default Avatar;