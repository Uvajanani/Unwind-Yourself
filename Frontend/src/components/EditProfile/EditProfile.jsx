import React, { useState, useEffect } from "react";
import { assets, avatars } from "../../assets/assets"; 
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); 

const EditProfile = () => {
    const avatarList = Object.values(avatars);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        return storedUser || { name: "", email: "", image: "" };
    });
    

    const [isEditing, setIsEditing] = useState({ name: false, email: false, password: false, image: false });
    const [newValues, setNewValues] = useState({ 
        name: user.name || "", 
        email: user.email || "", 
        oldPassword: "", 
        newPassword: "",
        image:""
    });
    const [passwordError, setPasswordError] = useState("");


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                
                if (!storedUser) {
                    console.error("No user found in localStorage. Redirecting to login...");
                    navigate("/login");
                    return;
                }
    
                const user = JSON.parse(storedUser);
                const userId = user?._id; 
    
                if (!userId) {
                    console.error("User ID is missing from stored user data. Redirecting to login...");
                    navigate("/login");
                    return;
                }
    
                localStorage.setItem("userId", userId);
                
                const response = await fetch(`http://localhost:4000/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Parsed data:", data);

                if (data.success) {
                    setUser({
                        name: data.user.name,
                        email: data.user.email,
                        image: data.user.avatar.startsWith("http") ? data.user.avatar : `/src/assets/${data.user.avatar}`
                    });
                    console.log("USER from SETUSER:", user)
    
                    setNewValues({
                        name: data.user.name,
                        email: data.user.email,
                        avatar: data.user.avatar.startsWith("http") ? data.user.avatar : `/src/assets/${data.user.avatar}`
                    });

                    console.log("USER from SETValues:", newValues)
                } else {
                    console.error("API returned success: false");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, []);
        

    const handleEditClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (e, field) => {
        setNewValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = async (field) => {
        if (!field || newValues[field].trim() === user[field]) {
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} is unchanged.`);
            return;
        }
            
        try {
                const userId = JSON.parse(localStorage.getItem('user'))._id; 
                const response = await fetch(`http://localhost:4000/api/user/updateProfile/${userId}`, {
                    method: 'PUT',  
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ [field]: newValues[field] }),
                });
        
                const data = await response.json();
        
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to update name');
                }
        
                console.log('Name updated successfully');

                if(data.success) {
                
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    const updatedUser = { ...storedUser, [field]: newValues[field] };
                
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    localStorage.setItem("chatUser", JSON.stringify(updatedUser));

                    setUser(updatedUser); 
                    setIsEditing((prev) => ({ ...prev, [field]: false }));
                
                    window.location.reload()
                }

            } catch (error) {
                console.error(`Error updating ${field}:`, error);
            }
            
        };
   

    const handlePasswordChange = async () => {
        if (!newValues.oldPassword || !newValues.newPassword) {
            setPasswordError("Both old and new passwords are required.");
            return;
        }
    
        try {
            let userId = localStorage.getItem("userId");  
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!userId && storedUser?._id) {
                userId = storedUser._id;
            }
    
            const response = await fetch(`http://localhost:4000/api/user/updatePassword/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword: newValues.oldPassword, newPassword: newValues.newPassword }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const textResponse = await response.text(); 
            if (!textResponse) {
                throw new Error("Empty response from server");
            }
    
            const data = JSON.parse(textResponse);
    
            if (!data.success) {
                setPasswordError(data.message || "Password update failed. Try again.");
                return;
            }
    
            setPasswordError("");
            setNewValues({ oldPassword: "", newPassword: "" });
            setIsEditing((prev) => ({ ...prev, password: false }));
    
            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
            setPasswordError(error.message || "An error occurred while updating the password.");
        }
    };
    

    const handleAvatarSelect = async (avatar) => {
        try {
            let userId = localStorage.getItem("userId");  
            const storedUser = JSON.parse(localStorage.getItem("user"));
            
            if (!userId && storedUser?._id) {
                userId = storedUser._id; 
            }


            console.log("User Id: from avatar", userId);
    
            if (!userId) {
                console.error("User ID is missing in localStorage.");
                return;
            }
    
            const avatarFileName = avatar.split("/").pop(); 
            console.log("Avatar File Name:", avatarFileName);
    
            const response = await fetch(`http://localhost:4000/api/user/updateProfile/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ avatar: avatarFileName }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Avatar Update Response:", data);
    
            if (data.success) {
                const updatedUser = { ...storedUser, avatar: avatarFileName };
            
                localStorage.setItem("chatUser", JSON.stringify(updatedUser));
                localStorage.setItem("user", JSON.stringify(updatedUser));

                setUser(updatedUser);
                setIsEditing((prev) => ({ ...prev, image: false }));
                
                window.location.reload();
            }
            

        } catch (error) {
            console.error("Error updating avatar:", error);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    
    

    if (loading) return <p>Loading...</p>;

    return (
        <div className="edit-profile-container">
            <div className="profile-header">
                <img onClick={() => navigate('/community')} src={assets.leftArrow} alt="" />
                <h2>Edit Profile</h2>
            </div>
            <div className="profile-img">
                <div className="profile-image-section">
                    <img src={user.image} alt="Profile" onClick={() => handleEditClick("image")} />
                </div>

                {isEditing.image && (
                    <div className="avatar-selection">
                        {avatarList.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                onClick={() => handleAvatarSelect(avatar)}
                                className="avatar-option"
                            />
                        ))}
                    </div>
                )}

                <div className="edit-photo" onClick={() => handleEditClick("image")}>
                    <p>Edit photo</p>
                </div>
            </div>

            <div className="profile-info">
                <h4>PERSONAL DETAILS</h4>

                {["name", "email"].map((field) => (
                    <div className={`profile-${field}`} key={field}>
                        <div className={`p${field}`}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            {isEditing[field] ? (
                                <input
                                    type="text"
                                    value={newValues[field]}
                                    onChange={(e) => handleChange(e, field)}
                                    onBlur={() => handleSave(field)}
                                    autoFocus
                                />
                            ) : (
                                <p>{user[field]}</p>
                            )}
                        </div>
                        <div className={`edit-${field}`} onClick={() => handleEditClick(field)}>
                            <p>Edit</p>
                        </div>
                    </div>
                ))}

                <div className="profile-password">
                    <div className="ppassword">
                        <label>Password</label>
                        {isEditing.password ? (
                            <div className="password-inputs">
                                <input
                                    type="password"
                                    placeholder="Old password"
                                    value={newValues.oldPassword ?? ""}
                                    onChange={(e) => handleChange(e, "oldPassword")}
                                />
                                
                                <input
                                    type="password"
                                    placeholder="New password"
                                    value={newValues.newPassword ?? ""}
                                    onChange={(e) => handleChange(e, "newPassword")}
                                />

                                {passwordError && <p className="error-message">{passwordError}</p>}
                                <button className="save-password" onClick={handlePasswordChange}>Save</button>
                            </div>
                        ) : <p>********</p>}
                    </div>
                    <div className="edit-password" onClick={() => handleEditClick("password")}>
                        <p>Edit</p>
                    </div>
                </div>
            </div>

            <button onClick={() => handleSave("name")} className="save-account">Save</button>
        </div>
    );
};

export default EditProfile;