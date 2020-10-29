import React from 'react';
import u_blank from './like.png';
import u_filled from './liked.png';
import Radium, { StyleRoot } from 'radium';
import { zoomIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import profile from '../../Signin/profile.svg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { withRouter } from 'react-router-dom';

const Styles = {
    zoomIn: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    },
    fadeOut: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(fadeOut, 'fadeOut')
    }
}



class Question extends React.Component {

	constructor(props){
		super(props);
		console.log("Question: ", props);
		this.state = {
			question_id: this.props.question_id,
			question: this.props.question,
			name: this.props.username,
			description: this.props.description,
      upvotes: this.props.upvotes,
      imageURL: this.props.imagepath,
      userid: this.props.userid,
      datetime: this.props.datetime,
      liked: this.props.liked,
      currentuserid: this.props.currentuserid,
      year: 0,
      branch: '',
      email: ''
    }
  }

  likeToggle = () => {
    fetch('http://127.0.0.1:3001/likeUnlikeQuestion', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: this.state.currentuserid,
        queid: this.state.question_id,
        like: !this.state.liked
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          this.setState({
            liked: !this.state.liked,
            upvotes: data.data.upvotes
          })
        }
        else {
          alert("Error: " + data.data.message)
        }
      })
      .catch(err => {
        alert("Error: " + err)
      });
  }

  openQuestion = () => {
    const { history } = this.props;
    history.push(`/question/${this.state.question_id}`);
  }

  openOtherUserProfile = () => {
    fetch(`http://127.0.0.1:3001/profile/${this.state.userid}/`)
      .then(resp => resp.json())
      .then((data) => {
        console.log("data : ", data);
        this.setState({
          year: data.year,
          branch: data.branch,
          email: data.email
        });
      })
  }

  render() {
    return (
      <StyleRoot>
        <div className="w-100 mv2 bg-moon-gray v-mid br3 ph2 pointer" onClick={this.openQuestion}>
          <Popup trigger={<div className="dt pa2">
            <div className="dtc pa1 v-mid dim" onClick={ this.openOtherUserProfile }>
              <img className="dtc br-100 fc h3 w3" src={this.state.imageURL ?
                this.state.imageURL : profile} alt="profilePic" />
            </div>
            <div className="dtc tl dim" onClick={ this.openOtherUserProfile }>
              <p className="f5 ma2" style={{ fontFamily: 'Acme' }}> <strong> {this.state.name}</strong> <br /> {this.state.description} <br /> {this.state.datetime}</p>
            </div>
          </div>} modal >
            <div className="w-100 ba b--black-20 center bg-light-blue tc pa4"  style={Styles.zoomIn}>

              <img src={this.state.imageURL ? this.state.imageURL : profile}
                className="dib center w5 mv4 h5 br-100 pointer"
                alt="profile pic" />

              <p className="v-mid f2 mv2"
                style={{ fontFamily: 'Abril Fatface' }}> {this.state.name}, {this.state.userid} </p>

              <p className="v-mid f3 mv2"
                style={{ fontFamily: 'Abril Fatface' }}> {this.state.year} year, {this.state.branch} </p>

              <p className="v-mid f3 mv2"
                style={{ fontFamily: 'Abril Fatface' }}> {this.state.description} </p>

              <p className="v-mid f3 mid-gray mv2"
                style={{ fontFamily: 'Abril Fatface' }}> {this.state.email} </p>

            </div>
          </Popup>
          <hr />
          <h1 className="black tl">
            {this.state.question}
          </h1>
          <hr />
          <div className="tl pa2">
            {
              this.state.liked === true ?
                <img className="dib dim h2 w2 mr1" src={u_filled} alt="like" onClick={(e) => {
                  e.stopPropagation();
                  this.likeToggle();
                }} /> :
                <img className="dib dim h2 w2" src={u_blank} alt="unlike" onClick={(e) => {
                  e.stopPropagation();
                  this.likeToggle();
                }} />
            }
            <p className="dib f3">{this.state.upvotes}</p>
          </div>
        </div>
      </StyleRoot>
    );
  }
}

export default withRouter(Question);
