import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./api/v1/routes";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { httpLogger } from "./config/logger";

const app = express();

/* =========================================================
   SECURITY + CORE MIDDLEWARES
========================================================= */

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   LOGGER (SEPARATED)
========================================================= */

app.use(httpLogger);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "BPL Backend Running Successfully 🚀",
  });
});

/* =========================================================
   ROUTES
========================================================= */

app.use("/api/bpl/v1", routes);

/* =========================================================
   ERROR HANDLING
========================================================= */

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;