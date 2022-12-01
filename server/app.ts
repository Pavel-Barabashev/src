import express, { Request, Response } from "express";
import cors from "cors";
import { getEntries, writeEntry } from "./routes/entries";
const app = express();
app.use(cors());
let port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});

app.get("/entry", getEntries());
app.post("/entry", writeEntry());
