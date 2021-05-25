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
        "Meta Data": {
            "3. Last Refreshed": "2021-05-21",
        },
        "Time Series (Daily)": {
            "2021-05-21": {
                "4. close": "2345.1000",
            },
            "2021-05-20": {
                "4. close": "2356.0900",
            }
        }
    };

    nock(`https://www.alphavantage.co`)
        .get(`/query?function=TIME_SERIES_DAILY&symbol=GOOG&apikey=${API_KEY}`)
        .reply(200, apiReply);

    const stockPrice = await StocksService.getStockPrice({ stockSymbol: 'GOOG' });

    t.is(stockPrice, 2345.1);
});
