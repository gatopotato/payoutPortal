import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema(
  {
    policyID: { type: String, required: true },
    insCompanyID: { type: String, required: true, ref: 'InsuranceCompany' },
    type: { type: String, required: true },
    planName: { type: String, required: true },
  },
  { timestamps: true },
)

export const Product = mongoose.model('Product', productSchema)
