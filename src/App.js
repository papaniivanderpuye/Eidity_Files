import React, { Component } from 'react';
import './App.css';
import _ from 'underscore'





class Question extends React.Component {
              state = { quest: "what is life?"};

              handleClick = () => {
                this.setState((prevState) => ({

                }));
              };

              render() {
                return (

                  <div>
                    <h1
                      >{this.state.quest}
                    </h1>
                  </div>
                );
              }
}

class Button extends React.Component {
							constructor(props){
								super(props);
								this.state = { counter: 1, bgColor:"red"};
								this.testList = this.props.testList;
								this.handleClick = this.handleClick.bind(this);
								this.handler = this.props.handler;
								this.changeHandler = this.changeHandler.bind(this);
								this.answer = this.props.answer;
							};


							changeHandler= ()=> {
								this.props.handler(this.answer);
								//document.write("<h1>Hello World!</h1><p>Have a nice day!</p>");

					    };


							//handleClick = this.handleClick.bind(this);

              handleClick () {
								console.log("hello")

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



class Grid extends React.Component {
  state = { counter: 1 };
	testList = this.props.testList;



  render() {
    return (
    	<div>
      	<Question>
        </Question>
				<h1>{this.testList}</h1>
  			<div id = "grid-container">
        	<div class="action-container">
            <Button handler = {this.handler}>
            </Button>
          </div>

        </div>
      </div>
    );
  }
}


class App extends Component {
  state = { id: "flashCardApp", responseList: [], responseToAnswer: "Waiting"}
  constructor(props) {
        super(props);
				this.handler = this.handler.bind(this)
				this.answers = ["water","fire","wind","wind"]

    }

	handler(UserResponse) {
		var joined = this.state.responseList.concat(UserResponse);
    this.setState(prevState => ({
      responseList:joined
    }))
		this.checkAnswer();
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
			var checked = "Wrong!";
			if(rightAnswerList){
				checked = "Correct!";
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
        <Button handler = {this.handler} answer = "fire"/>
				<Button handler = {this.handler} answer = "water"/>
				<Button handler = {this.handler} answer = "wind"/>
				<h1>{this.state.responseList}</h1>
				<p>{this.state.responseList.length}</p>
				<p>{this.state.responseToAnswer}</p>

      </div>
    );
  }
}

export default App;
