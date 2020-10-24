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
					question_id={this.props.questions[i].question_id}
          question={this.props.questions[i].question}
					liked={false}
					description={this.props.questions[i].description}
          username={this.props.questions[i].username}
          upvotes={this.props.questions[i].upvotes}
        />
      );
    });

    return <div>{ questionComponent }</div>;
  }
}

export default QuestionList;
