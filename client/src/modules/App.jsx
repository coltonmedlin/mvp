import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';
import ItemAdd from './ItemAdd.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.render = this.render.bind(this);
  }

  render () {
    return (<div>
      <h1>Grocery List Guru</h1>
      <List />
      <ItemAdd />
    </div>)
  }
}

export default App;