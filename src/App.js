import React from "react";
import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import ItemAdd from './components/ItemAdd.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorized: {
        "notFound": [
            "garlic"
        ],
        "Milk, Eggs, Other Dairy": [
            "butter",
            "milk",
            "eggs"
        ],
        "Beverages": [
            "coke",
            "soda water"
        ],
        "Cereal": [
            "cheerios",
            "cake mix"
        ],
        "Nut butters, Jams, and Honey": [
            "peanut butter"
        ],
        "Produce": [
            "green onion",
            "apples"
        ],
        "Condiments": [
            "mayo"
        ]
    },
      uncategorized: []
    }
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
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


  render () {
    return (<div>
      <h1>Grocery List Guru</h1>
      <List categorized={this.state.categorized} uncategorized={this.state.uncategorized} removeItem={this.removeItem}/>
      <ItemAdd addItem={this.addItem} />
    </div>)
  }
}

export default hot(App);