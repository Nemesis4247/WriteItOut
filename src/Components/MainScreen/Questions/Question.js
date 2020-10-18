import React from 'react';
import u_blank from './upvote_blank.jpg'
import u_filled from './upvote_filled.jpg'

class Question extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			question: this.props.value,
			name: this.props.index,
      upvotes: this.props.upvotes,
      imageURL: "",
      liked: this.props.liked
		}
	}

render(){
	return (
			<div className="dib bg-washed-red mh2 v-mid br3 ph2">
          
          <hr />
		  		<h1 className="black">
		  			{this.state.question}
		  		</h1>
          <hr />
          {
            this.state.liked === true?
            <img className="dib" src={ u_filled }/>:
            <img src={ u_blank }/>
          }
          <p className="dib">{ this.state.upvotes }</p>
			</div>
		);
	}
}

export default Tags;
