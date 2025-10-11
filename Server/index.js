import express from "express";
import { ConnectDb } from "./src/utils/dbConnection.js";
import CookieParser from "cookie-parser"
import config from "./src/config/index.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";

const app = express ();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(CookieParser());

ConnectDb()
.then(() => {
    app.listen( PORT, () => {
        console.log("Server is running on port: ", PORT)
    });
});

// import routes
import userRoutes from "./src/routes/user.routes.js"

// define routes
app.use("/api/user", userRoutes)

//==================================
app.use("/", (_, res) => {
    res.send("Learnzy Server responding")
});

app.use(errorHandler)