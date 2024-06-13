import {User} from "../models/user.model.js";
import { apiError } from "../utils/apierror.js";
import { asynchandler } from "../utils/asynchandler.js";
import { apiResponse } from "../utils/apiresponse.js";
import {Vehicle} from "../models/vehicle.model.js";

const registerUser = asynchandler(async(req,res)=>{
    const {name,phoneNo,vehicleNo} = req.body;
    if(!name || !phoneNo || !vehicleNo){
        throw new apiError(400,"All details required.")
    }
    const existingUser = await User.findOne({phoneNo});
    if(existingUser?._id){
        throw new apiError(409,"User Already exists.")
    }
    const vehicle= await Vehicle.findOne({vehicleNo});
    if(!vehicle?._id){
        return new apiError(404,"Vehicle Not Found.")
    }
    const user = await User.create({
        name,
        phoneNo,
        vehicleId:[vehicle._id]
    });
    return res
    .status(201)
    .json(new apiResponse(201,user,"User registered."));
});

export {registerUser};