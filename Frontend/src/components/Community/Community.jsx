import React, { useState, useEffect, useRef, useContext } from "react";
import "./Community.css";
import { assets, avatars } from "../../assets/assets";
import Picker from "emoji-picker-react"; 
import { io } from "socket.io-client";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

const Community = ({currentUser}) => {
  const {token, setToken, user, setUser } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const chatEndRef = useRef(null);
  const [activeUsers, setActiveUsers] = useState([]);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("user")
    setToken("")
    navigate("/")
    window.location.reload();
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let storedUser = localStorage.getItem("chatUser");
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            console.log("PARSED USER : ", parsedUser)

            if (parsedUser && parsedUser.name && parsedUser.avatar) {
                setUser(parsedUser);
                socket.emit("joinChat", parsedUser._id);
            }
        } catch (error) {
            console.error("Error parsing chatUser from localStorage:", error);
        }
    }
  }, []);

  useEffect(() => {
    const handleMessage = (newChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newChatMessage]);
    };
    
    const handleTyping = (typingData) => {
      if (typingData.sender !== user?.name) {
        setIsTyping(typingData.isTyping);
      }
    };
    
    socket.on("receiveMessage", handleMessage);
    socket.on("userTyping", handleTyping);
    
    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.off("userTyping", handleTyping);
    };
  }, [user?.name]);

  const sendMessage = async() => {
    if (newMessage.trim() === "") return;

    const updatedUser = JSON.parse(localStorage.getItem("chatUser"));


    try {
      const res = await axios.post("http://localhost:4000/api/messages/send", {
        text: newMessage,
        sender: updatedUser?.name || "Anonymous",
        profile: updatedUser?.avatar || avatars.avatar1,
        timestamp: new Date().toISOString(),
      });


      if (res.data.success) {
        const savedMessage = res.data.message;
        setMessages((prevMessages) => [...prevMessages, savedMessage]);
        socket.emit("sendMessage", savedMessage); 
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
    socket.emit("userTyping", { sender: updatedUser?.name, isTyping: false });
};


useEffect(() => {
  const fetchUpdatedUser = () => {
      const storedUser = localStorage.getItem("chatUser");
      if (storedUser) {
          try {
              const parsedUser = JSON.parse(storedUser);
              if (parsedUser && parsedUser.name && parsedUser.avatar) {
                  setUser(parsedUser);
                  socket.emit("joinChat", parsedUser.name);
              }
          } catch (error) {
              console.error("Error parsing chatUser from localStorage:", error);
          }
      }
  };

  fetchUpdatedUser();

  const handleProfileUpdate = ({ userId, name, avatar }) => {
      console.log("Profile updated in community:", name, avatar);

      if (userId === user?._id) {  
          setUser((prevUser) => ({ ...prevUser, name, avatar }));

          const storedChatUser = JSON.parse(localStorage.getItem("chatUser"));
          const updatedChatUser = { ...storedChatUser, name, avatar };
          localStorage.setItem("chatUser", JSON.stringify(updatedChatUser));
      }
  };

  socket.on("profileUpdated", handleProfileUpdate);

  return () => {
      socket.off("profileUpdated", handleProfileUpdate);
  };
}, [user?._id, setUser]);  



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


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/messages/");
        if (res.data.success) {
          setMessages(res.data.messages);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);  


  const deleteMessage = async (messageId) => {

    if (!messageId) {
      console.error("Message ID is undefined. Cannot delete.");
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:4000/api/messages/delete/${messageId}`);
      if (res.data.success) {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
        socket.emit("deleteMessage", messageId); 
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const deleteAllMessages = async () => {  
    try {
      const res = await axios.delete("http://localhost:4000/api/messages/deleteAll");
      if (res.data.success) {
        setMessages([]); 
        socket.emit("deleteAllMessages"); 
      }
    } catch (error) {
      console.error("Error deleting all messages:", error);
    }
  };
  

  useEffect(() => {
    socket.on("messageDeleted", (deletedMessageId) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== deletedMessageId));
    });
  
    return () => {
      socket.off("messageDeleted");
    };
  }, []);
  

  useEffect(() => {
    const handleAllMessagesDeleted = () => {
        setMessages([]);
    };

    socket.on("deleteAllMessages", handleAllMessagesDeleted);

    return () => {
        socket.off("deleteAllMessages", handleAllMessagesDeleted);
    };
}, []);

  
  

  return (
    <div style={{ overflowY: "auto" }} className="community-chat">
      <div className="community-header">
        <div className="community-header-img-text">
          <img src={assets.people} alt="Community" />
          <h3>Community</h3>
        </div>

        <div 
          className="more-options" 
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <img src={assets.more} alt="More options" className="more-icon" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/edit-profile')} className="dropdown-item">Edit Profile</button>
              <button onClick={() => navigate("/active-users")} className="dropdown-item">Active Users</button>
              <button className="dropdown-item" onClick={deleteAllMessages}>Delete All</button>
              <button onClick={logout} className="dropdown-item logout">Logout</button>
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="community-msg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`community-chat-msg ${msg.sender === user?.name ? "my-message" : "other-message"}`}
          >
            {msg.sender === user?.name ? (
              <>
                <div className="community-chat-text">
                  <p>{msg.text}</p>
                  <p className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  {msg.sender === user?.name && ( 
                      <img 
                        src={assets.bin} 
                        alt="Delete" 
                        className="delete-icon"
                        onClick={() => {
                          console.log("Deleting message with ID:", msg._id); 
                          deleteMessage(msg._id);
                        }
                      } 
                      />
                  )}
                </div>
                <div className="community-chat-img">
                  <img src={`src/assets/${user?.avatar}` || avatars.profile} alt="Profile" />
                </div>
              </>
            ) : (
              <>
                <div className="community-chat-img">
                  <img src={`src/assets/${msg.profile}` || avatars.profile} alt="Profile" />
                </div>
                <div className="community-chat-text">
                {msg.sender !== user?.name && (
                  <p className="message-sender">{msg.sender}</p>
                )}
                  <p>{msg.text}</p>
                  <p className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {isTyping && <p className="typing-indicator">Someone is typing...</p>}
      
      <div className="community-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            socket.emit("userTyping", { sender: user?.name, isTyping: e.target.value.length > 0 });
          }}
          placeholder="Type a message"
          className="text-msg"
        />
        <img src={assets.emoji} alt="Emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && <Picker onEmojiClick={(emojiObject) => setNewMessage((prev) => prev + emojiObject.emoji)} />} 
        <img src={assets.send} alt="Send" onClick={sendMessage} />
      </div>
      <div ref={messagesEndRef} /> 
    </div>
  );
};

export default Community;
