import React, { useEffect, useState } from 'react';
import { AddCashModal } from './AddCashModal';
import { DeductCashModal } from './DeductCashModal';

import '../stylesheets/Banner.css';

const Banner = ({ getBalance, balance, isLoading, isError, addToBalance, deductFromBalance }) => {
    const [addCashModalOpen, setAddCashModalOpen] = useState(false);
    const [deductCashModalOpen, setDeductCashModalOpen] = useState(false);

    useEffect(() => {
        if (balance === null) { getBalance(); }
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
                <div className="flex-box">
                    <button className="edit-balance primary" onClick={() => setAddCashModalOpen(true)}>
                        Add to balance
                    </button>
                    <button className="edit-balance primary" onClick={() => setDeductCashModalOpen(true)}>
                        Deduct from balance
                    </button>
                </div>
            </div>

            {
                addCashModalOpen && (
                    <AddCashModal
                        modalOpen={addCashModalOpen}
                        setModalOpen={setAddCashModalOpen}
                        cashBalance={balance}
                        handleConfirm={addToBalance}
                    />
                )
            }
            {
                deductCashModalOpen && (
                    <DeductCashModal
                        modalOpen={deductCashModalOpen}
                        setModalOpen={setDeductCashModalOpen}
                        cashBalance={balance}
                        handleConfirm={deductFromBalance}
                    />
                )
            }
        </div>
    );
};

export {
    Banner
};
