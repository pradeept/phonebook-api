import {
  createEntry,
  deleteEntry,
  editEntry,
  getEntries,
} from "../db/queries/phonebook.ts";
import type { Request, Response } from "express";

const listController = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const result = await getEntries(req.user);
    res.status(200).send(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong, contact your admin.");
  }
};

const insertController = (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email || !req.body.phone) {
    res.status(400).send("Invalid request, Missing fields.");
  } else {
    const { name, email, phone } = req.body;
    try {
      const entry = createEntry(name, email, phone);
      console.log(entry);
      res.status(200).send("Resource created");
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong, contact your admin.");
    }
  }
};

const editController = async (req: Request, res: Response) => {
  const { id, name, email, phone } = req.body;

  if (!id || id === "") {
    res.status(400).send("Invalid request.");
  } else {
    try {
      const result = await editEntry(id, name, email, phone);
      res
        .status(400)
        .send(
          result.rows.length === 0 ? "Invalid request." : result.rows.at(0)
        );
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong. Please try again later");
    }
  }
};

const deleteController = async (req: Request, res: Response) => {
  //@ts-ignore
  const { id }: { id: string } = req.query;
  if (!id || id === "") {
    res.status(400).send("Invalid request.");
  } else {
    try {
      const result = await deleteEntry(id);
      res
        .status(200)
        .send(
          result.rows.length === 0 ? "Nothing to delete" : result.rows.at(0)
        );
    } catch (e) {
      res.status(500).send("Something went wrong. Please try again later");
    }
  }
};

export { editController, deleteController, insertController, listController };
