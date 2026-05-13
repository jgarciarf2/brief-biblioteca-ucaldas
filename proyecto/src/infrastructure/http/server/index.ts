import { createApp } from "./app";

export const startServer = () => {
  const app = createApp();
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
};
