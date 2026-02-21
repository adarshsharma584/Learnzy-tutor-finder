import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { dbConnect } from "./utils/dbConnection.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { sendSuccess } from "./utils/response.js";

dotenv.config();

const app = express();
dbConnect();

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}
));

app.get("/", (_,res) => {
    return sendSuccess(res, {
      statusCode: 200,
      message: "Welcome to Learnzy Backend",
    });
});

// routes 
import userAuthRouter from "./routes/userAuth.route.js";
import userRouter from "./routes/user.route.js";
import tuitionCenterRouter from "./routes/tuitionCenter.route.js";
import teacherRouter from "./routes/teacher.route.js";
import batchRouter from "./routes/batch.route.js";

app.use("/api/v1/batch", batchRouter);
app.use("/api/v1/tuition", tuitionCenterRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/auth", userAuthRouter);
app.use("/api/v1/user/", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log("server is running on port ", process.env.PORT," !!!");
})
    


