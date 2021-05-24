'use strict';

const test = require('ava');
const server = require('../server');
const sinon = require('sinon');
const { BalanceService } = require('../services/balanceService');

const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('GET /balance | should return balance', async t => {
    sandbox.stub(BalanceService, 'getBalance').resolves(7432);

    const request = {
        method: 'GET',
        url: '/balance'
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 200);
    t.is(result, 7432)
});

test.serial('PATCH /add | should return updated balance', async t => {
    sandbox.stub(BalanceService, 'addToBalance').resolves(7502);

    const request = {
        method: 'PATCH',
        url: '/add',
        payload: {
            amount: 70
        }
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 201);
    t.is(result, 7502)
});

test.serial('PATCH /deduct | should return updated balance', async t => {
    sandbox.stub(BalanceService, 'deductFromBalance').resolves(7362);

    const request = {
        method: 'PATCH',
        url: '/deduct',
        payload: {
            amount: 70
        }
    };
    const { result, statusCode } = await server.inject(request);

    t.is(statusCode, 201);
    t.is(result, 7362)
});

test.serial('PATCH /deduct | should return 400 error if insufficient funds', async t => {
    sandbox.stub(BalanceService, 'deductFromBalance').rejects(new Error('INSUFFICIENT_BALANCE'));

    const request = {
        method: 'PATCH',
        url: '/deduct',
        payload: {
            amount: 7770
        }
    };
    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 400);
});
