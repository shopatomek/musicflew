const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: "",
    },
    songURL: {
      type: String,
      default: "",
    },
    album: {
      type: String,
      default: "",
    },
    artist: {
      type: String,
      default: "Unknown",
    },
    language: {
      type: String,
      default: "Other",
    },
    category: {
      type: String,
      default: "all",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("song", songSchema);
