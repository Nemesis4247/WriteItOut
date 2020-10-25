import React, { Component } from 'react';
import { QuestionsList } from './Components/MainScreen/ques-list';
import Answer from './Components/Mainpage/Answer';
import './App.css';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainScreen from './Components/MainScreen/MainScreen';

const initialState = {
  user: {
    name: 'Edward Elric',
    email: 'Elric@gmail.com',
    imageurl: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        'name': data.name,
        'email': data.email,
        'imageurl': data.imageurl
      }
    })
  }


  // renderSwitch(param) {
  //   switch(param) {
  //     case 'signin':
  //       return <Signin loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }  />
  //     case 'register':
  //       return <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange } />
  //     case 'Pandey':
  //       return <QuestionsList />
  //     case 'MainScreen':
  //       return <MainScreen onRouteChange = { this.onRouteChange } />
  //     default:
  //       return 'foo';
  //   }
  // }

  render() {
    return (
      <Router>
        <div className="App">
          {/* {
              this.state.route === 'signin'?
              <Signin loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }  />:
              (
                this.state.route === 'register'?
                <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange } />:
                <QuestionsList />
              )
            } */}
          <Switch>
            <Route path="/home">
              <MainScreen data={this.state} />
            </Route>
            <Route path="/register">
              <Register loadUser={this.loadUser} />
            </Route>
            <Route path="/question/:id">
              <Answer data={this.state} />
            </Route>
            <Route path="/">
              <Signin loadUser={this.loadUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
