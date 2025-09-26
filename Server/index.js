import express from "express";
import { ConnectDb } from "./utils/dbConnection.js";
import CookieParser from "cookie-parser"
import config from "./config/index.js";

const app = express ();
const PORT = config.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(CookieParser());

ConnectDb();

app.get("/",(req,res)=>
{
    res.send("hello");

});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})