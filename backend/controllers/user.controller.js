import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
import ConnectionRequest from "../models/connections.model.js";
import Post from "../models/posts.model.js";
import { connect } from "http2";
import { userInfo } from "os";
import Comment from "../models/comments.model.js";

const convertUserDataToPDF = async (userData) => {
  const doc = new PDFDocument();
  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);

  doc.image(`uploads/${userData.userId.profilePicture}`, {
    align: "center",
    width: 100,
  });

  doc.fontSize(14).text(`Name: ${userData.userId.name}`);
  doc.fontSize(14).text(`Email: ${userData.userId.email}`);
  doc.fontSize(14).text(`Username: ${userData.userId.username}`);
  doc.fontSize(14).text(`Bio: ${userData.bio} `);
  doc.fontSize(14).text(`Current Post: ${userData.currentPost}`);
  doc.fontSize(14).text(`Past Work:`);
  userData.pastWork.forEach((work, index) => {
    doc.fontSize(14).text(`Company Name: ${work.company}`);
    doc.fontSize(14).text(`Position: ${work.position}`);
    doc.fontSize(14).text(`Years: ${work.years}`);
  });

  console.log("Writing PDF...");
  doc.end();

  return outputPath;
};
export const register = async (req, res) => {
  
  
console.log(req.body);
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username)
      return res.status(400).json({
        message: "All fields are required",
      });

    const user = await User.findOne({
      email,
    });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const profile = new Profile({ userId: newUser._id });

    await profile.save();
    return res.json({ message: "User Created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    console.log("LOGIN HIT");

    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = crypto.randomBytes(64).toString("hex");

    console.log(token);

    await User.updateOne({ _id: user._id }, { token : token });

    return res.json({ token });
  } catch (error) {}
};

export const uploadProfilePicture = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profilePicture = req.file.filename;

    await user.save();

    return res.json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { token, ...newUSerData } = req.body;
  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, email } = newUSerData;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser || String(existingUser._id) !== String(user._id)) {
        return res
          .status(400)
          .json({ message: "Email or username already in use" });
      }
    }

    // user.name = name || user.name;
    // user.headline = headline || user.headline;
    // user.location = location || user.location;
    // user.about = about || user.about;
    // await user.save();

    // return res.json({ message: "Profile updated successfully" });

    Object.assign(user, newUSerData);
    await user.save();
    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const { token } = req.query;

    //console.log(`Token: ${token}`)

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name email username profilePicture",
    );
    return res.json({ user, profile: userProfile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;
    const userProfile = await User.findOne({ token: token });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    const profile_to_update = await Profile.findOne({
      userId: userProfile._id,
    });

    Object.assign(profile_to_update, newProfileData);

    await profile_to_update.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getAllUsersProfile = async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate(
//       "userId",
//       "name email username profilePicture",
//     );
//     return res.json(profiles);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const getAllUsersProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "userId",
      "name email username profilePicture"
    );

    // Remove profiles whose user has been deleted
    const validProfiles = profiles.filter(profile => profile.userId !== null);

    return res.json(validProfiles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const downloadProfile = async (req, res) => {
  const user_id = req.query.id;

  const userProfile = await Profile.findOne({ userId: user_id })
  .populate(
    "userId",
    "name email username profilePicture",
  );

  let outputPath = await convertUserDataToPDF(userProfile);

  return res.json({ message: outputPath });
};


export const sendconnectionrequest = async (req,res) =>{
console.log(req.body);

const { token, connectionId } = req.body;

console.log("Token:", token);
console.log("Connection ID:", connectionId);

const user = await User.findOne({ token });

console.log("User:", user);

  try{
    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const connectionUSer = await User.findOne({_id: connectionId});

    if(!connectionUSer){
      return res.status(404).json({message: "Connection User not found"})
    }

    const existingRequest = await ConnectionRequest.findOne({
      userId: user._id,
      connectionId: connectionId,
    })

    if(existingRequest){
      return res.status(400).json({message: "Connection request already sent"})
    }
    const request = new ConnectionRequest({
      userId: user._id,
      connectionId: connectionId,
    });

    await request.save();

    return res.json({message: "Connection request sent successfully"});

  }
  catch(error)
  {
    return res.status(500).json({ message: error.message });
  }
}



export const getMyConnectionsRequests = async (req,res) =>{
  const {token} = req.query;

    try{
      const user = await User.findOne({token});

      if(!user){
        return res.status(404).json({message:"User not found"});
      } 
      const connections = await ConnectionRequest.find({userId: user._id})
      .populate("connectionId", "name email username profilePicture");     
         return res.json(connections);

    }
    catch(error){
      return res.status(500).json({ message: error.message });
    }

  }

  export const whatAreMyConnections = async (req,res) =>{
    const {token} = req.query;

    try{
      const user = await User.findOne({token}); 
      if(!user){
        return res.status(404).json({message:"User not found"});
      } 
      // const connections = await ConnectionRequest.find({connectionId: user._id, status_accepted: true})
      // .populate("userId", "name email username profilePicture");     

      const connections = await ConnectionRequest.find({
    connectionId: user._id,
    status_accepted: null
}).populate(
    "userId",
    "name email username profilePicture"
);
         return res.json(connections);      
    }
    catch(error){
      return res.status(500).json({ message: error.message });
    }
  }

  export const acceptConnectionRequest = async (req,res) =>{
    const {token, requestId, action_type} = req.body;

    try{
      const user = await User.findOne({token}); 

      if(!user){
        return res.status(404).json({message:"User not found"});
      }
      const connection = await ConnectionRequest.findOne({_id: requestId});


      if(!connection){
        return res.status(404).json({message: "Connection request not found"});
      }
      if(action_type === "accept"){
        connection.status_accepted = true;
      }
      else{
        connection.status_accepted = false;
      }
      await connection.save();

      return res.json({message: "Connection request accepted successfully"});
    }   
    catch(error){
      return res.status(500).json({ message: error.message });
    }
  }

  export const commentPost = async(req,res)=>{
    const {token, post_id, commentBody} = req.body;

    try{
      const user = await User.findOne({token: token}).select("_id");

      if(!user){
        return res.status(404).json({message: "User not found"})
      }
      const post = await Post.findOne({
        _id: post_id
      });
      if(!post){
        return res.status(404).json({message: "Post not found"})
      }

      const comment = new Comment({
        userId: user._id,
        postId: post_id,
        body: commentBody
      });

      await comment.save();

      return res.status(200).json({message: "Comment Addeed"})
    }
    catch(err){
      return res.status(500).json({message: err.message})
    }
  }



  export const getUserProfileAndUserBasedOnUsername = async(req,res)=>{
    const { username } = req.query;

    try{
      const user = await User.findOne({
        username
      });

      if(!user){
        return res.status(404).json({message: "User not found"})
      }

      const userProfile = await Profile.findOne({userId: user._id})
        .populate('userId', 'name username email profilePicture');

        return res.json({"profile": userProfile})
    }catch(err){
      return res.status(500).json({message: err.message})
    }
  }

  export const addEducation = async (req, res) => {
  const {
    token,
    school,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    grade,
    description,
  } = req.body;

  try {
    console.log("Request Body:", req.body);
console.log("Token:", token);

const user = await User.findOne({ token });

console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userProfile = await Profile.findOne({
      userId: user._id,
    });

    if (!userProfile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    userProfile.education.push({
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      description,
    });

    await userProfile.save();

    return res.status(200).json({
      message: "Education added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};