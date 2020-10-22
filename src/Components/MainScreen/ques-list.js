import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useHistory } from 'react-router-dom';
const { SearchBar } = Search;

export function QuestionsList() {
    let history = useHistory();
    const columns = [{
        dataField: 'que'
    }]

    const rowEvents = {
        onClick: (e, row, index) => {
            history.push(`/question/${row.queid}`)
        }
    }

    const testquestions = [{
        que: 'No posts yet. Stay tuned !!',
        queid: -1
    }]
    const [questions, setquestions] = useState(testquestions)

    useEffect(() => {
        fetch('http://127.0.0.1:3001/get-questionList/')
            .then(resp => resp.json())
            .then((data) => {
                setquestions(data)
                console.log(data)
            })
    }, [])

    return (
        <div>
            <ToolkitProvider
                keyField='que'
                data={questions}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <SearchBar
                                {...props.searchProps}
                                style={{ width: '100%', height: '50px', padding: '10px' }}
                                placeholder="Search Question"
                            />
                            <BootstrapTable
                                rowEvents={rowEvents}
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}