import React from 'react';
import 'reactjs-popup/dist/index.css';
import { css } from 'glamor';
import profile_image from '../Signin/profile.svg';
import signout from '../MainScreen/signout.png';
import edit from '../MainScreen/edit1.png';
import { withRouter } from 'react-router-dom';

const ROOT_CSS = css({
    height: '1000',
    background: "#FFDFDF"
});

class Personal_info extends React.Component {

    constructor(props) {
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
            checked: false,
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
        if (this.state.editprofile) {
            fetch('http://127.0.0.1:3001/update_details', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    profilepic: this.state.imageURL,
                    year: this.state.year,
                    branch: this.state.branch,
                    description: this.state.description,
                    userid: this.state.enr_no
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        alert("Updated Successfully!")
                    }
                    else {
                        alert(data.data.message)
                    }
                })
                .catch(err => {
                    alert("Updation failed due to " + err)
                })
        }
        this.setState({ editprofile: !this.state.editprofile })
    }

    handleChange = () => {

    }
    logout = () => {
        const { history } = this.props;
        // this.props.loaduser({});
        history.push('/');
    }

    render() {

        return (
            <div className="dtc w-30 ba b--black-20 center bg-light-yellow tc h-100">

                <div className="dt w-100 bg-near-black">
                    <div className="dtc v-mid mid-gray w-25">
                        <p className="moon-gray v-mid pl4 tr f2-ns dib mt4"
                            style={{ fontFamily: 'Luckiest Guy' }}> WriteItOut </p>
                        <div className="fr dib tr v-mid f3 moon-gray pa3">
                            <img className="dib w2 v-mid h2 ma3 pointer" src={edit} onClick={this.onProfileEditToggle} alt="editprofile" />
                            <img className="dib w2 v-mid h2 ma3 pointer" src={signout} onClick={this.logout} alt="logout" />
                        </div>
                    </div>
                </div>

                <img src={this.state.imageURL ? this.state.imageURL : profile_image}
                    className="dib center w5 mv4 h5 br-100 pointer"
                    alt="profile pic" />

                {
                    this.state.editprofile === true &&
                    <input id="image_id"
                        className="v-mid f3 mv2 pa2" type="text"
                        placeholder="imagePath"
                        onChange={this.onImagePathChange}
                        value={this.state.imageURL} />
                }

                {
                    this.state.editprofile === false ?
                        <p className="v-mid f2 mv4"
                            style={{ fontFamily: 'Abril Fatface' }}> {this.state.name}, {this.state.enr_no} </p> :
                        <input id="name_id"
                            className="v-mid f3 mv2 pa2" type="text"
                            placeholder="name"
                            onChange={this.onNameChange}
                            value={this.state.name} />
                }

                {
                    this.state.editprofile === false ?
                        <p className="v-mid f3 mv4"
                            style={{ fontFamily: 'Abril Fatface' }}> {this.state.year} year, {this.state.branch} </p> :
                        <div>
                            <input id="year_id"
                                className="v-mid f3 mv2 pa2" type="number"
                                onChange={this.onYearChange}
                                placeholder="year"
                                value={this.state.year} />
                            <input id="branch_id"
                                className="v-mid f3 mv2 pa2" type="text"
                                placeholder="branch"
                                onChange={this.onBranchChange}
                                value={this.state.branch} />
                        </div>
                }

                {
                    this.state.editprofile === false ?
                        <p className="v-mid f3 mv4"
                            style={{ fontFamily: 'Abril Fatface' }}> {this.state.description} </p> :
                        <input id="description_id"
                            className="v-mid f3 mv2 pa2" type="text"
                            onChange={this.onDescriptionChange}
                            value={this.state.description} />
                }

                {
                    this.state.editprofile === true &&
                    <p className="v-mid f3 mid-gray"
                        style={{ fontFamily: 'Abril Fatface' }}>Enr. id: {this.state.enr_no} </p>
                }

                <p className="v-mid f3 mid-gray mt2 mb2"
                    style={{ fontFamily: 'Abril Fatface' }}> {this.state.email} </p>

                {
                    this.state.editprofile === true &&
                    <input className="input-reset tc white f6 b ttu mv2 w-50 pa3 pointer bg-black hover-bg-near-black bn br-pill"
                        value="Submit"
                        onClick={this.onProfileEditToggle}
                        type="submit" />
                }

            </div>
        );
    }
}

export default withRouter(Personal_info);
