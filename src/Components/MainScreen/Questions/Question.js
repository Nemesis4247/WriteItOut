import React from 'react';
import profile from '../../Signin/profile.svg';
import u_blank from './like.png';
import { fadeIn } from 'react-animations';
import u_filled from './liked.png';
import Radium, {StyleRoot} from 'radium';


const styles = {
  fadeIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

class Question extends React.Component {

	constructor(props){
		super(props);
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
      currentuserid: this.props.currentuserid
		}
	}

  likeToggle = () => {
    fetch('http://127.0.0.1:3001/likeUnlikeQuestion',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        userid: this.state.currentuserid,
        queid: this.state.question_id,
        like: !this.state.liked
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
        if(data.status) {
            this.setState({
              liked: !this.state.liked,
              upvotes: data.data.upvotes
            })
        }
        else{
          alert("Error: " + data.data.message)
        }
    })
    .catch(err => {
        alert("Error: " + err)
    });
  }

render(){
	return (
		<StyleRoot>
			<div className="w-100 mv2 bg-moon-gray v-mid br3 ph2">
          <div className="dt">
						<div className="dtc pa1 v-mid">
							<img className="dtc br-100 fc h3 w3" src={ this.state.imageURL }/>
						</div>
						<div className="dtc tl">
							<p className="f5" style={{ fontFamily: 'Acme' }}> <strong> { this.state.name }</strong> <br/> { this.state.description } <br/> { this.state.datetime }</p>
						</div>
					</div>
          <hr/>
		  		<h1 className="black tl">
		  			{this.state.question}
		  		</h1>
					<hr/>
					<div className="tl">
	          {
	            this.state.liked === true?
	            <img className="dib h2 w2 mr1" src={ u_filled } onClick={ this.likeToggle }/>:
	            <img className="dib h2 w2" src={ u_blank } onClick={this.likeToggle}/>
	          }
	          <p className="dib f3">{ this.state.upvotes }</p>
					</div>
			</div>
			</StyleRoot>
		);
	}
}

export default Question;
