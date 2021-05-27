'use strict';

const test = require('ava');
const sinon = require('sinon');
const { BalanceService } = require('./balanceService');
const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();

    // As the balance value is stored in an obj, the tests permanently alters the amount
    // This results in tests having side effects on other tests. I know this is bad practice
    // but I have explained my reasoning for continuing to use this structure in my report.
    // To prevent the side effects, I've added a func specifically for testing purposes
    // that resets the balance.
    await BalanceService.resetBalance();
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
    const cashBalance = await BalanceService.deductFromBalance({ amount: 70});

    t.is(cashBalance, 7362);
});

test.serial('deductFromBalance | should return INSUFFICIENT_BALANCE if balance is too low to deduct specified amount', async t => {
    const err = await t.throwsAsync(BalanceService.deductFromBalance({
        amount: 7770
    }));
    t.is(err.message, 'INSUFFICIENT_BALANCE');
});

test.serial('resetBalance | should set balance to 7432', async t => {
    const originalCashBalance = await BalanceService.getBalance();
    t.is(originalCashBalance, 7432);

    const deductedCashBalance = await BalanceService.deductFromBalance({ amount: 70});
    t.is(deductedCashBalance, 7362);

    await BalanceService.resetBalance();
    const resetCashBalance = await BalanceService.getBalance();
    t.is(resetCashBalance, 7432);
});
