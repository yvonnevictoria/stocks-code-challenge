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
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_KEY}`;
};

/**
 * Handles response errors.
 *
 * @private
 * @param {Object} obj - The arguments object.
 * @param {Response} obj.response - The response object returned by a fetch request.
 */
const handleHttpErrors = ({ err }) => {
    switch (err.code) {
        case 401:
            throw new Error('UNAUTHORIZED');
        case 403:
            throw new Error('FORBIDDEN');
        case 404:
            throw new Error('NOT_FOUND');
        case 500:
        default:
            throw new Error('UNKNOWN');
    }
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
        try {
            const targetUrl = url({ stockSymbol });
            // Not destructuring data here in case unexpected structure returned
            const response = await axios.get(targetUrl);

            // Destructure object to pull out date last refreshed
            const { "Meta Data": { '3. Last Refreshed': dateRefreshed } } = response.data;

            // Use last refreshed date to find the latest stock price
            const { "Time Series (Daily)": { [dateRefreshed]: { "4. close": stockPrice } } } = response.data;
            return Number(stockPrice);

        } catch (error) {
            console.log(error);

            // API uses strings instead of codes to return errors.
            // Think about this and come back tomorrow
            throw new Error();
        }
    }
}

module.exports = { StocksService };
