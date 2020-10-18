import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
    const QuestionComponent = this.props.tags.map((question, i) => {
      return (
        <Question
          key={i}
          question={question}
          username={question.name}
          upvotes={question.upvotes}
        />
      );
    });

    return <div>{ QuestionComponent }</div>;
  }
}

export default QuestionList;
