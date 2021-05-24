'use strict';

const { StocksService } = require('../services/stocksService');

/**
 * @module
 */

module.exports = {
    /**
     *  Gets stock price for specified stock symbol.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @returns {Response} Response with the stock price.
     */
    getStockPrice: async (request, h) => {
        // TODO YVO: Add error handling
        const { stockSymbol } = request.params;
        return StocksService.getStockPrice({ stockSymbol });
    }
};
