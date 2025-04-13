import React from "react";
import "./Entertainment.css";

const Entertainment = () => {
    const handleRedirect = () => {
        window.location.href = "/story/index.html";
      };

      const handleGameRedirect = () => {
        window.location.href = "/game/index.html";
      };

      const handleBlogRedirect = () => {
        window.location.href = "/blog/index.html";
      };

      const handleYogaRedirect = () => {
        window.location.href = "/yoga/index.html";
      };
      
  return (
    <div className="container">
      <button onClick={handleRedirect}>Story</button>
      <button onClick={handleGameRedirect}>Play Game</button>
      <button onClick={handleBlogRedirect}>Blog</button>
      <button onClick={handleYogaRedirect}>Yoga</button>

    </div>
  );
};

export default Entertainment;
