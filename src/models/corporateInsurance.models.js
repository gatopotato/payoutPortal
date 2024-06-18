import mongoose, { Schema } from "mongoose";

const corporateInsuranceSchema = new Schema(
  {
    id: { 
      type: String,
      required: true, unique: true 
    },
    productID: { 
      type: Schema.Types.ObjectId, 
      required: true, ref: "Product" 
    }
  },
  { timestamps: true },
);

export const CorporateInsurance = mongoose.model(
  "CorporateInsurance",
  corporateInsuranceSchema,
);
