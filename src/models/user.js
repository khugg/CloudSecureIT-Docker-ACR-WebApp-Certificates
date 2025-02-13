
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
 FirstName: {
  type: String,
  required: [true, "Name is required"],
},

LastName: {
  type: String,
  required: [true, "Name is required"],
},

emailAddress: {
  type: String,
  required: [true, "email is required"],
  unique: true,
},

documentType: {
   type: String, 
   enum: ["Resume", "Project", "Profile", "Script"], 
   required: true 
  },

  filePath: {
    type: String,
    required: true
   },


  uploadedAt: { 
    type: Date, 
    default: Date.now
   },

}, 

{ 
  timestamps: true
}

);

const user = mongoose.model("User", userSchema);

module.exports = user;