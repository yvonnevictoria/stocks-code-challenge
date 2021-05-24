'use strict';

const { API_KEY } = require('../env.json');

/**
 * @module
 */

const url = (query) => {
    // TODO YVO: make this a function for url helper (private)
    return 'www.this.com';
};

/**
 * @classdesc Retrieves information about stocks.
 * @hideconstructor
 */
class StocksService {

    /**
     * Gets the stock price for the supplied stock symbol.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.stockSymbol - The id of the stock which will have it's price retrieved.
     * @throws {Error} 'STOCK_DOES_NOT_EXIST' if the stock symbol does not exist.
     * @returns {String} The stock price for the supplied stock symbol.
     */
    static async getStockPrice({ stockSymbol }) {
        return 4;
    }
}

module.exports = { StocksService };
