import mongoose, { Schema } from "mongoose";

const payoutSchema = new Schema(
  {
    issueDate: {
      type: Date,
      required: true,
    },
    advisoryId: {
      type: Schema.Types.ObjectId,
      ref: "Advisory",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    insComp: {
      type: String,
      required: true,
    },
    ncb: {
      type: Number,
      required: true,
    },
    policyNo: {
      type: Number,
      required: true,
    },
    idvVal: {
      type: Number,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    rewardAmt: {
      type: Number,
    },
    tds: {
      type: Number,
    },
    finalpts: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Payout = mongoose.model("Payout", payoutSchema);
