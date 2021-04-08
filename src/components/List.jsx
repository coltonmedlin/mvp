import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

const List = (props) => (
  <div>
    <ul>
      {props.uncategorized.map((item, index) =>
        <li key={index}>{item}</li>
      )}
    </ul>
  </div>
)

export default hot(List);