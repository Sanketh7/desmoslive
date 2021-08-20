import "reflect-metadata";
import * as dotenv from "dotenv";
import { dbConnect } from "./dbConnect";
import app from "./app" ;

dotenv.config();

const PORT = process.env.PORT as string;

dbConnect()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Desmos Live API listening on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(`Failed to connect to database. ERROR: ${err}`);
  });
