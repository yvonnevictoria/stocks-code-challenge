'use strict';

const test = require('ava');
const sinon = require('sinon');
const { StocksService } = require('./stocksService');
const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('getStockPrice | should return most recent closing stock price for specified stock symbol', async t => {
    const stockPrice = await StocksService.getStockPrice({ stockSymbol: 'GOOG' });

    t.is(stockPrice, 4);
});
