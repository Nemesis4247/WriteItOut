import React from 'react'
import styles from './QuestionHeading.module.css'

export default function QuestionHeading(props) {
    return (
        <div id={styles.container}>
            <h1>{props.questionHeading}</h1>
        </div>
    )
}