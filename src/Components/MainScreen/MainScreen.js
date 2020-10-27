import React from 'react';
import Scroll from '../Scroll/Scroll';
import Popup from 'reactjs-popup';
import Switch from "react-switch";
import 'reactjs-popup/dist/index.css';
import Tags_list from './Tags_list';
import QuestionList from './Questions/QuestionList';
import ProfilePreview from './ProfilePreview';
import { css } from 'glamor';
import { zoomIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import Radium, { StyleRoot } from 'radium';


const styles = {
  zoomIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  },
  fadeOut: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(fadeOut, 'fadeOut')
  }
}


class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.user.name,
      imageURL: this.props.data.user.imagepath,
      email: this.props.data.user.email,
      year: this.props.data.user.year,
      branch: this.props.data.user.branch,
      description: this.props.data.user.description,
      enr_no: this.props.data.user.userid,
      editprofile: false,
      question: "",
      tag_string: "",
      tags_list: [],
      searchQuestionByString: "",
      checkedByTags: false,
      questionsList: []
    }
  }

  componentDidMount() {
    this.requestQuestionsandUpvotes()
  }

  requestQuestionsandUpvotes = () => {
    console.log(this.state);
    fetch('http://127.0.0.1:3001/get-questionList')
      .then(response => response.json())
      .then(data => {
        if (data.status) {

          fetch('http://127.0.0.1:3001/getLikedQuestions', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userid: this.state.enr_no
            })
          })
            .then(response => response.json())
            .then(data1 => {

              if (data1.status) {
                var que_list = data.data.message;
                var likedQuestions = data1.data.message;
                for (var i = 0; i < que_list.length; i++) {
                  que_list[i]["liked"] = likedQuestions.includes(que_list[i]["queid"])
                  que_list[i]["currentuserid"] = this.state.enr_no
                }
                this.setState({ questionsList: que_list })
              }
              else {
                alert("Error: " + data1.data.message)
              }
            })
            .catch(err1 => {
              alert("Error: " + err1)
            });

        }
        else {
          alert("Error: " + data.data.message)
        }
      })
      .catch(err => {
        alert("Error: " + err)
      });
  }

  onQuestionChange = (event) => {
    this.setState({ question: event.target.value })
  }

  addTags = () => {
    var tags = this.state.tag_string.split(" ")
    if (this.state.tags_list.length + tags.length > 5) {
      alert("Maximum tag limit is 5!")
    }
    else {
      var new_tag_list = this.state.tags_list.concat(tags)
      this.setState({ tags_list: new_tag_list })
    }
  }

  tagKeyPressed = (event) => {
    if (event.key === "Enter") {
      this.addTags()
      this.setState({ tag_string: "" })
      event.preventDefault()
    }
  }

  updateTagString = (event) => {
    this.setState({ tag_string: event.target.value })
  }

  removeTag = (index) => {          // not complete
    const tag_arr = this.state.tags_list
    tag_arr.splice(index, 1)
    this.setState({ tags_list: tag_arr })
  }

  postQuestion = () => {
    fetch('http://127.0.0.1:3001/add_question', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: this.state.question,
        question_tags: this.state.tags_list,
        userid: this.state.enr_no
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          alert("Posted Successfully!")
          this.setState({
            question: "",
            tags_list: [],
            tag_str: ""
          })
          console.log(this.state.questionsList);
        }
        else {
          alert(data.data.message)
        }
      })
      .catch(err => {
        alert("Couldn't post the question due to following error: " + err)
      })

    this.requestQuestionsandUpvotes()
  }

  handleTagSearchToggle = () => {
    this.setState({ checkedByTags: !this.state.checkedByTags })
  }

  searchQuestion = (event) => {
    // this.forceUpdate();
    this.setState({ searchQuestionByString: event.target.value })
  }


  render() {

    // const { onRouteChange } = this.props;

    var filteredQuestionList = []
    if (!this.state.checkedByTags) {
      filteredQuestionList = this.state.questionsList.filter(question => {
        return question.que.toLowerCase().includes(this.state.searchQuestionByString.toLowerCase())
      });
    }
    else {
      filteredQuestionList = this.state.questionsList.filter(question => {
        return question.tags.toLowerCase().includes(this.state.searchQuestionByString.toLowerCase())
      });
    }

    console.log(filteredQuestionList);

    return (

      <StyleRoot>

        <div className="dt w-100 h-100 vh-100" style={styles.zoomIn}>

          <div className="dtc w-30 ba b--black-20 center bg-light-yellow tc">
            <ProfilePreview
              name={this.state.name}
              year={this.state.year}
              userid={this.state.enr_no}
              branch={this.state.branch}
              description={this.state.description}
              imagepath={this.state.imageURL}
              email={this.state.email}
              loaduser={this.props.loaduser}
            />
          </div>

          <div className="dtc w-70 bg-near-white v-top" >


            <div className="dt v-top w-100 h4 br3 bg-near-black ma1">
              <div className="dtc mid-gray pa1">
                <input placeholder="Write your question here" type="text"
                  onChange={this.onQuestionChange}
                  style={{ fontFamily: 'Josefin Sans' }}
                  className="w-100 f4 br3 h4 input-reset ba b--black-20 mr3 pv3 ph3" />
                <button onClick={this.postQuestion}
                  style={{ fontFamily: 'Luckiest Guy' }}
                  className="input-reset w-10 bg-dark-green fr white br3 f5 ma2 pv3-ns ba b--black-80 bg-hover-mid-gray" >Post</button>
                <Popup trigger={<button onClick={this.addTags}
                  style={{ fontFamily: 'Luckiest Guy' }}
                  className="input-reset w-10 v-btm bg-dark-green fr white br3 f5 ma2 pv3-ns ba b--black-80 bg-hover-mid-gray" >Add tags</button>}
                  position="top center">
                  <div>
                    <input refs="newTag" type="text" className="w-100 f3 br3 input-reset ba b--black-20 pa2"
                      onChange={this.updateTagString}
                      value={this.state.tag_string}
                      onKeyPress={this.tagKeyPressed} />
                  </div>
                </Popup>
                <div className="pa2" style={{ fontFamily: 'Bree Serif' }}>
                  <Tags_list tags={this.state.tags_list} removeTag={this.removeTag.bind(this)} />
                </div>
              </div>
            </div>

            <div className="w-100 pa3 tc bg-near-black br3 ma1">
              <div className="w-100 tl">
                <input id="srchQue" onChange={this.searchQuestion} className="input-reset ba b--black-20 w-80 f4 dib br3 pa3 border-box"
                  type="text" placeholder='Search Question' />
                <p className="f4 b white dib ml2">Search by tags</p>
                <Switch onChange={this.handleTagSearchToggle} checked={this.state.checkedByTags} className="dib ml3 mt3" />
              </div>
              <div className="mt2">
                <Scroll>
                  <div >
                    <QuestionList questions={filteredQuestionList} />
                  </div>
                </Scroll>
              </div>
            </div>

          </div>

        </div>

      </StyleRoot>
    );
  }
}

export default MainScreen;
