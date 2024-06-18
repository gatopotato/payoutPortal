import mongoose, { Schema } from "mongoose";

const policySchema = new Schema(
  {
    
    policyNo: { type: String, required: true },
    customerID: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    productID: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    agentID: { type: Schema.Types.ObjectId, ref: "Agent" },
    relationManagerId: { type: Schema.Types.ObjectIdg, required: true, ref: "RelationshipManager" },
    ncb: { type: Number, required: true },
    idvValue: { type: Number, required: true },
    netOdPremium: { type: Number, required: true },
    netPremium: { type: Number, required: true },
    commPremium: { type: Number, required: true },
    nomineeName: { type: String, required: true },
    nomineeAge: { type: Number, required: true },
    nomineeRelation: { type: String, required: true },
  },
  { timestamps: true },
);

export const Policy = mongoose.model("Policy", policySchema);
