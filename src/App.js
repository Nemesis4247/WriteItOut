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
      route: 'signin',
      user: {
        'name':'',
        'email':'',
        'imagepath':'',
        'enr_no':'',
        'year':'',
        'branch':'',
        'description':'',
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
        'name':data.name,
        'email':data.email,
        'imagepath':data.imagepath,
        'userid':data.userid,
        'year':data.year,
        'branch':data.branch,
        'description':data.description
      }
    })
    console.log(this.state.user);
  }

  renderSwitch(param) {
    switch(param) {
      case 'signin':
        return <Signin loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }  />
      case 'register':
        return <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange } />
      case 'Pandey':
        return <QuestionsList />
      case 'MainScreen':
        return <MainScreen data = { this.state.user } onRouteChange = { this.onRouteChange } />
      default:
        return 'foo';
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/home">
              <MainScreen />
            </Route>
            <Route path="/register">
              <Register loadUser={this.loadUser} />
            </Route>
            <Route path="/question/:id">
              <Answer />
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
