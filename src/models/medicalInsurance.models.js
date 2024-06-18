import mongoose, { Schema, isObjectIdOrHexString } from 'mongoose'

const medicalInsuranceSchema = new Schema(
  {
    productID: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  },
  { timestamps: true },
)

export const MedicalInsurance = mongoose.model(
  'MedicalInsurance',
  medicalInsuranceSchema,
)
