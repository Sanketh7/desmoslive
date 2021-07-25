import { Connection, createConnection } from "typeorm";

export const connect = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    //username: "root",
    //password: "admin",
    database: "desmoslive",
    entities: [__dirname + "/models/*.model.ts"],
    synchronize: true,
  }); // TODO
};
