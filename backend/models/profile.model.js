import mongoose from "mongoose";

// const educationSchema = new mongoose.Schema({
//     school: {
//         type: String,
//         default: ' ',
//     },
//     degree:{
//         type: String,
//         default:' ',
//     },
//     fieldOfStudy:{
//         type: String,
//         default: ' ',
//     },
// });
const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },

  degree: {
    type: String,
    default: "",
  },

  fieldOfStudy: {
    type: String,
    default: "",
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  grade: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },
});

// const workSchema = new mongoose.Schema({
//     company: {
//         type: String,
//         default: ' ',
//     },
//     position:{
//         type: String,
//         default:' ',
//     },
//     years:{
//         type: String,
//         default: ' ',
//     },
// });

const workSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  employmentType: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  currentlyWorking: {
    type: Boolean,
    default: false,
  },

  description: {
    type: String,
    default: "",
  },
});

// const profileSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     bio:{
//         type: String,
//         default:' ',
//     },
//     currentPost:{
//         type: String,
//         default: ' ',
//     },
//     pastWork:{
//         type: [workSchema],
//         default:[],
//     },
//     education:{
//         type: [educationSchema],
//         default: [],
//     },
// });

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  bio: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  headline: {
    type: String,
    default: "",
  },

  currentPost: {
    type: String,
    default: "",
  },

  pastWork: {
    type: [workSchema],
    default: [],
  },

  education: {
    type: [educationSchema],
    default: [],
  },
});

const Profile = mongoose.model("Profile",profileSchema);


export default Profile;