import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import payoutRouter from "./routes/payout.routes.js";
app.use("/api/v1/payout", payoutRouter);
import advisoryRouter from "./routes/advisory.routes.js";
app.use("/api/v1/advisory", advisoryRouter);
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);
import vehicleRouter from "./routes/vehicle.routes.js";
app.use("/api/v1/vehicle", vehicleRouter);

export default app;
