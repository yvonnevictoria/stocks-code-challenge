'use strict';

const { API_KEY } = require('../env.json');
const test = require('ava');
const sinon = require('sinon');
const nock = require('nock');
const { StocksService } = require('./stocksService');
const sandbox = sinon.createSandbox();

test.before(async () => {
    nock.disableNetConnect();
});

test.afterEach.always(async () => {
    sandbox.restore();
    if (!nock.isDone()) {
        t.fail('has outstanding nock mocks');
    }
    nock.cleanAll();
});

test.serial('getStockPrice | should return most recent closing stock price for specified stock symbol', async t => {
    const apiReply = {
        "Global Quote": {
           "01. symbol": "GOOG",
           "02. open": "2367.0000",
           "03. high": "2418.4800",
           "04. low": "2360.1100",
           "05. price": "2345.1000",
           "06. volume": "1062189",
           "07. latest trading day": "2021-05-24",
           "08. previous close": "2345.1000",
           "09. change": "61.5700",
           "10. change percent": "2.6255%"
       }
    };

    nock(`https://www.alphavantage.co`)
        .get(`/query?function=GLOBAL_QUOTE&symbol=GOOG&apikey=${API_KEY}`)
        .reply(200, apiReply);

    const stockPrice = await StocksService.getStockPrice({ stockSymbol: 'GOOG' });

    t.is(stockPrice, 2345.1);
});

test.serial(`getStockPrice | should throw NOT_FOUND error if symbol doesn't exist`, async t => {
    const apiReply = {
        "Global Quote": {}
    };

    nock(`https://www.alphavantage.co`)
        .get(`/query?function=GLOBAL_QUOTE&symbol=GOOGSS&apikey=${API_KEY}`)
        .reply(200, apiReply);

    const err = await t.throwsAsync(StocksService.getStockPrice({ stockSymbol: 'GOOGSS' }));

    t.is(err.message, 'NOT_FOUND');
});
