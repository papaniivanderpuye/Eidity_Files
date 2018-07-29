import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    flashCards: 0
  };
  constructor(props) {
        super(props);
				this.flashCards=[];

    }

    callApi = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log(body.express);
      return body;
    };

    getData = async () => {
      const response = await fetch('/api/select');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log(body.dict[0].answer);
      return body;
    };


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


    this.getData()
      .then(res =>{this.flashCards = res.dict;})
      .catch(err => console.log(err));
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>

      </div>
    );
  }
}

export default App;
