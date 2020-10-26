import React, { useEffect, useState } from 'react';
import styles from './Answer.module.css'
import Profile from 'C:/Users/devji/Desktop/DBMS Project/WriteItOut/src/Components/Signin/chico.png'
import Comment from '../Comment/Comment'

export default function Answer(props) {
    const [liked, setLiked] = useState(false)
    const [upvoteBG, setUpvoteBG] = useState('white')
    const [upvoteTextColor, setUpvoteTextColor] = useState('black')
    const [commentText, setCommentText] = useState('')

    useEffect(() => {
        if (liked) {
            setUpvoteBG('deepskyblue')
            setUpvoteTextColor('white')
        }
        else {
            setUpvoteBG('white')
            setUpvoteTextColor('black')
        }
    }, [liked])

    function addComment() {
        fetch('http://127.0.0.1:3001/comment', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                comment: commentText,
                ansid: props.ansid,
                userid: props.userid
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('Comment added!')
                }
                else {
                    alert('Error')
                }
            })
    }

    return (
        <div id={styles.container}>
            <div id={styles.profile}>
                <img src={Profile} id={styles.photo} />
                <div id={styles.bio}>
                    <h5>FirstName LastName</h5>
                    <p>This is the bio</p>
                </div>
            </div>
            <div id={styles.datetime}>Answered {props.datetime}</div>
            <div id={styles.body}>
                {props.body}
            </div>
            <div>
                <button
                    id={styles.upvoteButton}
                    style={{
                        backgroundColor: upvoteBG,
                        color: upvoteTextColor,
                    }}
                    onClick={() => setLiked(!liked)}
                >
                    Upvote
                </button>
                {props.upvotes} upvotes
            </div>
            <div id={styles.comment}>
                <img src={Profile} id={styles.commenterPhoto} />
                <textarea
                    id={styles.commentBox}
                    placeholder='Add a comment...'
                    onChange={e => {
                        setCommentText(e.target.value)
                        e.target.style.height = 'inherit'
                        e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                    value={commentText}
                    onClick={addComment}
                />
                <button
                    id={styles.addComment}
                    onClick={() => { }}
                >
                    Add comment
                </button>
            </div>
            {props.comments.map(comment => {
                return <Comment
                    body={comment.comment}
                    datetime={comment.datetime}
                />
            })}
        </div>
    )
}