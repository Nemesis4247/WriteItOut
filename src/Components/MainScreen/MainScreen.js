import React from 'react';
import Scroll from '../Scroll/Scroll';
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import Switch from "react-switch";
import 'reactjs-popup/dist/index.css';
import Tags_list from './Tags_list';
import QuestionList from './Questions/QuestionList';
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

	constructor(props){
		super(props);
		this.state = {
			name: this.props.data.name,
			imageURL: this.props.data.imagepath,
			email: this.props.data.email,
      year: this.props.data.year,
      branch: this.props.data.branch,
      description: this.props.data.description,
      enr_no: this.props.data.userid,
      editprofile: false,
      question: "",
      tag_string: "",
      tags_list: [],
      searchQuestionByString: "",
      searchQuestionByTag: "",
      checked: false,
      questionsList: [
        {
          question_id: 1,
          username: "Hemant Yadav",
          description: "Mobile and Web Developer",
          question: "When we see something, it behaves differently, and when we do not see it, it behave differently. Is the world very mysterious? What do you know about Photon of Double Slit?What is one piece of simple advice that actually changed your life?",
          upvotes: 5
        },
        {
          question_id: 2,
          username: "Ishaan Pandey",
          description: "Quantum Computing Enthusiastic",
          question: "What is the significance of major project in 4th year of engineering if one doesn't want to pursue an engineering job. Like what should one do in the major project if one just wants to get the engineering degree?",
          upvotes: 3
        },
        {
          question_id: 3,
          username: "Devjit Meghani",
          description: "BLockchain Enthusiastic",
          question: "What is one piece of simple advice that actually changed your life?",
          upvotes: 7
        },
        {
          question_id: 4,
          username: "Ashish Ucheniya",
          description: "Mobile and Web Developer",
          question: "How do I write some Python code that simulations the toss of a coin (0=heads and 1= tails)? How do I modify this code so that the user is asked if they want to toss again (Y/N)?",
          upvotes: 5
        },
        {
          question_id: 5,
          username: "Ankit Aharwal",
          description: "Mobile and Web Developer",
          question: "Can TensorFlow lite C++ library be used to program a part of an Operating System since TensorFlow lite C++ library is used in programming microcontrollers?",
          upvotes: 10
        },
      ]
		}
	}

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onYearChange = (event) => {
		this.setState({ year: event.target.value })
	}

  onBranchChange = (event) => {
		this.setState({ branch: event.target.value })
	}

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  onImagePathChange = (event) => {
  	this.setState({ imageURL: event.target.value })
  }

  onProfileEditToggle = () => {
    if(this.state.editprofile){
      fetch('http://127.0.0.1:3001/update_details',{
  			method: 'post',
  			headers: {'Content-Type':'application/json'},
  			body:JSON.stringify({
          name: this.state.name,
  				imagePath: this.state.imageURL,
          year: this.state.year,
          branch: this.state.branch,
          description: this.state.description,
          userid: this.state.enr_no
  			})
  		})
  			.then(response => response.json())
  			.then(data => {
  				if(data.status){
  					alert("Updated Successfully!")
  				}
          else{
            alert(data.data.message)
          }
  			})
        .catch(err => {
          alert("Updation failed due to " + err)
        })
    }
    this.setState({ editprofile: !this.state.editprofile })
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
    console.log("Index: ", index)
    const tag_arr = this.state.tags_list
    tag_arr.splice(index, 1)
    console.log(tag_arr)
    this.setState({ tags_list: tag_arr })
    console.log(this.state.tags_list)
  }

  postQuestion = () => {
    fetch('http://127.0.0.1:3001/add_question',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        question: this.state.question,
        question_tags: this.state.tags_list,
        userid: this.state.enr_no
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data.status){
          alert("Posted Successfully!")
          this.setState({
            question: "",
            tags_list: [],
            tag_str: ""
          })
        }
        else{
          alert(data.data.message)
        }
      })
      .catch(err => {
        alert("Couldn't post the question due to following error: " + err)
      })
  }

  handleChange = () => {

  }

  searchQuestion = (event) => {
    this.setState({searchQuestionByString: event.target.value})
  }


	render(){

  	const { onRouteChange } = this.props;

    var filteredQuestionList = this.state.questionsList.filter(question => {
      return question.question.toLowerCase().includes(this.state.searchQuestionByString.toLowerCase())
    });

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

          <img src = { this.state.imageURL === ""?profile:this.state.imageURL }
           className="dib center w5 mv4 h5 br-100 pointer"
           alt="profile pic" />

          {
            this.state.editprofile === true &&
            <input id="image_id"
    				className="v-mid f3 mv2 pa2" type="text"
            placeholder="imagePath"
            onChange={ this.onImagePathChange }
    				value={this.state.imageURL} />
          }

          {
            this.state.editprofile === false?
            <p className="v-mid f2"
            style={{ fontFamily: 'Concert One' }}> {this.state.name}, {this.state.enr_no} </p>:
            <input id="name_id"
    				className="v-mid f3 mv2 pa2" type="text"
            placeholder="name"
            onChange={ this.onNameChange }
    				value={this.state.name} />
          }

          {
            this.state.editprofile === false?
            <p className="v-mid f3"
            style={{ fontFamily: 'Concert One' }}> {this.state.year} year, {this.state.branch} </p>:
            <div>
              <input id="year_id"
      				className="v-mid f3 mv2 pa2" type="number"
              onChange={ this.onYearChange }
              placeholder="year"
      				value={this.state.year} />
              <input id="branch_id"
      				className="v-mid f3 mv2 pa2" type="text"
              placeholder="branch"
              onChange={ this.onBranchChange }
      				value={this.state.branch} />
            </div>
          }

          {
            this.state.editprofile === false?
            <p className="v-mid f3"
            style={{ fontFamily: 'Concert One' }}> {this.state.description} </p>:
            <input id="description_id"
    				className="v-mid f3 mv2 pa2" type="text"
            onChange={ this.onDescriptionChange }
    				value={this.state.description} />
          }

          {
            this.state.editprofile === true &&
            <p className="v-mid f3 mid-gray"
            style={{ fontFamily: 'Concert One' }}>Enr. id: {this.state.enr_no} </p>
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
                  <Popup trigger={<button onClick={ this.addTags }
                    style={{ fontFamily: 'Luckiest Guy' }}
                    className="input-reset w-10 v-btm bg-dark-green fr white br3 f5 ma2 pv3-ns ba b--black-80 bg-hover-mid-gray" >Add tags</button>}
                    position="top center">
                    <div>
                      <input refs="newTag" type="text" className="w-100 f3 br3 input-reset ba b--black-20 pa2"
                      onChange={ this.updateTagString }
                      value={ this.state.tag_string }
                      onKeyPress={ this.tagKeyPressed }/>
                    </div>
                  </Popup>
                  <div className="pa2" style={{fontFamily: 'Bree Serif' }}>
      							<Tags_list tags={ this.state.tags_list } removeTag={ this.removeTag.bind(this) }/>
      						</div>
                </div>
              </div>

              <div className="w-100 pa3 tc bg-near-black br3 ma1">
                <div className="dt w-100">
                  <input id="srchQue" onChange={ this.searchQuestion } className="input-reset ba b--black-20 w-60 f4 dtc br3 pa3 border-box"
                  type="text" placeholder='Search Question' />
                  <div className="dtc w-40">
                    <p className="f4 b white dib">Search by tags</p>
                    <Switch onChange={this.handleChange} checked={this.state.checked} className="dib mt2"/>
                  </div>
                </div>
                <Scroll>
                  <div >
                    <QuestionList questions={ filteredQuestionList } />
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
