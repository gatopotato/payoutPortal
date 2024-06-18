import mongoose, { Schema } from "mongoose";

const motorInsuranceSchema = new Schema(
  {
    vehicleNo: { type: String, required: true },
    model: { type: String, required: true },
    yearOfManufacture: { type: Number, required: true },
    fuelType: { type: String, required: true },
    category: { type: String, required: true },
    cases: { type: String, required: true },
    productID: { type: Schema.Types.ObjectId, required: true, ref: 'Product' }
  },
  { timestamps: true },
);

export const MotorInsurance = mongoose.model(
  "MotorInsurance",
  motorInsuranceSchema,
);
