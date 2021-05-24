import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Stocks = () => {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const getMessage = () => {
        axios.get('http://localhost:4000/')
            .then(function (response) {
                const { data } = response;
               setMessage(data);
            })
            .catch(function (error) {
              console.log(error);
              setErrors(error);
            });
    };

    useEffect(() => {
        getMessage();
    }, []);

    return (
        <Fragment>
            <p>{message}</p>
            { !!errors.length && `${errors}` }
        </Fragment>
    );
};

export {
    Stocks
};
