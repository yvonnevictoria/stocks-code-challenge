import '../stylesheets/Modal.css';

const Modal = ({
    handleClose,
    open,
    title,
    message,
    confirmText,
    inputName,
    inputLabel,
    inputValue,
    amountLabel,
    amountRemaining,
    onValueChange,
    handleConfirm
 }) => {

    return (
        <div className={`modal ${open ? 'open' : 'closed' }`}>
            <div className="modal-container">
                <button className="close-modal" type="button" onClick={handleClose}>
                    X
                </button>
                <span className="modal-header">{title}</span>
                <span className="modal-message">{message}</span>
                <div className="modal-input">
                    <label htmlFor={inputName}>{ inputLabel }</label>
                    <input
                        type="text"
                        id={inputName}
                        name={inputName}
                        className="control-input"
                        value={inputValue}
                        onChange={onValueChange}
                    />
                </div>

                <div className="remaining-amount">
                    <span className="remaining-amount-message">Remaining {amountLabel}</span>
                    <span>{amountRemaining}</span>
                </div>

                <div className="modal-buttons">
                    <button className="secondary cancel-button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="primary" onClick={handleConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export {
    Modal
};
