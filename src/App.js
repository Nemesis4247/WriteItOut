import React, { Component } from 'react';
import { Profile } from './Components/Profile/profile'
import QuesAnsComment from './Components/QuestionDetail/QuesAnsComment';
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
    'name': 'Edward Elric',
    'email': 'eelric@gmail.com',
    'imagepath': '',
    'enr_no': '20202020',
    'year': '2020',
    'branch': 'CSE',
    'description': 'Alchemist',
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
              <QuesAnsComment data={this.state} />
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
