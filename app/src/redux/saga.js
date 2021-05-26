import { all } from 'redux-saga/effects';
import { watchRetrieveBalanceRequest } from './balance';
import { watchRetrievePortfolioRequest } from './portfolio';

export default function* rootSaga() {
    yield all([
        watchRetrieveBalanceRequest(),
        watchRetrievePortfolioRequest()
    ]);
}
