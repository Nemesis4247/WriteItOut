import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Personal_info from '../utils/personal_info';
import Radium, { StyleRoot } from 'radium';
import { zoomIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import profile_image from '../Signin/profile.svg';

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

export function Profile({ data }) {

    const [user, setuser] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/profile/${id}/`)
            .then(resp => resp.json())
            .then((resp) => {
                console.log(resp)
                setuser(resp)
            })
    }, [id])

    // const pinfo = user.userid ? <Personal_info data={user} /> : null

    return (
        <StyleRoot>
            <div className="dt w-100 h-100 vh-100" style={styles.zoomIn}>
                <Personal_info data={data.user} />
                <div className="dtc w-70 bg-near-white v-top h-100" >
                    <div className="w-100 ba b--black-20 center bg-light-yellow tc h-100">

                        <img src={user.imageURL ? user.imageURL : profile_image}
                            className="dib center w5 mv4 h5 br-100 pointer"
                            alt="profile pic" />

                        <p className="v-mid f2"
                            style={{ fontFamily: 'Concert One' }}> {user.name}, {user.enr_no} </p>

                        <p className="v-mid f3"
                            style={{ fontFamily: 'Concert One' }}> {user.year} year, {user.branch} </p>

                        <p className="v-mid f3"
                            style={{ fontFamily: 'Concert One' }}> {user.description} </p>

                        <p className="v-mid f3 mid-gray"
                            style={{ fontFamily: 'Concert One' }}> {user.email} </p>

                    </div>

                </div>
            </div>
        </StyleRoot>
    )
}