import express, { Request, Response } from "express";
import FamilyTree from "../models/FamilyTree";
import { Node, RelData, ExtNode } from "relatives-tree/lib/types"; // Adjust the path to your types.d.ts file

const router = express.Router();

/** Get all family trees */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const trees = await FamilyTree.find({}, "name members");
    console.log("Retrieved trees:", trees);
    res.json(trees);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/** Get a single family tree */
router.get("/:name", async (req: Request, res: Response) => {
  try {
    const tree = await FamilyTree.findOne({ name: req.params.name });
    if (!tree) {
      return res.status(404).json({ error: "Family tree not found" });
    }
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/** Add a new family tree */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, members } = req.body;

    if (!name || !members) {
      return res.status(400).json({ error: "Name and members are required" });
    }

    const newTree = new FamilyTree({ name, members });
    const savedTree = await newTree.save();
    res.status(201).json(savedTree);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/** Delete a family tree */
router.delete("/:name", async (req: Request, res: Response) => {
  try {
    const result = await FamilyTree.deleteOne({ name: req.params.name });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Family tree not found" });
    }
    res.json({ message: "Family tree deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
