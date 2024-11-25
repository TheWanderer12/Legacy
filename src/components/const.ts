import averageTree from "../data/average-tree.json";
import couple from "../data/couple.json";
import diffParents from "../data/diff-parents.json";
import divorcedParents from "../data/divorced-parents.json";
import empty from "../data/empty.json";
import severalSpouses from "../data/several-spouses.json";
import simpleFamily from "../data/simple-family.json";
import sampleData from "../data/sample-data.json";
import testTreeN1 from "../data/test-tree-n1.json";
import testTreeN2 from "../data/test-tree-n2.json";
import type { Node } from "relatives-tree/lib/types";

export const NODE_WIDTH = 70;
export const NODE_HEIGHT = 80;

export const SOURCES = {
  "couple.json": couple,
  // "average-tree.json": averageTree,
  // "diff-parents.json": diffParents,
  // "divorced-parents.json": divorcedParents,
  // "empty.json": empty,
  // "sample-data.json": sampleData,
  // "several-spouses.json": severalSpouses,
  // "simple-family.json": simpleFamily,
  // "test-tree-n1.json": testTreeN1,
  // "test-tree-n2.json": testTreeN2,
} as Readonly<{ [key: string]: readonly Readonly<Node>[] }>;

export const DEFAULT_SOURCE = Object.keys(SOURCES)[0];

export const URL_LABEL = "URL (Gist, Paste.bin, ...)";
