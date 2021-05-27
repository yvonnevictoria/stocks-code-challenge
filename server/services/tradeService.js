'use strict';

const { StocksService } = require('./stocksService');
const { BalanceService } = require('./balanceService');
const { PortfolioService } = require('./portfolioService');


/**
 * @module
 */

/**
 * @classdesc Supports buying and selling stocks.
 * @hideconstructor
 */
class TradeService {
    /**
     * Purchase stock, deduct from cash balance and add to portfolio.
     *
     * @param {String} stockSymbol - The stockSymbol for the stocks to be purchased
     * @param {String} amount - The amount of stocks to be purchased
     * @returns {Object} The user's updated portfolio and cash balance.
     */
    static async purchaseStock({ stockSymbol, amount }) {
        let balance;
        let stockPrice;

        try {
            [balance, stockPrice] = await Promise.all([
                BalanceService.getBalance(),
                StocksService.getStockPrice({ stockSymbol })
            ]);
        } catch (err) {
            switch (err.message) {
                case 'NOT_FOUND':
                    throw new Error('NOT_FOUND');
                default:
                    throw new Error('UNKNOWN');
            }
        }

        const purchasePrice = stockPrice * amount;

        if (balance < purchasePrice) {
            throw new Error('INSUFFICIENT_BALANCE');
        }

        const [updatedBalance, portfolio] = await Promise.all([
            BalanceService.deductFromBalance({ amount: purchasePrice }),
            PortfolioService.addToPortfolio({ stockSymbol, amount })
        ]);

        return { updatedBalance, portfolio };
    }

    /**
     * Sell stock, add to cash balance and remove from portfolio.
     *
     * @param {String} stockSymbol - The stockSymbol for the stocks to be sold
     * @param {String} amountToSell - The amount of stocks to be sold
     * @returns {Object} The user's updated portfolio and cash balance.
     */
    static async sellStock({ stockSymbol, amountToSell }) {
        let stockAmount;
        let stockPrice;
        let updatedBalance;
        let portfolio;

        try {
            [stockAmount, stockPrice] = await Promise.all([
                PortfolioService.getCurrentStockAmount({ stockSymbol }),
                StocksService.getStockPrice({ stockSymbol })
            ]);
        } catch (err) {
            switch (err.message) {
                case 'NOT_FOUND':
                    throw new Error('NOT_FOUND');
                default:
                    throw new Error('UNKNOWN');
            }
        }
        const sellingPrice = stockPrice * stockAmount;

        if ( amountToSell > stockAmount) {
            throw new Error('INSUFFICIENT_BALANCE');
        }

        try {
            [updatedBalance, portfolio] = await Promise.all([
                BalanceService.addToBalance({ amount: sellingPrice }),
                PortfolioService.removeFromPortfolio({ stockSymbol, removedStocks: amountToSell })
            ]);
        } catch (err) {
            switch (err.message) {
                case 'INSUFFICIENT_BALANCE':
                    throw new Error('INSUFFICIENT_BALANCE');
                default:
                    throw new Error('UNKNOWN');
            }
        }

        return { updatedBalance, portfolio };
    }
}

module.exports = { TradeService };
