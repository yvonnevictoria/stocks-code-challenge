import { all } from 'redux-saga/effects';
import { watchRetrieveBalanceRequest } from './balance';
import { watchAddBalanceRequest } from './balance';
import { watchDeductBalanceRequest } from './balance';
import { watchRetrievePortfolioRequest } from './portfolio';
import { watchPurchaseStockRequest } from './portfolio';
import { watchSellStockRequest } from './portfolio';


export default function* rootSaga() {
    yield all([
        watchRetrieveBalanceRequest(),
        watchRetrievePortfolioRequest(),
        watchAddBalanceRequest(),
        watchDeductBalanceRequest(),
        watchPurchaseStockRequest(),
        watchSellStockRequest()
    ]);
}
