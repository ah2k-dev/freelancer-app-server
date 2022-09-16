const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
    enum: ["website", "logoDesign", "contentWriting", "marketing"],
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    assignstatus: {
      type: Boolean,
      required: true,
      default: "false",
    },
    completedOwnerEnd: {
      type: Boolean,
    },
    workingStatus: {
      type: String,
      enum: ["pending", "working", "completed"],
    },
    rejected: {
      type: Boolean,
      default: false,
    },
  },
  appliedBy: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

module.exports = mongoose.model("Project", projectSchema);
