import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useHistory } from 'react-router-dom';
const { SearchBar } = Search;

export function QuestionsList() {
    let history = useHistory();
    const columns = [{
        dataField: 'ques',
        text: 'Questions'
    }]

    const rowEvents = {
        onClick : (e, row ,index) => {
            history.push(`/question/${row.id}`)
        }
    }

    const testquestions = [{
        ques : 'how are you??',
        id : 1
    },
    {
        ques : 'what are you??',
        id : 2
    },
    {
        ques : 'who are you??',
        id : 3
    },
    {
        ques : 'where are you??',
        id : 3
    },
    {
        ques : 'how are you1??',
        id : 4
    }]
    const [questions, setquestions] = useState(testquestions)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/questions/')
        .then(resp => resp.json())
        .then(( data ) => {
            setquestions(data.qlist)
        })
    }, [])

    return (
        <div>
            <ToolkitProvider
            keyField='ques'
            data={ questions }
            columns={ columns }
            search
            >
            {
                props => (
                <div>
                    <SearchBar { ...props.searchProps } />
                    <BootstrapTable
                    rowEvents={ rowEvents }
                    { ...props.baseProps }
                    />
                </div>
                )
            }
            </ToolkitProvider>
        </div>
    )
}