'use strict';

const test = require('ava');
const server = require('../server');
const sinon = require('sinon');
const { StocksService } = require('../services/stocksService');

const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('GET /stock-price/{stockSymbol} | should return stock price for specified stock symbol', async t => {
    sandbox.stub(StocksService, 'getStockPrice').resolves(4);

    const request = {
        method: 'GET',
        url: '/stock-price/GOOG'
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 200);
    t.is(result, 4)
});
