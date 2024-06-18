import mongoXlsx from "mongo-xlsx";

var data = [
  {
    issueDate: "2024-06-11T00:00:00.000Z",
    insComp: "AIB",
    ncb: 10,
    policyNo: 1022,
    idvVal: 123,
    premium: 100,
    reward: 5,
    rewardAmt: 5,
    tds: 0.25,
    finalpts: 4.75,
    createdAt: "2024-06-11T07:02:45.481Z",
    updatedAt: "2024-06-11T07:02:45.481Z",
    advNo: 1,
    advName: "Tata AIG",
    __v: 0,
    name: "Samkit",
    phoneNo: 9311,
    vehicleNo: "HR",
    model: "i10",
    year: 2009,
    fuel: "P",
    vehicleType: "Pvt",
    cases: "Rollover",
  },
];

/* Generate automatic model for processing (A static model should be used) */
var model = mongoXlsx.buildDynamicModel(data);

/* Generate Excel */
mongoXlsx.mongoData2Xlsx(data, model, function (err, data) {
  console.log("File saved at:", data.fullPath);
});
