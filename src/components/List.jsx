import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: []
    };
    this.markComplete = this.markComplete.bind(this);
  }

  markComplete(index) {
    if (!this.state.completed.includes(index)) {
      this.setState({completed: [...this.state.completed, index]});
    } else {
      let i = this.state.completed.indexOf(index);
      let arr = this.state.completed;
      arr.splice(i, 1);
      this.setState({completed: arr});
    }
  }

  remove(item) {
    this.props.removeItem(item);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.uncategorized.map((item, index) =>
            <li key={index}><span className={this.state.completed.includes(index) ? 'completed' : ''} onClick={() => {this.markComplete(index)}}>{item}</span><span className="x" onClick={() => { this.remove(item)}}> &#9747; </ span></li>
          )}
        </ul>
      </div>
    )
  }
}

export default hot(List);