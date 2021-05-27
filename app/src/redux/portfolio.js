import { takeLatest, put, call } from 'redux-saga/effects';
import { actionCreators as balanceActionCreators } from './balance';
import axios from 'axios';

const PORTFOLIO_RETRIEVE_REQUESTED = 'PORTFOLIO_RETRIEVE_REQUESTED';
const PORTFOLIO_RETRIEVE_SUCCEEDED = 'PORTFOLIO_RETRIEVE_SUCCEEDED';
const PORTFOLIO_RETRIEVE_FAILED = 'PORTFOLIO_RETRIEVE_FAILED';
const STOCK_PURCHASE_REQUESTED = 'STOCK_PURCHASE_REQUESTED';
const STOCK_PURCHASE_SUCCEEDED = 'STOCK_PURCHASE_SUCCEEDED';
const STOCK_PURCHASE_FAILED = 'STOCK_PURCHASE_FAILED';
const STOCK_SELL_REQUESTED = 'STOCK_SELL_REQUESTED';
const STOCK_SELL_SUCCEEDED = 'STOCK_SELL_SUCCEEDED';
const STOCK_SELL_FAILED = 'STOCK_SELL_FAILED';

const defaultState = {
    isLoading: false,
    isError: false,
    portfolio: {}
};

const reducer = (state = defaultState, { type, portfolio }) => {
    switch (type) {
        case PORTFOLIO_RETRIEVE_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case PORTFOLIO_RETRIEVE_SUCCEEDED:
            return {
                isLoading: false,
                isError: false,
                portfolio
            };
        case PORTFOLIO_RETRIEVE_FAILED:
            return {
                isLoading: false,
                isError: true
            };
        case STOCK_PURCHASE_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case STOCK_PURCHASE_SUCCEEDED:
            return {
                isLoading: false,
                isError: false,
                portfolio
            };
        case STOCK_PURCHASE_FAILED:
            return {
                isLoading: false,
                isError: true
            };
        case STOCK_SELL_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case STOCK_SELL_SUCCEEDED:
            return {
                isLoading: false,
                isError: false,
                portfolio
            };
        case STOCK_SELL_FAILED:
            return {
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
};

const actionCreators = {
    portfolioRetrieveRequested() {
        return {
            type: PORTFOLIO_RETRIEVE_REQUESTED
        };
    },
    portfolioRetrieveSucceeded({ portfolio }) {
        return {
            type: PORTFOLIO_RETRIEVE_SUCCEEDED,
            portfolio
        };
    },
    portfolioRetrieveFailed() {
        return {
            type: PORTFOLIO_RETRIEVE_FAILED
        };
    },
    stockPurchaseRequested({ stockSymbol, amount}) {
        return {
            type: STOCK_PURCHASE_REQUESTED,
            stockSymbol,
            amount
        };
    },
    stockPurchaseSucceeded({ portfolio }) {
        return {
            type: STOCK_PURCHASE_SUCCEEDED,
            portfolio
        };
    },
    stockPurchaseFailed() {
        return {
            type: STOCK_PURCHASE_FAILED
        };
    },
    stockSellRequested({ stockSymbol, amount }) {
        return {
            type: STOCK_SELL_REQUESTED,
            stockSymbol,
            amount
        };
    },
    stockSellSucceeded({ portfolio }) {
        return {
            type: STOCK_SELL_SUCCEEDED,
            portfolio
        };
    },
    stockSellFailed() {
        return {
            type: STOCK_SELL_FAILED
        };
    }
};

function* retrievePortfolio() {
    try {
        const { data } = yield call(axios.get, 'http://localhost:4000/portfolio');

        yield put(actionCreators.portfolioRetrieveSucceeded({ portfolio: data }));
    } catch (error) {
        yield put(actionCreators.portfolioRetrieveFailed());
    }
}

function* purchaseStock({ stockSymbol, amount }) {
    try {
        const { data: { portfolio } } = yield call(axios.post, 'http://localhost:4000/buy', { stockSymbol, amount });

        yield put(actionCreators.stockPurchaseSucceeded({ portfolio }));
        yield put(balanceActionCreators.balanceRetrieveRequested());
    } catch (error) {
        yield put(actionCreators.stockPurchaseFailed());
    }
}

function* sellStock({ stockSymbol, amount }) {
    try {
        const { data: { portfolio } } = yield call(axios.post, 'http://localhost:4000/sell', { stockSymbol, amount });

        yield put(actionCreators.stockSellSucceeded({ portfolio }));
        yield put(balanceActionCreators.balanceRetrieveRequested());
    } catch (error) {
        yield put(actionCreators.stockSellFailed());
    }
}

function* watchRetrievePortfolioRequest() {
    yield takeLatest(PORTFOLIO_RETRIEVE_REQUESTED, retrievePortfolio);
}

function* watchPurchaseStockRequest() {
    yield takeLatest(STOCK_PURCHASE_REQUESTED, purchaseStock);
}

function* watchSellStockRequest() {
    yield takeLatest(STOCK_SELL_REQUESTED, sellStock);
}


export {
    reducer as default,
    actionCreators,
    watchRetrievePortfolioRequest,
    retrievePortfolio,
    purchaseStock,
    watchPurchaseStockRequest,
    sellStock,
    watchSellStockRequest
};
