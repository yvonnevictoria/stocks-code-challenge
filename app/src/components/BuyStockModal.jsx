import React, { useState } from 'react';

import '../stylesheets/Modal.css';

const BuyStockModal = ({ handleClose, handleConfirm, modalOpen: open }) => {
    const [stocksToBuy, setStocksToBuy] = useState({ company: '', amount: '0' });

    return (
        <div className={`modal ${open ? 'open' : 'closed' }`}>
            <div className="modal-container">
                <button className="close-modal" type="button" onClick={handleClose}>
                    X
                </button>
                <span className="modal-header">Buy stocks</span>
                <span className="modal-message">Please enter the following information</span>
                <div className="modal-input">
                    <label htmlFor="stock-company">Stock company</label>
                    <input
                        type="text"
                        id="stock-company"
                        name="stock-company"
                        className="control-input"
                        value={stocksToBuy.company}
                        onChange={({ target: { value } }) => setStocksToBuy({ ...stocksToBuy, company: value.toUpperCase() })}
                    />
                </div>

                <div className="modal-input">
                    <label htmlFor="stock-amount">Amount</label>
                    <input
                        type="text"
                        id="stock-amount"
                        name="stock-amount"
                        className="control-input"
                        value={stocksToBuy.amount}
                        onChange={({ target: { value } }) => setStocksToBuy({ ...stocksToBuy, amount: value })}
                    />
                </div>

                <div className="modal-buttons">
                    <button className="secondary cancel-button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="primary" onClick={() => { handleConfirm({ stockSymbol: stocksToBuy.company, amount: stocksToBuy.amount }); handleClose(); }}>
                        Yes, buy stocks
                    </button>
                </div>
            </div>
        </div>
    );
};

export {
    BuyStockModal
};
