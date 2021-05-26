import MockAdapter from 'axios-mock-adapter';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import reducer, { actionCreators, watchRetrieveBalanceRequest, retrieveBalance } from './balance';
import axios from 'axios';

const httpMock = new MockAdapter(axios);
const defaultState = {
    isLoading: false,
    isError: false,
    balance: ''
};

describe('balance reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toStrictEqual({
            isLoading: false,
            isError: false,
            balance: ''
        });
    });

    describe('BALANCE_RETRIEVE_REQUESTED', () => {
        it('should set state.isLoading to true', () => {
            const action = {
                type: 'BALANCE_RETRIEVE_REQUESTED'
            };

            expect(reducer(defaultState, action)).toStrictEqual({
                isLoading: true,
                isError: false,
                balance: ''
            });
        });
    });

    describe('BALANCE_RETRIEVE_SUCCEEDED', () => {
        const currentState = {
            ...defaultState,
            isLoading: true
        };

        const action = {
            type: 'BALANCE_RETRIEVE_SUCCEEDED',
            balance: 1223
        };

        expect(reducer(currentState, action)).toStrictEqual({
            isLoading: false,
            isError: false,
            balance: 1223
        });
    });

    describe('BALANCE_RETRIEVE_FAILED', () => {
        it('should set state.isLoading to false and state.isError to true', () => {
            const currentState = {
                ...defaultState,
                isLoading: true
            };

            const action = {
                type: 'BALANCE_RETRIEVE_FAILED'
            };

            expect(reducer(currentState, action)).toStrictEqual({
                isLoading: false,
                isError: true
            });
        });
    });
});

describe('balance actionCreators', () => {
    describe('balanceRetrieveRequested', () => {
        it('returns an action of type BALANCE_RETRIEVE_REQUESTED', () => {
            expect(actionCreators.balanceRetrieveRequested()).toStrictEqual({
                type: 'BALANCE_RETRIEVE_REQUESTED'
            });
        });
    });

    describe('balanceRetrieveSucceeded', () => {
        it('returns an action of type BALANCE_RETRIEVE_SUCCEEDED', () => {
            expect(actionCreators.balanceRetrieveSucceeded({
                balance: 1223
            })).toStrictEqual({
                type: 'BALANCE_RETRIEVE_SUCCEEDED',
                balance: 1223
            });
        });
    });

    describe('balanceRetrieveFailed', () => {
        it('returns an action of type BALANCE_RETRIEVE_FAILED', () => {
            expect(actionCreators.balanceRetrieveFailed()).toStrictEqual({
                type: 'BALANCE_RETRIEVE_FAILED'
            });
        });
    });
});

describe('retrieveBalance saga', () => {
    beforeEach(() => {
        httpMock.reset();
    });

    it('should call the node balance endpoint', async () => {
        httpMock.onPost('http://localhost:4000/balance').reply(200);
        return expectSaga(retrieveBalance)
            .call(axios.get('http://localhost:4000/'))
            .run();
    });

    it('should put BALANCE_RETRIEVE_SUCCEEDED action', async () => {
        httpMock.onPost('http://localhost:4000/balance').reply(200);

        await expectSaga(retrieveBalance, {})
            .put({ type: 'BALANCE_RETRIEVE_SUCCEEDED', balance: 7432 })
            .run();
    });

    it('should put a new request failed action on failure', async () => {
        [400, 401, 403, 500].map(status => {
            httpMock.onPost('http://localhost:4000/balance').reply(status);
            return expectSaga(retrieveBalance)
                .put({
                    type: 'BALANCE_RETRIEVE_FAILED'
                })
                .run();
        });
    });
});

describe('watchRetrieveBalanceRequest saga', () => {
    it('should take latest balance request and put to retrieveBalance()', () => {
        expect(
            testSaga(watchRetrieveBalanceRequest)
                .next()
                .take('BALANCE_RETRIEVE_REQUESTED')
                .next('')
                .fork(retrieveBalance, '')
                .finish()
                .isDone()
        ).toBeTruthy();
    });
});
