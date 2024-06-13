import { Router } from "express";
import { registerAdvisory } from "../controllers/advisory.constroller.js";

const advisoryRouter = Router();

advisoryRouter.route("").post(registerAdvisory);

export default advisoryRouter;
