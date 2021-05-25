'use strict';


/**
 * @module
 */

 const portfolio = {
    GOOG: 1,
    SPOT: 10
 };

/**
 * @classdesc Retrieves and updates information about user's stock portfolio.
 * @hideconstructor
 */
class PortfolioService {

    /**
     * Gets the user's portfolio.
     *
     * @returns {Object} The user's portfolio.
     */
    static async getPortfolio() {
        return portfolio;
    }

    /**
     * Gets the user's portfolio.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.stockSymbol - The stockSymbol of the stocks purchased.
     * @returns {Number} The stock amount for specified symbol.
     */
    static async getCurrentStockAmount({ stockSymbol }) {
        return portfolio[stockSymbol] || 0;
    }

    /**
     * Adds purchased stock to the user's portfolio.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.amount - The amount of stocks purchased.
     * @param {String} obj.stockSymbol - The stockSymbol of the stocks purchased.
     * @returns {String} The updated portfolio.
     */
    static async addToPortfolio({ stockSymbol, amount }) {
        const existingStocks = portfolio[stockSymbol] ? portfolio[stockSymbol] : 0;

        portfolio[stockSymbol] = amount + existingStocks;
        return portfolio;
    }

    /**
     * Remove sold stock from user's porfolio.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.removedStocks - The amount of stocks sold.
     * @param {String} obj.stockSymbol - The stockSymbol of the stocks sold.
     * @returns {String} The updated portfolio.
     */
    static async removeFromPortfolio({ stockSymbol, removedStocks }) {
        const existingStocks = portfolio[stockSymbol];

        if (existingStocks < removedStocks) {
            throw new Error('INSUFFICIENT_BALANCE');
        }

        removedStocks === existingStocks
        ? delete portfolio[stockSymbol]
        : portfolio[stockSymbol] = existingStocks - removedStocks

        return portfolio;
    }

    /**
     * FOR TESTING PURPOSES ONLY (See documentation for explanation)
     * Sets portfolio manually
     *
     * @returns {Object} portfolio - The reset portfolio.
     */
    static async resetPortfolio() {
        portfolio['GOOG'] = 1;
        portfolio['SPOT'] = 10;
        return portfolio;
    }
}

module.exports = { PortfolioService };
