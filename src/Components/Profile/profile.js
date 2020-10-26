import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Profile() {

    const [user, setuser] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/profile/${id}/`)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                setuser(data)
            })
    }, [id])

    return (
        <div>
            {user.name}
        </div>
    )
}