import mongoose,{Schema} from "mongoose";

const vehicleSchema = new Schema({
    vehicleNo:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    fuel:{
        type:String,
        enum:{
            values:["P","D"]
        },
        required:true
    },
    vehicleType:{
        type:String,
        required:true
    },
    cases:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Vehicle = mongoose.model("Vehicle",vehicleSchema);