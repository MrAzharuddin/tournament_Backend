import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
dotenv.config();

import tournamentsRouter from "./routes/tournaments.route.js";
import participantsRouter from "./routes/participants.route.js";

const app = express();
app.use(express.json());
app.use(cors());

export const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
console.log("mongo connected");

app.listen(process.env.PORT || 9000, () =>
  console.log("app started on PORT", process.env.PORT || 9000)
);
app.get("/", function (request, response) {
  response.send(
    ` welcome to Tournament API, refer "https://github.com/11m245/tournament_Backend"`
  );
});
app.use("/tournaments", tournamentsRouter);
app.use("/participants", participantsRouter);
