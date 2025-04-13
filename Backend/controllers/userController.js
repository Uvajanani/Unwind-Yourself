import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// login user
export const loginUser = async(req, res) => {
    const {email, password} = req.body
    try {
        
        // Check if the user exist
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success : false, message : "User doesn't exist"})
        }

        // Check if the password match with the existing password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({success : false, message : "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success : true, token, user})
    }
    catch(error) {
        console.log(error)
        res.json({success : false, message : "Error"})
    }
}


// register user
export const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        
        // checking if user already exists
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success : false, message : "User already exists"})
        }
        
        // validating email format 
        if(!validator.isEmail(email)) {
            return res.json({success : false, message : "Please enter a valid email"})
        }

        // checking if it is strong password or not
        if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1 })) {
            return res.json({ success: false, message: "Weak password! Include uppercase, number, and special characters." });
        }   

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        })

        // save the user
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success : true, token, user})
    } 
    catch(error) {
        console.log(error);
        res.json({success : false, message : "Error"})
    }
}

export const updateUserDetails = async (req, res) => {
    const { email, gender, age, overthinkingScore } = req.body;

    console.log("Received request to update user details:", req.body); // Debug log

    if (!email || !gender || !age || overthinkingScore === undefined) {
        return res.json({ success: false, message: "Missing required fields" });
    }

    try {
        const user = await userModel.findOneAndUpdate(
            { email },
            { $set: { gender, age, overthinkingScore } },
            { new: true }
        );

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        console.log("Updated user:", user); // Debug log
        res.json({ success: true, message: "User details updated successfully", user });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.json({ success: false, message: "Error updating user details" });
    }
};




export const updateUserPassword = async(req, res) => {
    const {userId} = req.params
    const {oldPassword, newPassword} = req.body

    try {
        const user = await userModel.findById(userId)
        if(!user) {
            return res.json({success : false, message : "User not found"})
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch) {
            return res.json({success : false, message : "Incorrect old password"})
        }

        if (!validator.isStrongPassword(newPassword, { minLength: 8, minNumbers: 1, minUppercase: 1 })) {
            return res.json({ success: false, message: "Weak password! Include uppercase, number, and special characters." });
        }        

        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedNewPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
        } catch(error) {
            console.log(error);
            res.json({ success: false, message: "Error updating password" });
        }
};

export const getUserDetails = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: "User not found" });

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.json({ success: false, message: "Error fetching user data" });
    }
};


export const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, avatar } = req.body;

    if (!name && !avatar && !email) {
        return res.status(400).json({ success: false, message: "At least one field is required" });
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, avatar },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const io = req.app.get("socketio");
        io.emit("profileUpdated", {
            userId,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
        });

        res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
};
