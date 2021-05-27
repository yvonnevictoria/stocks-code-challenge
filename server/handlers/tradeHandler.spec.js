'use strict';

const test = require('ava');
const server = require('../server');
const sinon = require('sinon');
const { TradeService } = require('../services/tradeService');

const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('POST /buy | should add stocks to portfolio and deduct cash', async t => {
    sandbox.stub(TradeService, 'purchaseStock').resolves({
        portfolio: {
            GOOG: 1,
            SPOT: 30
        },
        updatedBalance: 500
    });

    const request = {
        method: 'POST',
        url: '/buy',
        payload: {
            stock: 'SPOT',
            amount: 12
        }
    };

    const { result, statusCode } = await server.inject(request);

    t.is(statusCode, 200);
    t.deepEqual(result, {
        portfolio: {
            GOOG: 1,
            SPOT: 30
        },
        updatedBalance: 500
    });
});

test.serial('POST /buy | should return 409 error if cash balance is too low', async t => {
    sandbox.stub(TradeService, 'purchaseStock').rejects(new Error('INSUFFICIENT_BALANCE'));

    const request = {
        method: 'POST',
        url: '/buy',
        payload: {
            stock: 'SPOT',
            amount: 20000
        }
    };

    const { result, statusCode } = await server.inject(request);

    t.is(statusCode, 409);
    t.is(result, 'Insufficient balance');
});

test.serial('POST /sell | should remove stocks from portfolio and add cash back to balance', async t => {
    sandbox.stub(TradeService, 'sellStock').resolves({
        portfolio: {
            GOOG: 1,
            SPOT: 12
        },
        updatedBalance: 700
    });

    const request = {
        method: 'POST',
        url: '/sell',
        payload: {
            stock: 'SPOT',
            amount: 4
        }
    };

    const { result, statusCode } = await server.inject(request);

    t.is(statusCode, 200);
    t.deepEqual(result, {
        portfolio: {
            GOOG: 1,
            SPOT: 12
        },
        updatedBalance: 700
    });
});

test.serial('POST /sell | should return 409 error if stock balance is too low', async t => {
    sandbox.stub(TradeService, 'sellStock').rejects(new Error('INSUFFICIENT_BALANCE'));

    const request = {
        method: 'POST',
        url: '/sell',
        payload: {
            stock: 'SPOT',
            amount: 20000
        }
    };

    const { result, statusCode } = await server.inject(request);

    t.is(statusCode, 409);
    t.is(result, 'Insufficient stocks');
});
