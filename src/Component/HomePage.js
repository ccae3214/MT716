import React, { useState } from 'react';

const HomePage = (props) => {
    const [date] = useState(new Date().toLocaleDateString());
    const [notifys, setNotifys] = useState([]);
    const [show, setShow] = useState(false);
    const [notify, setNotify] = useState({});
    const [user, setUser] = useState({ name: "RYAN", password: "qaz3214" });

    const handleOnChange = (event) => {
        const { id, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    };

    const uniKeyCode = (event) => {
        const key = event.keyCode;
        if (key === 13) {
            login();
        }
    };

    return (
        <div className="text-center">
            <h1>YOU have no auth to use this Page</h1>
            <h2>Try login another account or comfirm with MT</h2>
        </div>
    );
};

export default HomePage;
