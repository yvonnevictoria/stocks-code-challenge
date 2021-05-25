'use strict';

const test = require('ava');
const sinon = require('sinon');
const { PortfolioService } = require('./PortfolioService');
const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
    await PortfolioService.resetPortfolio();
});

test.serial(`getPortfolio | should return user's current portfolio`, async t => {
    t.deepEqual(await PortfolioService.getPortfolio(), {
        GOOG: 1,
        SPOT: 10
    });
});

test.serial('getCurrentStockAmount | should return currently held amount of specified stock', async t => {
    const heldAmount = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'GOOG' });

    t.is(heldAmount, 1);
});

test.serial('addToPortfolio | should add amount to existing stock in portfolio', async t => {
    const heldAmountOriginal = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'SPOT' });
    t.is(heldAmountOriginal, 10);

    t.deepEqual(await PortfolioService.addToPortfolio({ stockSymbol: 'SPOT', amount: 4 }), {
        GOOG: 1,
        SPOT: 14
    });

    const heldAmountUpdated = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'SPOT' });
    t.is(heldAmountUpdated, 14);
});

test.serial('addToPortfolio | should add new stock and amount to portfolio', async t => {
    const heldAmountOriginal = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'IBM' });
    t.is(heldAmountOriginal, 0);

    t.deepEqual(await PortfolioService.addToPortfolio({ stockSymbol: 'IBM', amount: 4 }), {
        GOOG: 1,
        IBM: 4,
        SPOT: 10
    });

    const heldAmountUpdated = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'IBM' });
    t.is(heldAmountUpdated, 4);
});

test.serial('removeFromPortfolio | should remove specified amount of stock from portfolio', async t => {
    const heldAmountOriginal = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'IBM' });
    t.is(heldAmountOriginal, 4);

    t.deepEqual(await PortfolioService.removeFromPortfolio({ stockSymbol: 'IBM', removedStocks: 2 }), {
        GOOG: 1,
        IBM: 2,
        SPOT: 10
    });

    const heldAmountUpdated = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'IBM' });
    t.is(heldAmountUpdated, 2);
});

test.serial('removeFromPortfolio | should remove specified stock from portfolio if entire amount is removed', async t => {
    const heldAmountOriginal = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'IBM' });
    t.is(heldAmountOriginal, 2);

    t.deepEqual(await PortfolioService.removeFromPortfolio({ stockSymbol: 'IBM', removedStocks: 2 }), {
        GOOG: 1,
        SPOT: 10
    });

    const heldAmountUpdated = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'IBM' });
    t.is(heldAmountUpdated, 0);
});

test.serial('removeFromPortfolio | should throw INSUFFICIENT_BALANCE error if stocks sold is higher than existing stocks', async t => {
    const heldAmountOriginal = await PortfolioService.getCurrentStockAmount({ stockSymbol: 'GOOG'});
    t.is(heldAmountOriginal, 1);

    const err = await t.throwsAsync(PortfolioService.removeFromPortfolio({
        stockSymbol: 'GOOG',
        removedStocks: 2
    }));

    t.is(err.message, 'INSUFFICIENT_BALANCE');

    t.deepEqual(await PortfolioService.getPortfolio(), {
        GOOG: 1,
        SPOT: 10
    });
});

test.serial('resetPortfolio | should reset portfolio', async t => {
    t.deepEqual(await PortfolioService.getPortfolio(), {
        GOOG: 1,
        SPOT: 10
    });

    t.deepEqual(await PortfolioService.addToPortfolio({ stockSymbol: 'GOOG', amount: 20 }), {
        GOOG: 21,
        SPOT: 10
    });

    await PortfolioService.resetPortfolio();

    t.deepEqual(await PortfolioService.getPortfolio(), {
        GOOG: 1,
        SPOT: 10
    });
});
