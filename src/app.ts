import express from "express";
import { Request, Response } from "express";
import { connectToDb } from "./config/connectToDb";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

connectToDb();

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
})

app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
