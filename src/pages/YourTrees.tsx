import React, { useState, useEffect } from "react";
import axios from "axios";
import { RelData } from "relatives-tree/lib/types";

type Tree = {
  id: string;
  name: string;
  members: any[]; // Update with proper types if you have `Node` types available
};

export default function YourTrees() {
  const [trees, setTrees] = useState<RelData[]>([]);

  // Fetch trees on component mount
  useEffect(() => {
    fetchTrees();
  }, []);

  // Fetch all family trees
  const fetchTrees = async () => {
    try {
      const response = await axios.get<Tree[]>(
        "http://localhost:5001/api/family-trees"
      );
      setTrees(response.data);
    } catch (error) {
      console.error("Error fetching trees:", (error as Error).message);
    }
  };

  // Open a specific tree (e.g., navigate to its details page)
  const openTree = (id: string) => {
    console.log(`Open tree with ID: ${id}`);
    // Navigate to another page or render the tree in a detailed view
  };

  // Delete a tree
  const deleteTree = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/family-trees/${id}`);
      setTrees(trees.filter((tree) => tree.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting tree:", error);
    }
  };

  // Add a new tree
  const addTree = async () => {
    const newTree = {
      name: `Tree ${trees.length + 1}`, // Temporary name for the new tree
      members: [], // Start with an empty members array
    };
    try {
      const response = await axios.post<Tree>(
        "http://localhost:5001/api/family-trees",
        newTree
      );
      setTrees([...trees, response.data]); // Append the new tree to the state
    } catch (error) {
      console.error("Error adding tree:", error);
    }
  };

  return (
    <div>
      <h1 className="mt-32">Your Trees:</h1>
      <div className="flex flex-wrap mt-8">
        {trees.map((tree, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 m-2 cursor-pointer"
            onClick={() => openTree(tree.id)}
          >
            <h2>{tree.name}</h2>
            <button
              className="bg-red-500 text-white p-2 rounded mt-2"
              onClick={(e) => {
                e.stopPropagation();
                deleteTree(tree.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-4"
        onClick={addTree}
      >
        Add Tree
      </button>
    </div>
  );
}
