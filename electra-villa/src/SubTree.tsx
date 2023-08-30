import React, { RefObject, Component, useState, useEffect, useRef } from 'react';
import './SubTree.css';
import { TbCircuitGround } from 'react-icons/tb';
import Tree from '../lib/Tree';

interface SubTreeProps<T> {
  data: Tree<T>;
/*
  isLeft: boolean;
  isRight: boolean;
  parentRef: RefObject<HTMLInputElement>;
  value: T;
  leftChildRef: RefObject<HTMLInputElement>;
  rightChildRef: RefObject<HTMLInputElement>;
  */
}

interface SubTreeState<T> {
  value: T;
  leftChildRef: RefObject<HTMLInputElement>;
  rightChildRef: RefObject<HTMLInputElement>;
}

class SubTree extends React.Component<SubTreeProps<T>> {

  /*
  const [ value, setValue ] = useState<T>(null);
  const [ leftChild, setLeftChild ]   = useState<RefObject<HTMLInputElement>>(null);
  const [ rightChild, setRightChild ] = useState<RefObject<HTMLInputElement>>(null);

  constructor(props: SubTreeProps) {
    this.value = props.value;
    this.isLeft = props.isLeft;
    this.isRight = props.isRight;
  }
  useEffect(() => {
    setLeftChild(props.leftChild);
    setRightChild(props.rightChild);
    setValue(props.value);
    setParent(props.parent);
  }, [])


  */
  constructor(props: SubTreeProps<T>) {
    super();
    console.log(`Node Data ${props.data}`);
    this.data = props.data;
    this.id=props.data ? props.data.value : 'noValue';
    this.leftRef = React.createRef(); //useRef(null);
    this.rightRef = React.createRef(); //useRef(null);
  }

  render() {
    return (
      <>
        <div className="SubTree">
          <div className="Node SubRoot" id={this.id}>
           { (!this.data ) ? <TbCircuitGround /> : this.data.value }
          </div>
          <svg id="leftEdge" className="ChildEdge">
          </svg>
          <svg id="rightEdge" className="ChildEdge">
          </svg>
          <div className="NodeChildren">
            { this.data && this.data.left && <SubTree data={this.data.left} ref={this.leftRef} /> }
            { this.data && this.data.right  && <SubTree data={this.data.right} ref={this.rightRef} /> }
          </div>
        </div>
      </>
    );
  }

}

export default SubTree;
