import React from 'react'
import styles from './QuestionHeading.module.css'

export default function QuestionHeading(props) {
    return (
        <div id={styles.container}>
            <h3>{props.questionHeading}</h3>
        </div>
    )
}