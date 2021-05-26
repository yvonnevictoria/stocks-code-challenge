import React, { useEffect, useState } from 'react';
import '../stylesheets/Banner.css';

const Banner = ({ getBalance, balance, isLoading, isError, setModalOpen }) => {
    useEffect(() => {
        // TODO YVO: If balance is 0??
        if (!balance) { getBalance(); }
    }, []);

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (isError) {
        return <p>Something went wrong</p>;
    }


    return (
        <div className="banner-container">
            <div className="banner">
                <span className="greeting">Good morning Yvonne, your cash balance is:</span>
                <span className="cash-balance">${balance}</span>
                <button className="edit-balance primary" onClick={() => setModalOpen(true)}>
                    Edit cash balance
                </button>
            </div>
        </div>
    );
};

export {
    Banner
};
