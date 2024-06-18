import mongoose, { Schema } from "mongoose";

const advisorySchema = new Schema(
  {
    advNo: {
      type: Number,
      required: true,
    },
    advName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Advisory = mongoose.model("Advisory", advisorySchema);
