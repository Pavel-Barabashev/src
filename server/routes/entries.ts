import { Request, Response } from "express";
import * as fs from "fs";
import { Entry } from "../types";
export function getEntries() {
  return (req: Request, res: Response) => {
    let entries = fs.readFileSync("entries.json");
    res.status(200).send(entries);
  };
}

function writeEditedEntries(entries: Array<Entry>) {
  fs.writeFileSync("entries.json", JSON.stringify(entries));
}

export function writeEntry() {
  return (req: Request, res: Response) => {
    console.log(req.body);
    let buffEntries = fs.readFileSync("entries.json");
    let stringEntries = buffEntries.toString();
    let entries = JSON.parse(stringEntries);
    entries.push(req.body);

    writeEditedEntries(entries);
    res.status(200).send();
  };
}

export function updateEntry() {
  return (req: Request, res: Response) => {
    console.log(req.body);
    let buffEntries = fs.readFileSync("entries.json");
    let stringEntries = buffEntries.toString();
    let entries = JSON.parse(stringEntries);
    entries.map((entry: Entry) => {
      entry.id === req.body.id && (entry.text = req.body.text);
    });
    writeEditedEntries(entries);
    res.status(200).send();
  };
}

export function deleteEntry() {
  return (req: Request, res: Response) => {
    console.log(req.body);
    let buffEntries = fs.readFileSync("entries.json");
    let stringEntries = buffEntries.toString();
    let entries = JSON.parse(stringEntries);
    let objWithIdIndex = entries.findIndex(
      (entry: Entry) => entry.id === req.body.id
    );
    entries.splice(objWithIdIndex, 1);
    writeEditedEntries(entries);
    res.status(200).send();
  };
}
