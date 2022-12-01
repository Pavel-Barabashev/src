import { Request, Response } from "express";
import * as fs from "fs";
export function getEntries() {
  return (req: Request, res: Response) => {
    let entries = fs.readFileSync("entries.json");
    res.status(200).send(entries);
  };
}

export function writeEntry() {
  return (req: Request, res: Response) => {
    res.status(200).send();
  };
}
