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
        try {
            return await BalanceService.getBalance();
        } catch (err) {
            return h.response().code(500)
        }
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
        try {
            let { amount } = request.payload;

            // TODO YVO: This is not ideal. Update before submitting.
            if (typeof amount === "string") { amount = Number(amount); }
            const updatedBalance = await BalanceService.addToBalance({ amount });

            return h.response(updatedBalance).code(200)
        } catch (err) {
            return h.response().code(500)
        }
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

            // TODO YVO: This is not ideal. Update before submitting.
            if (typeof amount === "string") { amount = Number(amount); }
            const updatedBalance = await BalanceService.deductFromBalance({ amount });

            return h.response(updatedBalance).code(200)
        } catch (err) {
            switch (err.message) {
                case 'INSUFFICIENT_BALANCE':
                    return h.response('Insufficient funds').code(400)
                default:
                    return h.response().code(500)
            }
        }
    }
};
