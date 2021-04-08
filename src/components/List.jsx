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
      delete arr[i];
      this.setState({completed: arr});
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.uncategorized.map((item, index) =>
            <li key={index} class={this.state.completed.includes(index) ? 'completed' : ''} onClick={() => {this.markComplete(index)}}>{item}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default hot(List);