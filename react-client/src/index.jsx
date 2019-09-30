/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios.get('/items')
      .then((items) => {
        this.setState({ items });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1>Item List</h1>
        <List items={items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
