import React, { Component } from 'react';
import { QuestionsList } from './Components/ques-list'
import './App.css';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import MainScreen from './Components/MainScreen/MainScreen';

const initialState = {
      route: 'signin',
      user: {
        'name':'',
        'email':'',
        'imageurl':''
      }
    }

class App extends Component {

      constructor(){
        super();
        this.state = initialState;
      }

      loadUser = (data) => {
        this.setState({
          user: {
            'name':data.name,
            'email':data.email,
            'imageurl':data.imageurl
          }
        })
      }

      onRouteChange = (route) => {
        if(route === 'signout'){
          this.setState(initialState);
        }
        this.setState({route: route});
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
            return <MainScreen onRouteChange = { this.onRouteChange } />
          default:
            return 'foo';
        }
      }

      render(){
      return (
        <div className="App">
            { this.renderSwitch(this.state.route)
              // this.state.route === 'signin'?
              // <Signin loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }  />:
              // (
              //   this.state.route === 'register'?
              //   <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange } />:
              //   <QuestionsList />
              // )
            }
        </div>
      );
    }
}

export default App;
