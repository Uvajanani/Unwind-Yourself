import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./ActiveUsers.css";
import { assets, avatars } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:4000");

const ActiveUsers = ({ currentUser }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("🧐 Checking currentUser:", currentUser);

    if (!currentUser?._id) return; 

    socket.emit("joinCommunity", {
      id: currentUser._id,
      name: currentUser.name,
      avatar: currentUser.avatar || avatars.avatar1,
    });

    socket.on("updateActiveUsers", (users) => {
      console.log("🔄 Updated Active Users:", users);
      setActiveUsers(users);
    });

    return () => {
      socket.emit("leaveCommunity", { id: currentUser._id });
      socket.off("updateActiveUsers");
    };
  }, [currentUser]);

  return (
    <div className="active-users-component">
      <div className="active-header">
        <div className="header-left">
          <img onClick={() => navigate("/community")} src={assets.leftArrow} alt="Back" className="back-arrow" />
        </div>
        
        <h4>Community</h4>
        <img src={assets.crowd} alt="Community" className="community-icon" />
        <p>Active: {activeUsers.length} users</p>
      </div>

      <hr className="active-hr" />

      {activeUsers.map((user) => (
        <div className="active-users" key={user.id}>
          <div className="active-left">
            <img src={`src/assets/${user?.avatar}` || avatars.avatar1} alt={user.name} />
          </div>
          <div className="active-right">
            <p>{user.name}</p>
            <p>
              <span className="green-dot"></span>Active
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveUsers;
