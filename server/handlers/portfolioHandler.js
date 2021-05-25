const { PortfolioService } = require('../services/portfolioService');

/**
 * @module
 */

module.exports = {
    /**
     *  Gets user's portfolio.
     *
     * @param {Request} request - The Hapi request object.
     * @param {Object} h - The Hapi response toolkit.
     * @returns {Response} Response with user portfolio.
     */
    getPortfolio: async (request, h) => {
        return PortfolioService.getPortfolio();
    }
};
