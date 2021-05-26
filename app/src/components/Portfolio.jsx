import React, { useEffect } from 'react';
import '../stylesheets/Portfolio.css';

const Portfolio = ({ portfolio, getPortfolio, isLoading, isError, setModalOpen }) => {
    useEffect(() => {
        if (!portfolio.length) { getPortfolio(); }
    }, []);

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (isError) {
        return <p>Something went wrong</p>;
    }

    return (
        <div className="portfolio-container">
            <div className="flex-row">
                <span>Portfolio</span>
                <button className="buy-stocks secondary" type="button" onClick={() => setModalOpen(true)}>
                    Buy stocks
                </button>
            </div>
            <table className="portfolio-table">
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Value ($)</th>
                        <th>Amount (#)</th>
                        <th>Action</th>
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
                                1000
                            </td>
                            <td>
                                { value }
                            </td>
                            <td>
                                <button className="sell-stocks secondary" type="button" onClick={() => setModalOpen(true)}>
                                    Sell stock
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export {
    Portfolio
};
