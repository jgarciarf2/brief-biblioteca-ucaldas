import express from "express";
import routes from "../../../app/routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api", routes);
  app.use(routes);
  return app;
};
