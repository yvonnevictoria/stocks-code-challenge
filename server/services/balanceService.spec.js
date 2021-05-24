'use strict';

const test = require('ava');
const sinon = require('sinon');
const { BalanceService } = require('./balanceService');
const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('getBalance | should return current cash balance', async t => {
    const cashBalance = await BalanceService.getBalance();

    t.is(cashBalance, 7432);
});

test.serial('addToBalance | should add specified amount to current cash balance', async t => {
    const cashBalance = await BalanceService.addToBalance({ amount: 70});

    t.is(cashBalance, 7502);
});

test.serial('deductFromBalance | should deduct specified amount to current cash balance', async t => {
    const cashBalance = await BalanceService.deductFromBalance({ amount: 140});

    t.is(cashBalance, 7362);
});

test.serial('deductFromBalance | should return INSUFFICIENT_BALANCE if balance is too low to deduct specified amount', async t => {
    const err = await t.throwsAsync(BalanceService.deductFromBalance({
        amount: 7770
    }));
    t.is(err.message, 'INSUFFICIENT_BALANCE');
});
