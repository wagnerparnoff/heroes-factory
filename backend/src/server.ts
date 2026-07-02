import express from 'express';
import cors from 'cors';
import heroRoutes from './infrastructure/http/routes/heroRoutes.ts';
import { errorHandler } from './infrastructure/http/middlewares/errorHandler.ts';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./infrastructure/http/swagger.ts";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", heroRoutes);
app.use(errorHandler);

export default app;