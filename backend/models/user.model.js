import mongoose, { get } from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },

  //added new
  profilepic: {
    public_id: {
      type: String,
      default: null,
    },
    secure_url: {
      type: String,
      // default: `https://ui-avatars.com/api/?name=${this.fullName}`,
    },
    // default: {
    //   type: String,
    //   get: function () {
    //     return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    //       this.fullName
    //     )}`;
    //   },
    // },
  },

  //Added new

  sentFriendRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  receivedFriendRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    default: "Hey i am user chit chat!!",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);
