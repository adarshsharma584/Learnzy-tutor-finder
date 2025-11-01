import express from "express";
import { ConnectDb } from "./src/utils/dbConnection.js";
import CookieParser from "cookie-parser"
import config from "./src/config/index.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";
import helmet from "helmet";
import cors from "cors";    
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const app = express ();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(CookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(
    rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 100,
    })
);


ConnectDb()
.then(() => {
    app.listen( PORT, () => {
        console.log("Server is running on port: ", PORT)
    });
});

// import routes
import userRoutes from "./src/routes/user.routes.js"
import geminiRoutes from "./src/routes/gemini.route.js";
import tutionRoutes  from "./src/routes/tutions.route.js"
// define routes
app.use("/api/user", userRoutes)
app.use("/api/tutor", geminiRoutes);
app.use("/api/tution", tutionRoutes)
//==================================
app.use("/", (_, res) => {
    res.send("Learnzy Server responding")
});

app.use(errorHandler)