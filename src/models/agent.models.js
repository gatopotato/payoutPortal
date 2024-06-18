import mongoose, { Schema } from "mongoose";

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    kycDoc: {
      required: true,
      type: String,
    },
    relationManagerId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "RelationManager",
    },
    commission: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true },
);

export const Agent = mongoose.model("Agent", agentSchema);
