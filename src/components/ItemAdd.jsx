import React from 'react';
import { hot } from 'react-hot-loader/root';

class ItemAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleChange(event) {
    this.setState({item: event.target.value});
  }

  handleSubmit(event) {
    this.props.addItem(this.state.item);
    event.preventDefault();
    this.setState({item: ''});
  }

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.item} onChange={this.handleChange} onKeyDown={this.handleEnterKey}/>
        <button onClick={this.handleSubmit}>ADD</button>
        <button onClick={this.props.categorize}>GURU!</button>
      </div>
    );
  }
}

export default hot(ItemAdd);