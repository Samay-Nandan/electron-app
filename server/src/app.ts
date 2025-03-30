import express from "express";
import cors from "cors";
import routes from "@routes/index";
import { getEnv } from "@config/env";

export const startApp = () => {
  const app = express();
  const port = getEnv("PORT", 3000);

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
