import React, { useState } from 'react';
import { Modal } from './Modal';

import '../stylesheets/Modal.css';

const SellStockModal = ({ modalOpen, setModalOpen, existingStocks, handleConfirm, stockCompany }) => {
    const [stocksToSell, setStocksToSell] = useState(existingStocks);
    return (
        <Modal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            title={`Sell ${stockCompany} stock`}
            message="Please enter how many you would like to sell"
            confirmText="Yes, sell stocks"
            inputName = "sell-stock"
            inputLabel = "Amount to sell"
            inputValue = {stocksToSell}
            amountLabel = "Remaining amount"
            amountRemaining = {existingStocks - stocksToSell}
            onValueChange={({ target: { value } }) => setStocksToSell(value)}
            handleConfirm = {() => { handleConfirm({ stockSymbol: stockCompany, amount: stocksToSell }); setModalOpen(false); }}
        />
    );
};

export {
    SellStockModal
};
