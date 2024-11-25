import mongoose, { Schema, Document } from "mongoose";
import { Node } from "relatives-tree/lib/types"; // Ensure the correct path to your types.d.ts

export interface IFamilyTree extends Document {
  name: string;
  members: Node[]; // Use the Node type from your types.d.ts
}

const MemberSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dateOfBirth: { type: String, required: true }, // ISO 8601 string
  description: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female"], required: true },
  parents: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: ["blood", "adopted", "half"] },
    },
  ],
  siblings: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: ["blood", "adopted", "half"] },
    },
  ],
  spouses: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: ["married", "divorced"] },
    },
  ],
  children: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: ["blood", "adopted", "half"] },
    },
  ],
});

const FamilyTreeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    members: [MemberSchema], // Array of family members
  },
  { collection: "familytrees" }
);

export default mongoose.model<IFamilyTree>("FamilyTree", FamilyTreeSchema);
