'use strict';

const test = require('ava');
const server = require('../server');
const sinon = require('sinon');
const { PortfolioService } = require('../services/portfolioService');

const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('GET /portfolio | should return user portfolio', async t => {
    sandbox.stub(PortfolioService, 'getPortfolio').resolves({
        GOOG: 1,
        SPOT: 18
    });

    const request = {
        method: 'GET',
        url: '/portfolio'
    };

    const { result, statusCode } = await server.inject(request);

    t.is(statusCode, 200);
    t.deepEqual(result, {
        GOOG: 1,
        SPOT: 18
    });
});
