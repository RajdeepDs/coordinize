import "server-only";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { keys } from "../keys";
import { PrismaClient } from "./generated/client";

let connectionString = keys().DATABASE_URL;

// Configuring Neon for local development
if (process.env.NODE_ENV === "development") {
  connectionString =
    "postgres://postgres:postgres@db.localtest.me:5432/coordinize";
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] =
      host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
    return `${protocol}://${host}:${port}/sql`;
  };
  const connectionStringUrl = new URL(connectionString);
  neonConfig.useSecureWebSocket =
    connectionStringUrl.hostname !== "db.localtest.me";
  neonConfig.wsProxy = (host) =>
    host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`;
}

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString });

export const database = new PrismaClient({ adapter });

export * from "./generated/client";
