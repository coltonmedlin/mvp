import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
//import ReactHtmlParser from 'react-html-parser';

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
      <div className='list'>
        {Object.keys(this.props.categorized).map((key) => {
          return(
            <div>
            <h3>{key}</h3>
            <ul>
              {this.props.categorized[key].map((item, index) => {
                 return(
                   <li key={`${key}-${index}`} className={this.state.completed.includes(`${key}-${index}`) ? 'completed' : ''} onClick={() => {this.markComplete(`${key}-${index}`)}}>{item}</li>
                 )
              }
                )}
            </ul>
            </div>
          )
        })}
        <ul>
          {this.props.uncategorized.map((item, index) => {
            return(
            <li key={`b${index}`}><span className={this.state.completed.includes(`b${index}`) ? 'completed' : ''} onClick={() => {this.markComplete(`b${index}`)}}>{item}</span><span className="x" onClick={() => { this.remove(item)}}> &#9747; </ span></li>
            )
          }
          )}
        </ul>
      </div>
    )
  }
}

export default hot(List);