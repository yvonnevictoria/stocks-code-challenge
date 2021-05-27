'use strict';

const { API_KEY } = require('../env.json');
const axios = require('axios')

/**
 * @module
 */


 /**
  * Helper to build API url.
  *
  * @private
  * @param {Object} obj - The arguments object.
  * @param {Response} obj.response - The response object returned by a fetch request.
  * @param {String} obj.stockSymbol - The specified stock symbol.
  */
const url = ({ stockSymbol }) => {
    return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`;
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
        const targetUrl = url({ stockSymbol });
        const { data } = await axios.get(targetUrl);

        const { "Global Quote": { "05. price": stockPrice } } = data;

        if (stockPrice == null) {
            throw new Error('NOT_FOUND');
        }

        return Number(stockPrice);
    }
}

module.exports = { StocksService };
