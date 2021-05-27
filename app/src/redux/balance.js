import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

const BALANCE_RETRIEVE_REQUESTED = 'BALANCE_RETRIEVE_REQUESTED';
const BALANCE_RETRIEVE_SUCCEEDED = 'BALANCE_RETRIEVE_SUCCEEDED';
const BALANCE_RETRIEVE_FAILED = 'BALANCE_RETRIEVE_FAILED';
const BALANCE_ADD_REQUESTED = 'BALANCE_ADD_REQUESTED';
const BALANCE_ADD_SUCCEEDED = 'BALANCE_ADD_SUCCEEDED';
const BALANCE_ADD_FAILED = 'BALANCE_ADD_FAILED';
const BALANCE_DEDUCT_REQUESTED = 'BALANCE_DEDUCT_REQUESTED';
const BALANCE_DEDUCT_SUCCEEDED = 'BALANCE_DEDUCT_SUCCEEDED';
const BALANCE_DEDUCT_FAILED = 'BALANCE_DEDUCT_FAILED';

const defaultState = {
    isLoading: false,
    isError: false,
    balance: null
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
        case BALANCE_ADD_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case BALANCE_ADD_SUCCEEDED:
            return {
                isLoading: false,
                isError: false,
                balance
            };
        case BALANCE_ADD_FAILED:
            return {
                isLoading: false,
                isError: true
            };
        case BALANCE_DEDUCT_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case BALANCE_DEDUCT_SUCCEEDED:
            return {
                isLoading: false,
                isError: false,
                balance
            };
        case BALANCE_DEDUCT_FAILED:
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
    },
    balanceAddRequested({ amount }) {
        return {
            type: BALANCE_ADD_REQUESTED,
            amount
        };
    },
    balanceAddSucceeded({ balance }) {
        return {
            type: BALANCE_ADD_SUCCEEDED,
            balance
        };
    },
    balanceAddFailed() {
        return {
            type: BALANCE_ADD_FAILED
        };
    },
    balanceDeductRequested({ amount }) {
        return {
            type: BALANCE_DEDUCT_REQUESTED,
            amount
        };
    },
    balanceDeductSucceeded({ balance }) {
        return {
            type: BALANCE_DEDUCT_SUCCEEDED,
            balance
        };
    },
    balanceDeductFailed() {
        return {
            type: BALANCE_DEDUCT_FAILED
        };
    }
};

function* retrieveBalance() {
    try {
        const { data: balance } = yield call(axios.get, 'http://localhost:4000/balance');

        yield put(actionCreators.balanceRetrieveSucceeded({ balance }));
    } catch (error) {
        yield put(actionCreators.balanceRetrieveFailed());
    }
}

function* addToBalance({ amount }) {
    try {
        const { data: balance } = yield call(axios.patch, 'http://localhost:4000/add', { amount });

        yield put(actionCreators.balanceAddSucceeded({ balance }));
    } catch (error) {
        yield put(actionCreators.balanceAddFailed());
    }
}

function* deductFromBalance({ amount }) {
    try {
        const { data: balance } = yield call(axios.patch, 'http://localhost:4000/deduct', { amount });
        yield put(actionCreators.balanceDeductSucceeded({ balance }));
    } catch (error) {
        yield put(actionCreators.balanceDeductFailed());
    }
}

function* watchRetrieveBalanceRequest() {
    yield takeLatest(BALANCE_RETRIEVE_REQUESTED, retrieveBalance);
}

function* watchAddBalanceRequest() {
    yield takeLatest(BALANCE_ADD_REQUESTED, addToBalance);
}

function* watchDeductBalanceRequest() {
    yield takeLatest(BALANCE_DEDUCT_REQUESTED, deductFromBalance);
}


export {
    reducer as default,
    actionCreators,
    watchRetrieveBalanceRequest,
    retrieveBalance,
    watchAddBalanceRequest,
    addToBalance,
    watchDeductBalanceRequest,
    deductFromBalance
};
