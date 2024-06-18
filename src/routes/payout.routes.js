import { Router } from "express";
import {
  submitData,
  getData,
  exportData,
  getNum,
} from "../controllers/payout.controller.js";

const payoutRouter = Router();

payoutRouter.route("").post(submitData);
payoutRouter.route("").get(getData);
payoutRouter.route("/export").get(exportData);
payoutRouter.route("/number").get(getNum);
export default payoutRouter;
