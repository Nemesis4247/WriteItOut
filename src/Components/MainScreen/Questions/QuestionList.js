import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
    const questionComponent = this.props.questions.map((question, i) => {
      return (
        <Question
          key={i}
					question_id={question.queid}
          question={question.que}
					liked={question.liked}
					description={question.description}
          username={question.name}
          upvotes={question.upvotes}
					userid={question.userid}
					currentuserid={question.currentuserid}
					imagepath={question.imagepath}
					datetime={question.datetime}
        />
      );
    });

    return <div>{ questionComponent }</div>;
  }
}

export default QuestionList;
