import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/user.context'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserAuth = ({ children }) => {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();


    useEffect(() => {

        if (user) {
            setLoading(false)
        }

        if (!token) {
            navigate('/login');
        }

        if (!user) {
            navigate('/login');
        }

    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserAuth