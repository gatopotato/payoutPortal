import { Advisory } from "../models/advisory.model.js";
import { apiError } from "../utils/apierror.js";
import { apiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";

const registerAdvisory = asynchandler(async (req, res) => {
  const { advNo, advName } = req.body;
  if (!(advNo || advName)) {
    throw new apiError(400, "All details required.");
  }
  const oldadv = await Advisory.findOne({ advNo });
  if (oldadv?._id) {
    throw new apiError(409, "Vehicle Already registered.");
  }
  const advisory = await Advisory.create({ advNo, advName });
  return res
    .status(201)
    .json(new apiResponse(201, advisory, "Advisory Registered."));
});

export { registerAdvisory };
