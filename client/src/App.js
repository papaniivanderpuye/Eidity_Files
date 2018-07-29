import React, { Component } from 'react';
import './App.css';
import _ from 'underscore'


class Button extends React.Component {
							constructor(props){
								super(props);
								this.state={ counter: 1, bgColor:"red"};
								this.testList=this.props.testList;
								this.handleClick=this.handleClick.bind(this);
								this.handler=this.props.handler;
								this.changeHandler=this.changeHandler.bind(this);
								this.answer=this.props.answer;
							};


							changeHandler= ()=> {
								this.props.handler(this.answer);
								//document.write("<h1>Hello World!</h1><p>Have a nice day!</p>");

					    };


							//handleClick=this.handleClick.bind(this);

              handleClick () {

                this.setState( (prevState) => ({
                  counter: prevState.counter + 1,
                  bgColor: 'blue',

                }));
								this.changeHandler();
								//document.write("<h1>Hello World!</h1><p>Have a nice day!</p>");
              };



              render() {
                return (

                  <div>
                    <button onClick={this.handleClick}  style={{backgroundColor:this.state.bgColor}}>
											{this.state.counter},{this.answer}
                    </button>
                  </div>
                );
              }
}



class App extends Component {
  state={ id: "flashCardApp", response: '', responseList: [], responseToAnswer: "Waiting"}
  constructor(props) {
        super(props);
				this.handler=this.handler.bind(this)
				this.answers=["water","fire","wind","earth"]

    }

	componentDidMount() {
	    this.callApi()
	      .then(res => this.setState({ response: res.express }))
	      .catch(err => console.log(err));
	  }

	  callApi = async () => {
	    const response = await fetch('/api/hello');
	    const body = await response.json();

	    if (response.status !== 200) throw Error(body.message);

	    return body;
	  };
	handler(UserResponse) {
		//var joined=this.state.responseList.concat(UserResponse);
    this.setState( (prevState) => ({
      responseList:prevState.responseList.concat(UserResponse),
      //prevState:joined
    }),() =>{
        this.checkAnswer();
    })


  }

	checkAnswer() {
				var rightAnswerList=false;
				if (this.state.responseList.length=== this.answers.length ) {
						      this.state.responseList.sort();
						      this.answers.sort();
						      rightAnswerList=  _.isEqual(this.state.responseList, this.answers);
									this.answerFeedBackDisplay(rightAnswerList);
							}

	}

	answerFeedBackDisplay(rightAnswerList) {
			var checked="Wrong!";
			if(rightAnswerList){
				checked="Correct!";
			}

			this.setState(prevState => ({
				responseToAnswer:checked
			}))
  }
  //
  render() {
    return (
      <div className="App">
				<h1>What are the five elements?</h1>
        <Button handler={this.handler} answer="fire"/>
				<Button handler={this.handler} answer="water"/>
				<Button handler={this.handler} answer="wind"/>
        <Button handler={this.handler} answer="earth"/>

				<p>{this.state.responseList}</p>

        <p>{this.state.responseList.length}</p>
        <p>{this.answers}</p>
        <p>{this.answers.length}</p>
				<p>{this.state.responseToAnswer}</p>
				<p className="App-intro">{this.state.response}</p>

      </div>
    );
  }
}

export default App;
