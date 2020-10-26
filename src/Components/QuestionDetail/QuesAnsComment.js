import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './QuesAnsComment.module.css'

import QuestionHeading from './QuestionHeading/QuestionHeading'
import Answer from './Answer/Answer'

export default function QuesAnsComment(props) {
    const { id } = useParams()

    const [data, setData] = useState(null)

    useEffect(() => {
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
        <div id={styles.container}>
            {data && <QuestionHeading questionHeading={data.que} />}
            {data && data.answers.map(answer => {
                return <Answer
                    ansid={answer.ansid}
                    userid={props.data.userid}
                    body={answer.ans}
                    datetime={answer.datetime}
                    upvotes={answer.upvotes}
                    comments={answer.comments}
                />
            })}
        </div>
    )
}