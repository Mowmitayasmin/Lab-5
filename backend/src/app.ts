import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import setupSwagger from "./api/config/swagger";
import corsOptions from "./api/config/cors";
import { useExpressServer } from "routing-controllers";
import { RoleController } from "./api/controller/roleController";
import { EmployeeController } from "./api/controller/employeeController";
import { clerkMiddleware } from "@clerk/express";
// import cors from "cors";

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(clerkMiddleware());
// setup the controllers and use the /api/v1 prefix for the routes
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [RoleController, EmployeeController],
  cors: corsOptions,
  defaultErrorHandler: false,
});

setupSwagger(app);
app.get("/", (_req, res) => {
  res.send(
    `Got response from backend! lab 5 !`
  );
});

// app.use(cors());
// app.use(express.json());

export default app;
