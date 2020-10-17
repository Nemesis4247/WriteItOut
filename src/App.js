import React, { Component } from 'react';
import { QuestionsList } from './Components/Mainpage/ques-list';
import Answer from './Components/Mainpage/Answer';
import './App.css';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const initialState = {
      user: {
        'name':'',
        'email':'',
        'imageurl':''
      },
      friendslist: []
    }

class App extends Component {

      constructor(){
        super();
        this.state = initialState;
      }

       loadUser = (data, friends) => {
        this.setState({
          user: {
            'name':data.name,
            'email':data.email,
            'imageurl':data.imageurl
        },
          friendslist: friends
      })
      }


      render(){
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
                <QuestionsList />
              </Route>
              <Route path="/register">
                <Register loadUser = { this.loadUser } />
              </Route>
              <Route path="/question/:id">
                <Answer />
              </Route>
              <Route path="/">
                <Signin loadUser = { this.loadUser } />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
}

export default App;
