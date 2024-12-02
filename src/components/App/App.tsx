import React, { useMemo, useState, useCallback } from "react";
import type { Node, ExtNode } from "types";
import treePackage from "relatives-tree/package.json";
import ReactFamilyTree from "react-family-tree";
import { SourceSelect } from "../SourceSelect/SourceSelect";
import { PinchZoomPan } from "../PinchZoomPan/PinchZoomPan";
import { FamilyNode } from "../FamilyNode/FamilyNode";
import { NodeDetails } from "../NodeDetails/NodeDetails";
import { NODE_WIDTH, NODE_HEIGHT, SOURCES, DEFAULT_SOURCE } from "../const";
import { getNodeStyle } from "./utils";
import Sidebar from "../Sidebar/Sidebar";
import css from "./App.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default React.memo(function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState(SOURCES[source]);

  const firstNodeId = useMemo(() => nodes[0].id, [nodes]);
  const [rootId, setRootId] = useState(firstNodeId);

  const [selectId, setSelectId] = useState<string>();
  const [hoverId, setHoverId] = useState<string>();

  const resetRootHandler = useCallback(
    () => setRootId(firstNodeId),
    [firstNodeId]
  );

  // const changeSourceHandler = useCallback(
  //   (value: string, nodes: readonly Readonly<Node>[]) => {
  //     setRootId(nodes[0].id);
  //     setNodes(nodes);
  //     setSource(value);
  //     setSelectId(undefined);
  //     setHoverId(undefined);
  //   },
  //   []
  // );

  const selected = useMemo(
    () => nodes.find((item) => item.id === selectId),
    [nodes, selectId]
  );

  if (!location.state || !location.state.tree) {
    console.error(
      "No tree data found in location.state. Redirecting to YourTrees."
    );
    navigate("/your-trees");
    return null; // Prevent rendering until navigation occurs
  }

  const { tree } = location.state as {
    tree: { id: string; name: string; members: Node[] };
  };

  return (
    <div className={css.root}>
      {/* <header className={`${css.header} mt-0`}>
        {" "}
        <h1 className={css.title}>
          Legacy Family Tree
          <span className={css.version}>core: {treePackage.version}</span>
        </h1>
        <div>
          <label>Source: </label>
          <SourceSelect
            value={source}
            items={SOURCES}
            onChange={changeSourceHandler}
          />
        </div>
      </header> */}
      {/* <Sidebar /> */}
      {/* tree */}
      {nodes.length > 0 && (
        <PinchZoomPan min={0.5} max={2.5} captureWheel className={css.wrapper}>
          <ReactFamilyTree
            nodes={tree.members}
            rootId={tree.members[0].id}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            className={css.tree}
            renderNode={(node: Readonly<ExtNode>) => (
              <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === rootId}
                isHover={node.id === hoverId}
                onClick={setSelectId}
                onSubClick={setRootId}
                style={getNodeStyle(node)}
              />
            )}
          />
        </PinchZoomPan>
      )}{" "}
      {/* reset button */}
      {rootId !== firstNodeId && (
        <button className={css.reset} onClick={resetRootHandler}>
          Reset
        </button>
      )}{" "}
      {/* node details */}
      {selected && (
        <NodeDetails
          node={selected}
          className={css.details}
          onSelect={setSelectId}
          onHover={setHoverId}
          onClear={() => setHoverId(undefined)}
        />
      )}
    </div>
  );
});
