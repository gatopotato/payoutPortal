import mongoose, { Schema } from 'mongoose'

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactDetails: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    relationshipManagerID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'RelationshipManager',
    },
  },
  { timestamps: true },
)

export const Customer = mongoose.model('Customer', customerSchema)
