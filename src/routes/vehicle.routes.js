import { Router } from "express";
import { registerVehicle } from "../controllers/vehicle.controller.js";

const vehicleRouter = Router();

vehicleRouter.route("").post(registerVehicle);

export default vehicleRouter;
