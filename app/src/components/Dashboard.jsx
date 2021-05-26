import React, { useState } from 'react';
import { Banner } from '../containers/Banner';
import { Portfolio } from '../containers/Portfolio';
import { Modal } from './Modal';
import { SellStockModal } from './SellStockModal';

import '../stylesheets/Dashboard.css';

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [sellStockModalOpen, setSellStockModalOpen] = useState(false);

    return (
        <div className="dashboard">
            <Banner setModalOpen={setModalOpen} />
            <Portfolio setModalOpen={setSellStockModalOpen} />
            <SellStockModal
                modalOpen={sellStockModalOpen}
                setModalOpen={setSellStockModalOpen}
                existingStocks={15}
                handleConfirm={() => {}}
                stockCompany={"Amazon"}
            />
            <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
                <p> test</p>
            </Modal>
        </div>
    );
};

export {
    Dashboard
};
