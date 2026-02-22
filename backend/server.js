import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import { dbConnect } from "./utils/dbConnection.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { sendSuccess } from "./utils/response.js";

// Routes
import userAuthRouter from "./routes/userAuth.route.js";
import userRouter from "./routes/user.route.js";
import tuitionCenterRouter from "./routes/tuitionCenter.route.js";
import teacherRouter from "./routes/teacher.route.js";
import batchRouter from "./routes/batch.route.js";
import studentRouter from "./routes/student.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIX = "/api/v1";

// Connect to database
dbConnect();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Health Check
app.get("/", (_, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: "Learnzy Backend is up and running",
  });
});

// API Routes
app.use(`${API_PREFIX}/auth`, userAuthRouter);
app.use(`${API_PREFIX}/user`, userRouter);
app.use(`${API_PREFIX}/tuition`, tuitionCenterRouter);
app.use(`${API_PREFIX}/teacher`, teacherRouter);
app.use(`${API_PREFIX}/student`, studentRouter);
app.use(`${API_PREFIX}/batch`, batchRouter);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
