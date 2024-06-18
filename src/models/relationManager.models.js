import mongoose, { Schema } from 'mongoose'

const relationManagerSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    contactDetails: { type: String, required: true },
    hireDate: { type: Date, required: true },
  },
  { timestamps: true },
)

export const RelationManager = mongoose.model(
  'RelationManager',
  relationManagerSchema,
)
