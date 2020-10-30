import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './QuesAnsComment.module.css';
import Personal_info from '../utils/personal_info';
import Radium, { StyleRoot } from 'radium';
import { zoomIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import profile_image from '../Signin/profile.svg';
import Profile from '../Signin/chico.png';

import QuestionHeading from './QuestionHeading/QuestionHeading'
import Answer from './Answer/Answer'

const Styles = {
    zoomIn: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    },
    fadeOut: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(fadeOut, 'fadeOut')
    }
}


export default function QuesAnsComment(props) {
    const { id } = useParams()

    const [data, setData] = useState(null)
    const [answer, setAnswer] = useState('')
    const [answers, setAnswers] = useState([])

    function addAnswer() {
        if (answer) fetch('http://127.0.0.1:3001/answer', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ans: answer,
                queid: id,
                userid: props.data.user.userid
            })
        })
            .then(response => {
                if (response.ok) {
                    setAnswers([...answers, {
                        name: props.data.user.name,
                        bio: props.data.user.description,
                        body: answer,
                        datetime: 'just now',
                        upvotes: 0,
                        comments: []
                    }])
                    setAnswer('')
                }
                else alert('Error!')
            })
    }

    useEffect(() => {
        console.log("props :", props.data.user.userid)
        const fetcher = () => {
            fetch(`http://127.0.0.1:3001/get-question/${id}/`)
                .then(response => response.json())
                .then(json => {
                    setData(json)
                })
        }
        fetcher()
    }, [id])

    return (
        <StyleRoot>
            <div className="dt w-100 h-100 vh-100">
                <Personal_info data={props.data.user} />
                <div className="dtc w-70 bg-near-white v-top h-100" style={Styles.zoomIn}>
                    <div id={styles.container}>
                        {data && <QuestionHeading questionHeading={data.que} />}
                        <div id={styles.answer}>
                            <img src={Profile} id={styles.answerPhoto} />
                            <textarea
                                id={styles.answerBox}
                                placeholder='Add an anwser...'
                                onChange={e => {
                                    setAnswer(e.target.value)
                                    e.target.style.height = 'inherit'
                                    e.target.style.height = e.target.scrollHeight + 'px'
                                }}
                                value={answer}
                            />
                            <button
                                id={styles.addAnswer}
                                onClick={addAnswer}
                            >
                                Add answer
                            </button>
                        </div>
                        {data && data.answers.map(answer => {
                            return <Answer
                                ansid={answer.ansid}
                                userid={props.data.userid}
                                name={answer.name}
                                bio={answer.description}
                                body={answer.ans}
                                datetime={answer.datetime}
                                upvotes={answer.upvotes}
                                comments={answer.comments}
                            />
                        })}
                        {answers.map(answer => {
                            return <Answer
                                {...answer}
                            />
                        })}
                    </div>
                </div>
            </div>
        </StyleRoot>
    )
}
