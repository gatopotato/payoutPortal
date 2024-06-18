import { asynchandler } from "../utils/asynchandler.js";
import { apiResponse } from "../utils/apiresponse.js";
import { apiError } from "../utils/apierror.js";
import { Payout } from "../models/payout.model.js";
import { Advisory } from "../models/advisory.model.js";
import { User } from "../models/user.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import mongoXlsx from "mongo-xlsx";
import excelJS from "exceljs";
const submitData = asynchandler(async (req, res) => {
  const {
    issueDate,
    advNo,
    phoneNo,
    vehicleNo,
    insComp,
    ncb,
    policyNo,
    idvVal,
    premium,
    reward,
  } = req.body;
  if (
    !(
      issueDate ||
      advisoryId ||
      phoneNo ||
      vehicleNo ||
      insComp ||
      ncb ||
      policyNo ||
      idvVal ||
      premium ||
      reward
    )
  ) {
    throw new apiError(400, `All fields must be filled`);
  }

  const advisor = await Advisory.findOne({ advNo });

  if (!advisor?._id) {
    throw new apiError(404, "No Advisory exists.");
  }

  const user = await User.findOne({ phoneNo });

  if (!user?._id) {
    throw new apiError(404, "No user exists.");
  }

  const veh = await Vehicle.findOne({ vehicleNo });

  if (!veh?._id) {
    throw new apiError(404, "No Vehicle exists.");
  }

  const rewardAmt = (reward * premium) / 100;
  const tds = 0.05 * rewardAmt;
  const finalpts = rewardAmt - tds;
  const payout = await Payout.create({
    issueDate: new Date(issueDate),
    advisoryId: advisor._id,
    userId: user._id,
    vehicleId: veh._id,
    insComp,
    ncb,
    policyNo,
    idvVal,
    premium,
    reward,
    rewardAmt,
    tds,
    finalpts,
  });
  return res.status(200).json(new apiResponse(200, payout, "Payout Created"));
});

const getData = asynchandler(async (req, res) => {
  const { policyNo, vehNo } = req.body;
  const payout = await Payout.findOne({
    $or: [{ policyNo }, { vehNo }],
  });
  if (!payout) {
    throw new apiError(404, "Payout not found.");
  }
  return res.status(200).json(new apiResponse(200, payout, "Payout found."));
});

const exportData = asynchandler(async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  const isodate = new Date(date);
  const startDate = new Date(isodate.getFullYear(), isodate.getMonth(), 1);
  const endDate = new Date(isodate.getFullYear(), isodate.getMonth() + 1, 0);
  const data = await Payout.aggregate([
    {
      $match: {
        issueDate: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $lookup: {
        from: "advisories",
        localField: "advisoryId",
        foreignField: "_id",
        as: "advisoryDetails",
        pipeline: [
          {
            $unset: "_id",
          },
        ],
      },
    },
    {
      $addFields: {
        advisoryDetails: {
          $first: "$advisoryDetails",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
        pipeline: [
          {
            $unset: ["_id", "vehicleId"],
          },
        ],
      },
    },
    {
      $addFields: {
        userDetails: {
          $first: "$userDetails",
        },
      },
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicleId",
        foreignField: "_id",
        as: "vehicleDetails",
        pipeline: [
          {
            $unset: "_id",
          },
        ],
      },
    },
    {
      $addFields: {
        vehicleDetails: {
          $first: "$vehicleDetails",
        },
      },
    },
    {
      $unset: ["advisoryId", "userId", "vehicleId", "_id"],
    },
  ]);
  data.map((datablock) => {
    for (let key in datablock.advisoryDetails) {
      if (key != "__v" || key != "updatedAt" || key != "createdAt") {
        datablock[key] = datablock.advisoryDetails[key];
      } else {
        delete datablock.advisoryDetails[key];
      }
    }
    delete datablock.advisoryDetails;
    for (let key in datablock.userDetails) {
      if (key != "__v" || key != "updatedAt" || key != "createdAt") {
        datablock[key] = datablock.userDetails[key];
      } else {
        delete datablock.userDetails[key];
      }
    }
    delete datablock.userDetails;
    for (let key in datablock.vehicleDetails) {
      if (key != "__v" || key != "updatedAt" || key != "createdAt") {
        datablock[key] = datablock.vehicleDetails[key];
      } else {
        delete datablock.vehicleDetails[key];
      }
    }
    delete datablock.vehicleDetails;
    delete datablock["__v"];
    delete datablock["updatedAt"];
    delete datablock["createdAt"];
    datablock.issueDate = `${datablock.issueDate.toISOString().split("T")[0]}`;
  });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("MIS");
  worksheet.columns = [
    { header: "Serial No.", key: "sno" },
    { header: "Adv. Name", key: "advName" },
    { header: "Adv. No", key: "advNo" },
    { header: "Issue Date", key: "issueDate" },
    { header: "Name", key: "name" },
    { header: "Phone No.", key: "phoneNo" },
    { header: "Veh no.", key: "vehicleNo" },
    { header: "Model", key: "model" },
    { header: "Year", key: "year" },
    { header: "Fuel", key: "fuel" },
    { header: "Cases", key: "cases" },
    { header: "Insurance Company", key: "insComp" },
    { header: "NCB", key: "ncb" },
    { header: "Policy No", key: "policyNo" },
    { header: "IDV Value", key: "idvVal" },
    { header: "Premium", key: "premium" },
    { header: "Reward", key: "reward" },
    { header: "Reward Amount", key: "rewardAmt" },
    { header: "TDS", key: "tds" },
    { header: "Final Amt", key: "finalpts" },
  ];
  let counter = 1;
  data.forEach((datablock) => {
    datablock.sno = counter;
    worksheet.addRow(datablock);
    counter++;
  });
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet",
  );
  res.setHeader("Content-Disposition", "attachment; filename MIS.xlsx");
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  return workbook.xlsx.write(res).then(() => {
    res.status(200).json(new apiResponse(200, data, "Data Exported."));
  });
});

const getNum = asynchandler(async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  const isodate = new Date(date);
  const startDate = new Date(isodate.getFullYear(), isodate.getMonth(), 1);
  const endDate = new Date(isodate.getFullYear(), isodate.getMonth() + 1, 0);
  const data = await Payout.aggregate([
    {
      $match: {
        issueDate: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $count: "noOfPolicies",
    },
  ]);
  return res
    .status(200)
    .json(new apiResponse(200, data[0], "no of policies this month fetched"));
});

export { submitData, exportData, getData, getNum };
