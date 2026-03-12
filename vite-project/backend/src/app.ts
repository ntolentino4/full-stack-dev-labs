import express from "express";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "../config/cors";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import roleRoutes from "./api/v1/routes/roleRoutes";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "PiXELL River backend is running" });
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/roles", roleRoutes);

export default app;