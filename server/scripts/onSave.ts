import { MongoClient, ObjectId } from "mongodb";
import type { Node } from "relatives-tree/lib/types";

const uri = "your_mongo_atlas_connection_string";
const client = new MongoClient(uri);

async function saveToDatabase(updatedData: Partial<Node>) {
  try {
    await client.connect();
    const database = client.db("familyTreeDB");
    const collection = database.collection("members");

    const filter = {
      _id: updatedData.id ? new ObjectId(updatedData.id) : undefined,
    };
    const updateDoc = {
      $set: updatedData,
    };

    const result = await collection.updateOne(filter, updateDoc, {
      upsert: true,
    });
    console.log(
      `Document updated with _id: ${result.upsertedId || updatedData.id}`
    );
  } finally {
    await client.close();
  }
}

// saveToDatabase(updatedData);
