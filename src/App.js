import React, { Component } from 'react';
import { Button, ButtonToolbar,Well,Alert } from 'react-bootstrap';
import './App.css';
import _ from 'underscore'

function shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

class Button1 extends React.Component {
	constructor(props){
		super(props);
		this.state={ counter: 1, bgColor:"red", bsStyle:"default"};
		this.testList=this.props.testList;
		this.handleClick=this.handleClick.bind(this);
		this.handler=this.props.handler;
		this.changeHandler=this.changeHandler.bind(this);
		this.answer=this.props.answer;
	};
	changeHandler= ()=> {
		this.props.handler(this.answer);

	};

	handleClick () {

	  this.setState( (prevState) => ({
	    counter: prevState.counter + 1,
	    bsStyle: 'primary',
	  }));
		this.changeHandler();

	};

	render() {
	  return (
				<ButtonToolbar block>
				<Button onClick={this.handleClick} bsStyle={this.state.bsStyle} bsSize="normal" block>
					<Well>{
							this.answer
						}</Well>
				</Button>
				</ButtonToolbar>
	  );
	}
}


class App extends Component {
  state={ id: "flashCardApp", response: '', responseList: [], currentStateQuest: "Loading..", alert: "warning", responseToAnswer: "Waiting",  flashCardsRen: undefined}
  	constructor(props) {
        super(props);
				this.handler=this.handler.bind(this);
				this.answers=[];
				this.allAnswers= [];
				this.allQuestions =[];
				this.flashCards=[];
				this.slots =[];
				this.currentQ = "";
    }

	callApi = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

  getData = async () => {
      const response = await fetch('/api/select');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

	componentDidMount() {
	    this.callApi()
	      .then(res => this.setState({ response: res.express }))
	      .catch(err => console.log(err));
	    this.getData()
	      .then(res =>{
					this.flashCards = res.dict;
					for (var i = 0; i < this.flashCards.length; i++) {
					    var string = this.flashCards[i];
							var stringList = string.answer.split(",");
							string.answer = stringList;
							this.flashCards[i] = string;
							this.allAnswers =this.allAnswers.concat(stringList);
							this.allQuestions.push(string.question);


					}


					this.system();
					this.setState({ flashCardsRen: "Ready"});
					this.setState({ currentStateQuest: this.currentQ});


				})
	      .catch(err => console.log(err));


	  }

	handler(UserResponse) {
		//var joined=this.state.responseList.concat(UserResponse);
    this.setState( (prevState) => ({
      responseList:prevState.responseList.concat(UserResponse),
      //prevState:joined
    }),() =>{
        this.checkAnswer();
    })
  }

	system(){
		var r= Math.floor((Math.random() * this.allQuestions.length));
		this.currentQ = this.allQuestions[r];
		var fl = this.flashCards[r];
		this.currentAnswers = fl.answer;
		this.answers= this.currentAnswers;

		this.slots =[]

		this.slots =this.slots.concat(this.currentAnswers);

		while(this.slots.length < 10){
			var randomNum=Math.floor((Math.random() * this.allAnswers.length) + 1);
			var element = this.allAnswers[randomNum];

			this.slots.push(element);
		}

		this.slots = shuffle(this.slots);



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
			var myAlert = "danger";
			if(rightAnswerList){
				checked="Correct!";
				myAlert = "success";
			}

			this.setState(prevState => ({
				responseToAnswer:checked,
				alert: myAlert
			}))
  }

	renderButtonList(myHandler) {
    if(this.state.flashCardsRen === undefined) {
      return <div>"not working"</div>;
    } else {
			const wellStyles = { maxWidth: 600, margin: '0 auto 10px' };
      return (
				<div  className="well" style={wellStyles}>
					{
						this.slots.map(function(name, index){
					return <Button1 key = {index} handler={myHandler} answer={name}>
						{name}
					</Button1>

					})}
				</div>
      );
    }
  }
	render() {
    return (
      <div className="App" >
				<Alert bsStyle={this.state.alert}>
		  			<strong>{this.state.responseToAnswer}</strong>
				</Alert>
				<h2>{this.state.currentStateQuest}</h2>
				{this.renderButtonList(this.handler)}
				<br />
        <p>{this.answers.toString()}</p>

      </div>

    );
  }
}

export default App;
