const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  imageUrl: {
    type: ObjectId,
    ref: "ImageUrl",
  },
  desc: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Event", EventSchema);
