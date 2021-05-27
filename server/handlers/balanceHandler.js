'use strict';

const { BalanceService } = require('../services/balanceService');

/**
 * @module
 */

module.exports = {
    /**
     * Gets cash balance for user.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Response with the cash balance.
     */
    getBalance: async (request, h) => {
        return await BalanceService.getBalance();
    },

    /**
     * Adds specified amount to user's cash balance.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Response with the updated cash balance.
     */
    addToBalance: async (request, h) => {
        let { amount } = request.payload;

        // This is not ideal.  Ususally I'd use Joi to validate param
        // types but due to time constraints a manual check will have to do.
        if (typeof amount === "string") { amount = Number(amount); }
        const updatedBalance = await BalanceService.addToBalance({ amount });

        return h.response(updatedBalance).code(200)
    },

    /**
     *  Deducts specified amount to user's cash balance.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @throws {Error} INSUFFICIENT_BALANCE - If amount to be deducted is higher than available balance.
     * @throws {Error} If an unknown error occurred.
     * @returns {Response} Response with the updated cash balance.
     */
    deductFromBalance: async (request, h) => {
        try {
            let { amount } = request.payload;

            // This is not ideal.  Ususally I'd use Joi to validate param
            // types but due to time constraints a manual check will have to do.
            if (typeof amount === "string") { amount = Number(amount); }
            const updatedBalance = await BalanceService.deductFromBalance({ amount });
            return h.response(updatedBalance).code(200)
        } catch (err) {
            switch (err.message) {
                case 'INSUFFICIENT_BALANCE':
                    return h.response('Insufficient funds').code(409)
                default:
                    return h.response().code(500)
            }
        }
    }
};
