'use strict';

/**
 * @module
 */

 const balance = {
     currentAmount: 7432
 };

/**
 * @classdesc Retrieves and updates information about user's cash balance.
 * @hideconstructor
 */
class BalanceService {

    /**
     * Gets the user's cash balance.
     *
     * @returns {String} The cash balance for the user.
     */
    static async getBalance() {
        return balance.currentAmount;
    }

    /**
     * Adds to the user's cash balance.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.amount - The amount to be added to the cash balance.
     * @returns {String} The updated cash balance for the user.
     */
    static async addToBalance({ amount }) {
        balance.currentAmount = balance.currentAmount + amount;
        return balance.currentAmount;
    }

    /**
     * Deduct from the user's cash balance.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.amount - The amount to be deducted from the cash balance.
     * @throws {Error} 'INSUFFICIENT_BALANCE' if there is not enough money to be deducted.
     * @returns {String} The updated cash balance for the user.
     */
    static async deductFromBalance({ amount }) {
        if (balance.currentAmount >= amount) {
            balance.currentAmount = balance.currentAmount - amount;
            return balance.currentAmount;
        }

        throw new Error('INSUFFICIENT_BALANCE');
    }

    /**
     * FOR TESTING PURPOSES ONLY (See documentation for explanation)
     * Sets balance manually
     *
     * @returns {String} The updated cash balance for the user.
     */
    static async resetBalance() {
        balance.currentAmount = 7432;
        return balance.currentAmount;
    }
}

module.exports = { BalanceService };
