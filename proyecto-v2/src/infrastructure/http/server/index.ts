import { createApp } from "./app";
import { seedBaseData } from "../../persistence/in-memory/seed";

export const startServer = () => {
  seedBaseData();
  const app = createApp();
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;

  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
};
