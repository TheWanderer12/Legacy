import connectDB from "../config/db";
import FamilyTree from "../models/FamilyTree";

export const getSourcesFromDB = async () => {
  await connectDB();

  const trees = await FamilyTree.find({});
  const SOURCES = {};

  trees.forEach((tree) => {
    SOURCES[tree.name] = tree.members.map((member) => ({
      id: member._id.toString(),
      gender: member.gender,
      parents: member.parents.map((p) => ({ id: p.toString(), type: "blood" })),
      children: member.children.map((c) => ({
        id: c.toString(),
        type: "blood",
      })),
      siblings: member.siblings.map((s) => ({
        id: s.toString(),
        type: "blood",
      })),
      spouses: member.spouses.map((sp) => ({
        id: s.toString(),
        type: "married",
      })),
    }));
  });

  return SOURCES;
};
