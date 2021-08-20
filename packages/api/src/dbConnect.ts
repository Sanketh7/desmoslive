import { Connection, createConnection } from "typeorm";

export const dbConnect = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + "/models/*.model.ts"],
    synchronize: true,
    extra: {
      poolSize: 4,
      idleTimeoutMillis: 5000, // Drop connections that are stalled
      connectionTimeoutMillis: 10000, // Drop connections that are stalled
    }
  });
};
