'use strict';

/**
 * @module
 */

 const store = {
     balance: 7432
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
        return store.balance;
    }

    /**
     * Adds to the user's cash balance.
     *
     * @param {Object} obj - The arguments object.
     * @param {String} obj.amount - The amount to be added to the cash balance.
     * @returns {String} The updated cash balance for the user.
     */
    static async addToBalance({ amount }) {
        store.balance = store.balance + amount;
        return store.balance;
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
        if (store.balance >= amount) {
            store.balance = store.balance - amount;
            return store.balance;
        }

        throw new Error('INSUFFICIENT_BALANCE');
    }
}

module.exports = { BalanceService };
