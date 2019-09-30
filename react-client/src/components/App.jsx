/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import List from './List';

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

export default App;
