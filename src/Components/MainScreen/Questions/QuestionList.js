import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		var size = this.props.questions.length;
    var questionComponent = this.props.questions.map((question, i) => {
      return (
        <Question
          key={i}
					question_id={this.props.questions[i].queid}
          question={this.props.questions[i].que}
					liked={this.props.questions[i].liked}
					description={this.props.questions[i].description}
          username={this.props.questions[i].name}
          upvotes={this.props.questions[i].upvotes}
					userid={this.props.questions[i].userid}
					currentuserid={this.props.questions[i].currentuserid}
					imagepath={this.props.questions[i].imagepath}
					datetime={this.props.questions[i].datetime}
        />
      );
    });

    return <div>{ questionComponent }</div>;
  }
}

export default QuestionList;
