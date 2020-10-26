import React, { Component } from 'react';
import { QuestionsList } from './Components/MainScreen/ques-list';
import { Profile } from './Components/Profile/profile'
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
    'name': '',
    'email': '',
    'imagepath': '',
    'enr_no': '',
    'year': '',
    'branch': '',
    'description': '',
  },
  isLoggedin: false
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
        'imagepath': data.imagepath,
        'userid': data.userid,
        'year': data.year,
        'branch': data.branch,
        'description': data.description
      },
      isLoggedin: true
    })
    console.log("app js load user : ", this.state.user);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/profile/:id">
              <Profile data={this.state} />
            </Route>
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
