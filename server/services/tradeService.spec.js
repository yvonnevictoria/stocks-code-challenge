'use strict';

const test = require('ava');
const sinon = require('sinon');
const { StocksService } = require('./stocksService');
const { BalanceService } = require('./balanceService');
const { PortfolioService } = require('./portfolioService');
const { TradeService } = require('./tradeService');

const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial(`purchaseStock | should purchase specified amount of stocks`, async t => {
    sandbox.stub(BalanceService, 'getBalance').resolves(7432);
    sandbox.stub(StocksService, 'getStockPrice').resolves(2345.1);
    sandbox.stub(BalanceService, 'deductFromBalance').resolves(2741.8);
    sandbox.stub(PortfolioService, 'addToPortfolio').resolves({
        SNOOP: 2
    });

    t.deepEqual(await TradeService.purchaseStock({ stockSymbol: 'SNOOP', amount: 2 }), {
        portfolio: {
            SNOOP: 2
        },
        updatedBalance: 2741.8
    });
});

test.serial(`purchaseStock | throws INSUFFICIENT_BALANCE if balance too low to purchase specified stocks`, async t => {
    sandbox.stub(BalanceService, 'getBalance').resolves(1);
    sandbox.stub(StocksService, 'getStockPrice').resolves(2345.1);

    const err = await t.throwsAsync(TradeService.purchaseStock({
        stockSymbol: 'SNOOP',
        amount: 2
    }));

    t.is(err.message, 'INSUFFICIENT_BALANCE');
});

test.serial(`sellStock | should sell specified amount of stocks`, async t => {
    sandbox.stub(PortfolioService, 'getCurrentStockAmount').resolves(4);
    sandbox.stub(StocksService, 'getStockPrice').resolves(2345.1);
    sandbox.stub(BalanceService, 'addToBalance').resolves(7432.8);
    sandbox.stub(PortfolioService, 'removeFromPortfolio').resolves({
        GOOG: 1
    });

    t.deepEqual(await TradeService.sellStock({ stockSymbol: 'SNOOP', amountToSell: 2 }), {
        portfolio: {
            GOOG: 1
        },
        updatedBalance: 7432.8
    });
});

test.serial(`sellStock | should remove all stocks and company if all stocks sold`, async t => {
    sandbox.stub(PortfolioService, 'getCurrentStockAmount').resolves(2);
    sandbox.stub(StocksService, 'getStockPrice').resolves(2345.1);
    sandbox.stub(BalanceService, 'addToBalance').resolves(7432.8);
    sandbox.stub(PortfolioService, 'removeFromPortfolio').resolves({
        GOOG: 1
    });

    t.deepEqual(await TradeService.sellStock({ stockSymbol: 'SNOOP', amountToSell: 2 }), {
        portfolio: {
            GOOG: 1
        },
        updatedBalance: 7432.8
    });
});

test.serial(`sellStock | throws INSUFFICIENT_BALANCE if trying to sell more stocks than owned`, async t => {
    sandbox.stub(PortfolioService, 'getCurrentStockAmount').resolves(1);
    sandbox.stub(StocksService, 'getStockPrice').resolves(2345.1);

    const err = await t.throwsAsync(TradeService.sellStock({
        stockSymbol: 'GOOG',
        amountToSell: 2
    }));

    t.is(err.message, 'INSUFFICIENT_BALANCE');
});
