import { startServer } from "./infrastructure/http/server";
import { db } from "./infrastructure/persistence/sqlite/db";

console.log("Initializing database...");
startServer();
