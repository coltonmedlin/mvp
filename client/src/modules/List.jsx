import React from 'react';
import ReactDOM from 'react-dom';

const List = (props) => (
  <div>
    <ul>
      {props.uncategorized.map((item) =>
        <li>{item}</li>
      )}
    </ul>
  </div>
)

export default List