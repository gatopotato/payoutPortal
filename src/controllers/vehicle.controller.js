import { Vehicle } from "../models/vehicle.model.js";
import { apiError } from "../utils/apierror.js";
import { apiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";

const registerVehicle = asynchandler(async (req, res) => {
  const { vehicleNo, model, year, fuel, vehicleType, cases } = req.body;
  if (!(vehicleNo && model && year && fuel && vehicleType && cases)) {
    return new apiError(400, "All details required.");
  }
  const existingVeh = await Vehicle.findOne({ vehicleNo });
  if (existingVeh?._id) {
    return new apiError(409, "Vehicle already registered.");
  }
  const vehicle = await Vehicle.create({
    vehicleNo,
    model,
    year,
    fuel,
    vehicleType,
    cases,
  });
  return res
    .status(201)
    .json(new apiResponse(201, vehicle, "Vehicle registered."));
});

export { registerVehicle };
