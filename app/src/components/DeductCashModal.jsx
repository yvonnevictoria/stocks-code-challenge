import React, { useState } from 'react';
import { Modal } from './Modal';

import '../stylesheets/Modal.css';

const DeductCashModal = ({ modalOpen, setModalOpen, cashBalance, handleConfirm }) => {
    const [cash, setCash] = useState(cashBalance);
    return (
        <Modal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            title={`Deduct from cash balance`}
            message="Please enter how much you would like to deduct from your cash balance"
            confirmText="Yes, update balance"
            inputName = "deduct-update-balance"
            inputLabel = "Amount to deduct"
            inputValue = {cash}
            amountLabel = "Updated balance"
            amountRemaining = {parseInt(cashBalance) - parseInt(cash)}
            onValueChange={({ target: { value } }) => setCash(value)}
            handleConfirm = {() => { handleConfirm({ amount: cash });  setModalOpen(false); } }
        />
    );
};

export {
    DeductCashModal
};
