import mongoose, { Schema } from "mongoose";

const insuranceCompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    managerName: {
      type: String,
      required: true,
      unique: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const InsuranceCompany = mongoose.model(
  "InsuranceCompany",
  insuranceCompanySchema,
);
