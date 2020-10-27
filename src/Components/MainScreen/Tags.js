import React from 'react';
import cancel from './cancel3.png'

class Tags extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tag: this.props.value,
			index: this.props.index
		}
	}

	cancelItem = () => {
		console.log(this.state.index)
		this.props.removeTag(this.state.index)
	}

render(){
	return (
			<div className="dib bg-washed-red mh2 v-mid br3 ph2">
		  		<p className="black dib mh1 v-mid">
		  			{this.state.tag}
		  		</p>
					<img className="h1 w1 dib ml1 v-mid" src={ cancel } alt="cancel" onClick={ this.cancelItem }/>
			</div>
		);
	}
}

export default Tags;
