import React from "react";
import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import ItemAdd from './components/ItemAdd.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorized: {},
      uncategorized: []
    }
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.categorizeItems = this.categorizeItems.bind(this);
  }

  addItem (item) {
    this.setState({
      uncategorized: [...this.state.uncategorized, item]
    });
  }

  removeItem (item) {
    let arr = this.state.uncategorized;
    let i = arr.indexOf(item);
    arr.splice(i, 1);
    this.setState({uncategorized: arr});
  }

  categorizeItems () {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/categorize',
      data: {
        uncategorized: this.state.uncategorized,
        categorized: this.state.categorized
      }
    })
    .then((response) => {
      let categorized = response.data;
      let uncategorized = response.data.notFound;
      delete categorized.notFound;
      this.setState({categorized, uncategorized})
    })
  }


  render () {
    return (<div className='app'>
      <h1>Grocery List Guru</h1>
      <List categorized={this.state.categorized} uncategorized={this.state.uncategorized} removeItem={this.removeItem}/>
      <ItemAdd addItem={this.addItem} categorize={this.categorizeItems}/>
    </div>)
  }
}

export default hot(App);