'use strict';

const { TradeService } = require('../services/tradeService');

/**
 * @module
 */

module.exports = {
    /**
     *  Purchased specified amount of stocks.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} INSUFFICIENT_BALANCE - If cash balance is too low.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Response with the updated cash balance and portfolio.
     */
    purchaseStock: async (request, h) => {
        try {
            let { stockSymbol, amount } = request.payload;

            // This is not ideal. Ususally I'd use Joi to validate param
            // types but due to time constraints a manual check will have to do.
            if (typeof amount === "string") { amount = Number(amount); }
            const updatedItems = await TradeService.purchaseStock({ stockSymbol, amount });

            return h.response(updatedItems).code(200)
        } catch (err) {
            switch (err.message) {
                case 'INSUFFICIENT_BALANCE':
                    return h.response('Insufficient balance').code(409)
                default:
                    return h.response().code(500)
            }
        }
    },
    /**
     *  Purchased specified amount of stocks.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} INSUFFICIENT_BALANCE - If existing stock balance is too low.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Response with the updated cash balance and portfolio.
     */
    sellStock: async (request, h) => {
        try {
            let { stockSymbol, amount: amountToSell } = request.payload;

            // This is not ideal. Ususally I'd use Joi to validate param
            // types but due to time constraints a manual check will have to do.
            if (typeof amountToSell === "string") { amountToSell = Number(amountToSell); }
            const updatedItems = await TradeService.sellStock({ stockSymbol, amountToSell });

            return h.response(updatedItems).code(200)
        } catch (err) {
            console.log(err);

            switch (err.message) {
                case 'INSUFFICIENT_BALANCE':
                    return h.response('Insufficient stocks').code(409)
                default:
                    return h.response().code(500)
            }
        }
    },
};
