import React, { RefObject, Component, useState, useEffect, useRef } from 'react';
import SubTree from './SubTree';
import { Tree, TreeNode } from './lib/Tree';
import './TreeExample.css';
import { TbCircuitGround } from 'react-icons/tb';

const TreeExample = () => {

  let [ treeData, setTreeData ] = useState(null);

  useEffect(() => {
    treeData = new Tree();
    treeData.insertNode(new TreeNode(17));
    treeData.insertNode(new TreeNode(6));
    treeData.insertNode(new TreeNode(33));
    treeData.insertNode(new TreeNode(13));
    treeData.insertNode(new TreeNode(3));
    treeData.print();
    setTreeData(treeData);
  }, []);

  return (
    <>
      <div className="WholeTree">
        <h2>Tree Example</h2>
         { (treeData && treeData.root) ? <SubTree data={treeData.root} /> : <TbCircuitGround /> }
      </div>
    </>
  );

}

export default TreeExample;
