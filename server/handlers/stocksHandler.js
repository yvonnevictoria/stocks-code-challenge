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
        try {
            const { stockSymbol } = request.params;
            const stockPrice = await StocksService.getStockPrice({ stockSymbol });

            return h.response(stockPrice).code(200)
        } catch (err) {
            switch (err.message) {
                case 'NOT_FOUND':
                    return h.response('Stock symbol not found').code(404)
                default:
                    return h.response().code(500)
            }
        }
    }
};
