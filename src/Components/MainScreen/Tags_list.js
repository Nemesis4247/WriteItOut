import React from 'react';
import Tags from './Tags';

class Tags_list extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
    const TagComponent = this.props.tags.map((tag, i) => {
      return (
        <Tags
          key={i}
          value={tag}
					index={i}
					removeTag={ this.props.removeTag }
        />
      );
    });

    return <div>{ TagComponent }</div>;
  }
}

export default Tags_list;
