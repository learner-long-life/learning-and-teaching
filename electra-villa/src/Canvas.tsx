import React, { useState, useRef } from 'react';
import TreeExample from './TreeExample';
import './Canvas.css';

function Canvas() {
  const [components, setComponents] = useState([]);

  return (
    <>
      <div className="Canvas">
        <TreeExample />
      { components.map((cmp) => cmp.render()) }
      </div>
    </>
  )
}

export default Canvas
