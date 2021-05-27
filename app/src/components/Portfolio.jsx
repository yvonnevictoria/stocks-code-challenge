import React, { Fragment, useEffect, useState } from 'react';
import { SellStockModal } from './SellStockModal';
import { BuyStockModal } from './BuyStockModal';

import '../stylesheets/Portfolio.css';

const Portfolio = ({ portfolio, getPortfolio, isLoading, isError, sellStock, purchaseStock }) => {
    const [buyStockModalOpen, setBuyStockModalOpen] = useState(false);
    const [sellStockModalOpen, setSellStockModalOpen] = useState(false);
    // Usually, I'd create a sellStockModal obj and set the state as { open: true, company: 'GOOG', amount: '1000' }
    // However, this doesn't work with the prop setup I have for the reusable modal. Choosing to
    // store the state temporarily and rewrite it on modal open to save time.
    const [stockCompany, setStockCompany] = useState('');
    const [existingStocks, setExistingStocks] = useState(0);

    useEffect(() => {
        if (!portfolio.length) { getPortfolio(); }
    }, []);

    const sellStockInit = ({ symbol, amount }) => {
        setStockCompany(symbol);
        setExistingStocks(amount);
        setSellStockModalOpen(true);
    };

    const buyStock = ({ symbol, amount }) => {
        setStockCompany(symbol);
        setExistingStocks(amount);
        setSellStockModalOpen(true);
    };

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (isError) {
        return <p>Something went wrong</p>;
    }

    return (
        <Fragment>
            <div className="portfolio-container">
                <div className="flex-row">
                    <span>Portfolio</span>
                    <button className="buy-stocks secondary" type="button" onClick={() => setBuyStockModalOpen(true)}>
                        Buy stocks
                    </button>
                </div>
                <table className="portfolio-table">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Amount (#)</th>
                            <th>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Object.entries(portfolio).map(([key,value], i) => (
                            <tr key={i}>
                                <td className="stock-name">
                                    { key }
                                </td>
                                <td>
                                    { value }
                                </td>
                                <td>
                                    <button className="sell-stocks secondary" type="button" onClick={() => sellStockInit({ symbol: key, amount: value })}>
                                        Sell stock
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                {
                    sellStockModalOpen && (
                        <SellStockModal
                            modalOpen={sellStockModalOpen}
                            setModalOpen={setSellStockModalOpen}
                            existingStocks={existingStocks}
                            handleConfirm={sellStock}
                            stockCompany={stockCompany}
                        />
                    )
                }

                {
                    buyStockModalOpen && (
                        <BuyStockModal
                            modalOpen={buyStockModalOpen}
                            handleClose={() => setBuyStockModalOpen(false)}
                            handleConfirm={purchaseStock}
                        />
                    )
                }
            </div>
        </Fragment>
    );
};

export {
    Portfolio
};
