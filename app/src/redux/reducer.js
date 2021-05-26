import { combineReducers } from 'redux';

import balance from './balance';
import portfolio from './portfolio';

export default combineReducers({
    balance,
    portfolio
});
