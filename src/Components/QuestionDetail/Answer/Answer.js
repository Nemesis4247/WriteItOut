import React, { useEffect, useState } from 'react';
import styles from './Answer.module.css'
import Profile from '../../Signin/chico.png';
import Comment from '../Comment/Comment'
import Like from '../../MainScreen/Questions/like.png'
import Liked from '../../MainScreen/Questions/liked.png'

export default function Answer(props) {
    const [liked, setLiked] = useState(false)
    const [likedIcon, setLikedIcon] = useState(Like)
    const [commentText, setCommentText] = useState('')

    useEffect(() => {
        if (liked) {
            setLikedIcon(Liked)
        }
        else {
            setLikedIcon(Like)
        }
    }, [liked])

    function handleLike() {
        setLiked(!liked)
        fetch('http://127.0.0.1:3001/likeUnlikeAnswer/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                userid: props.userid,
                ansid: props.ansid,
                like: liked ? 1 : 0
            }
        })
            .then(response => {
                if (!response.ok) setLiked(!liked)
            })
    }

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
                    <h4>{props.name}</h4>
                    <p>{props.bio}</p>
                </div>
            </div>
            <div id={styles.datetime}>Answered {props.datetime}</div>
            <div id={styles.body}>
                {props.body}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img
                    height='30px'
                    src={likedIcon}
                    onClick={handleLike}
                />
                <p style={{ marginLeft: '5px' }}>{props.upvotes} upvotes</p>
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
                    profilepic={comment.profilepic}
                    name={comment.name}
                    bio={comment.description}
                    body={comment.comment}
                    datetime={comment.datetime}
                />
            })}
        </div>
    )
}