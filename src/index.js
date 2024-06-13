import connectDB from "./db/index.js";
import app from "./app.js"
import dotenv from "dotenv";

dotenv.config();

const port = (process.env.port || 3000);

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log(err);
        throw(err);
    })
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
})
.catch((err)=>{console.log("DB connection failed.",err);})