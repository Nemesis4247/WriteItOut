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
      imageURL: "",
      liked: this.props.liked
		}
	}

render(){
	return (
		<StyleRoot>
			<div className="w-100 mv2 bg-moon-gray v-mid br3 ph2">
          <div className="dt">
						<div className="dtc pa2 v-mid">
							<img className="dtc fc h3 w3" src={ profile }/>
						</div>
						<header className="dtc tl">
							<p className="f3 b v-top">{ this.state.name }</p>
							<p className="f6 v-top">{ this.state.description }</p>
						</header>
					</div>
          <hr/>
		  		<h2 className="black tl">
		  			{this.state.question}
		  		</h2>
					<hr/>
					<div className="tl">
	          {
	            this.state.liked === true?
	            <img className="dib h2 w2 ma1" src={ u_filled }/>:
	            <img className="dib h2 w2" src={ u_blank }/>
	          }
	          <p className="dib f3">{ this.state.upvotes }</p>
					</div>
			</div>
			</StyleRoot>
		);
	}
}

export default Question;
