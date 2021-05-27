import React, { useState } from 'react';
import { Modal } from './Modal';

import '../stylesheets/Modal.css';

const AddCashModal = ({ modalOpen, setModalOpen, cashBalance, handleConfirm }) => {
    const [cash, setCash] = useState(cashBalance);
    return (
        <Modal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            title={`Add to cash balance`}
            message="Please enter how much you would like to add to your cash balance"
            confirmText="Yes, update balance"
            inputName = "add-update-balance"
            inputLabel = "Amount to add"
            inputValue = {cash}
            amountLabel = "Updated balance"
            amountRemaining = {parseInt(cashBalance) + parseInt(cash)}
            onValueChange={({ target: { value } }) => setCash(value)}
            handleConfirm = {() => { handleConfirm({ amount: cash });  setModalOpen(false); } }
        />
    );
};

export {
    AddCashModal
};
