import mongoose, { Schema } from 'mongoose'

const lifeInsuranceSchema = new Schema(
  {
    productID: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  },
  { timestamps: true },
)

export const LifeInsurance = mongoose.model(
  'LifeInsurance',
  lifeInsuranceSchema,
)
