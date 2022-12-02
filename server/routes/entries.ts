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
    console.log(req.body);
    let buffEntries = fs.readFileSync("entries.json");
    let stringEntries = buffEntries.toString();
    let entries = JSON.parse(stringEntries);
    entries.push(req.body);

    fs.writeFileSync("entries.json", JSON.stringify(entries));
    res.status(200).send();
  };
}

export function updateEntry() {
  return (req: Request, res: Response) => {
    console.log(req.body);
    let buffEntries = fs.readFileSync("entries.json");
    let stringEntries = buffEntries.toString();
    let entries = JSON.parse(stringEntries);
    console.log(entries);

    // fs.writeFileSync("entries.json", JSON.stringify(entries));
    res.status(200).send();
  };
}

export function deleteEntry() {
  return (req: Request, res: Response) => {
    console.log(req.body);
    let buffEntries = fs.readFileSync("entries.json");
    let stringEntries = buffEntries.toString();
    let entries = JSON.parse(stringEntries);

    console.log(entries);
    res.status(200).send();
  };
}
