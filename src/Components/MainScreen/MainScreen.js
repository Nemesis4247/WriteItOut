import React from 'react';
import Scroll from '../Scroll/Scroll';
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import 'reactjs-popup/dist/index.css';
import Tags_list from './Tags_list';
import edit from './edit1.png'
import profile from '../Signin/profile.svg';
import signout from './signout.png'
import { css } from 'glamor';
import { zoomIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { QuestionsList } from './ques-list'


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

const ROOT_CSS = css({
  height: '1000',
  background: "#FFDFDF"
});


class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "Hemant",
      imageURL: "",
      email: "hy27.1999@gmail.com",
      year_branch: "3rd Year, Computer Science",
      description: "Mobile and Web Developer",
      editprofile: false,
      question: "",
      tag_string: "",
      tags_list: []
      // name: this.props.data.user.name,
      // imageURL: this.props.data.user.imageurl,
      // email: this.props.data.user.email,
    }
  }

  onProfileEditToggle = () => {
    this.setState({ editprofile: !this.state.editprofile })
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onYeraBranchChange = (event) => {
    this.setState({ year_branch: event.target.value })
  }

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  onQuestionChange = (event) => {
    this.setState({ question: event.target.value })
  }

  postQuestion = () => {

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

  removeTag = (index) => {
    console.log("Index: ", index)
    const tag_arr = this.state.tags_list
    tag_arr.splice(index, 1)
    console.log(tag_arr)
    this.setState({ tags_list: tag_arr })
    console.log(this.state.tags_list)
  }

  searchQuestion = () => {

  }

  render() {

    // const { onRouteChange } = this.props;

    return (

      <StyleRoot>

        <div className="dt w-100 h-100 vh-100" style={styles.zoomIn}>

          <div className="dtc w-30 ba b--black-20 center bg-light-yellow tc">

            <div className="dt w-100 bg-near-black">
              <div className="dtc v-mid mid-gray  w-25">
                <p className="moon-gray v-mid pl4 tr f2-ns dib"
                  style={{ fontFamily: 'Luckiest Guy' }}> WriteItOut </p>
                <div className="fr dib tr v-mid f3 moon-gray pa3">
                  <img className="dib w2 v-mid h2 ma3 pointer" src={edit} onClick={this.onProfileEditToggle} alt="editprofile" />
                  <img className="dib w2 v-mid h2 ma3 pointer" src={signout} onClick={() => { console.log('signout') }} alt="logout" />
                </div>
              </div>
            </div>

            {
              this.state.editprofile === false ?
                <img src={this.state.imageURL === "" ? profile : this.state.imageURL} className="dib center w5 mv4 h5 br-100" alt="profile pic" /> :
                <img src={this.state.imageURL === "" ? profile : this.state.imageURL}
                  className="dib center w5 mv4 h5 br-100 pointer"
                  alt="profile pic" />
            }

            {
              this.state.editprofile === false ?
                <p className="v-mid f2"
                  style={{ fontFamily: 'Concert One' }}> {this.state.name} </p> :
                <input id="name_id"
                  className="v-mid f3 mv2 pa2" type="text"
                  onChange={this.onNameChange}
                  value={this.state.name} />
            }

            {
              this.state.editprofile === false ?
                <p className="v-mid f3"
                  style={{ fontFamily: 'Concert One' }}> {this.state.year_branch} </p> :
                <input id="year_branch_id"
                  className="v-mid f3 mv2 pa2" type="text"
                  onChange={this.onYeraBranchChange}
                  value={this.state.year_branch} />
            }

            {
              this.state.editprofile === false ?
                <p className="v-mid f3"
                  style={{ fontFamily: 'Concert One' }}> {this.state.description} </p> :
                <input id="description_id"
                  className="v-mid f3 mv2 pa2" type="text"
                  onChange={this.onDescriptionChange}
                  value={this.state.description} />
            }

            <p className="v-mid f3 mid-gray"
              style={{ fontFamily: 'Concert One' }}> {this.state.email} </p>

            {
              this.state.editprofile === true &&
              <input className="input-reset tc white f6 b ttu mv2 w-50 pa3 pointer bg-black hover-bg-near-black bn br-pill"
                value="Submit"
                onClick={this.onProfileEditToggle}
                type="submit" />
            }

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

            <div className="w-100 tc f4 mh3 bg-near-green">
              <input id="srchQue" onChange={this.searchQuestion} className="input-reset ba b--black-20 f4 mb3 pa3 w-100 border-box bg-near-white"
                type="text" placeholder='Search Question' />
              <Scroll className="bg-black">
                <div>
                  <QuestionsList />
                </div>
              </Scroll>
            </div>

          </div>

        </div>

      </StyleRoot>
    );
  }
}

export default MainScreen;
