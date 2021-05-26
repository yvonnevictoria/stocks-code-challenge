import { take, put, call, fork } from 'redux-saga/effects';
import axios from 'axios';

const PORTFOLIO_RETRIEVE_REQUESTED = 'PORTFOLIO_RETRIEVE_REQUESTED';
const PORTFOLIO_RETRIEVE_SUCCEEDED = 'PORTFOLIO_RETRIEVE_SUCCEEDED';
const PORTFOLIO_RETRIEVE_FAILED = 'PORTFOLIO_RETRIEVE_FAILED';

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
    }
};

function* retrievePortfolio() {
    try {
        const response = yield call(() =>
            axios.get('http://localhost:4000/portfolio')
                .then(function (response) {
                    const { data } = response;
                    return data;
                })
                .catch(function (error) {
                  console.log(error);
              })
      );

        yield put(actionCreators.portfolioRetrieveSucceeded({ portfolio: response }));
    } catch (error) {
        yield put(actionCreators.portfolioRetrieveFailed());
    }
}

function* watchRetrievePortfolioRequest() {
    const action = yield take(PORTFOLIO_RETRIEVE_REQUESTED);
    yield fork(retrievePortfolio, action);
}

export {
    reducer as default,
    actionCreators,
    watchRetrievePortfolioRequest,
    retrievePortfolio
};
