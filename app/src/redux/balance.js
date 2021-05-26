import { take, put, call, fork } from 'redux-saga/effects';
import axios from 'axios';

const BALANCE_RETRIEVE_REQUESTED = 'BALANCE_RETRIEVE_REQUESTED';
const BALANCE_RETRIEVE_SUCCEEDED = 'BALANCE_RETRIEVE_SUCCEEDED';
const BALANCE_RETRIEVE_FAILED = 'BALANCE_RETRIEVE_FAILED';

const defaultState = {
    isLoading: false,
    isError: false,
    balance: ''
};

const reducer = (state = defaultState, { type, balance }) => {
    switch (type) {
        case BALANCE_RETRIEVE_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case BALANCE_RETRIEVE_SUCCEEDED:
            return {
                isLoading: false,
                isError: false,
                balance
            };
        case BALANCE_RETRIEVE_FAILED:
            return {
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
};

const actionCreators = {
    balanceRetrieveRequested() {
        return {
            type: BALANCE_RETRIEVE_REQUESTED
        };
    },
    balanceRetrieveSucceeded({ balance }) {
        return {
            type: BALANCE_RETRIEVE_SUCCEEDED,
            balance
        };
    },
    balanceRetrieveFailed() {
        return {
            type: BALANCE_RETRIEVE_FAILED
        };
    }
};

function* retrieveBalance() {
    try {
        const response = yield call(() =>
            axios.get('http://localhost:4000/balance')
                .then(function (response) {
                    const { data } = response;
                    return data;
                })
                .catch(function (error) {
                  console.log(error);
              })
      );

        yield put(actionCreators.balanceRetrieveSucceeded({ balance: response }));
    } catch (error) {
        yield put(actionCreators.balanceRetrieveFailed());
    }
}

function* watchRetrieveBalanceRequest() {
    const action = yield take(BALANCE_RETRIEVE_REQUESTED);
    yield fork(retrieveBalance, action);
}

export {
    reducer as default,
    actionCreators,
    watchRetrieveBalanceRequest,
    retrieveBalance
};
