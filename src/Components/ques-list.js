import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

export function QuestionsList() {
    const columns = [{
        dataField: 'ques',
        text: 'Questions'
    }]
    const testquestions = [{
        ques : 'how are you??'
    },
    {
        ques : 'what are you??'
    },
    {
        ques : 'who are you??'
    },
    {
        ques : 'where are you??'
    },
    {
        ques : 'how are you1??'
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
                    { ...props.baseProps }
                    />
                </div>
                )
            }
            </ToolkitProvider>
        </div>
    )
}