import React from 'react'
import styles from './Comment.module.css'
import Profile from '../../Signin/chico.png';

export default function Comment(props) {
    const profilepic = props.profilepic ? props.profilepic : Profile

    return (
        <div id={styles.container}>
            <div id={styles.profile}>
                <img src={profilepic} id={styles.photo} />
                <div id={styles.bio}>
                    <h4>{props.name}</h4>
                    <p>{props.bio}</p>
                </div>
            </div>
            <div id={styles.datetime}>Commented {props.datetime}</div>
            <div id={styles.comment}>
                {props.body}
            </div>
        </div>
    )
}