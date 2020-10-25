import React from 'react'
import styles from './Comment.module.css'
import Profile from '../Signin/chico.png';

export default function Comment() {
    return (
        <div id={styles.container}>
            <div id={styles.profile}>
                <img src={Profile} id={styles.photo} />
                <div id={styles.bio}>
                    <h5>FirstName LastName</h5>
                    <p>This is the bio</p>
                </div>
            </div>
            <div id={styles.datetime}>Answered 2020-10-21T17:48:54.921Z</div>
            <div id={styles.comment}>
                This is a comment This is a comment This is a comment This is a comment This is a comment
            </div>
        </div>
    )
}