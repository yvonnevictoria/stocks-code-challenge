import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Banner } from './Banner';

describe('Banner container', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        balance: {
            balance: 987,
            isLoading: true,
            isError: false
        }
    });

    const wrapper = shallow(<Banner store={store} />);

    afterEach(() => {
        store.clearActions();
    });

    it(`should set props.isLoading to state.isLoading`, () => {
        expect(wrapper.dive().prop('isLoading')).toBe(true);
    });

    it(`should set props.isLoading to state.isError`, () => {
        expect(wrapper.dive().prop('isError')).toBe(false);
    });

    it(`should set props.balance to state.balance`, () => {
        expect(wrapper.dive().prop('balance')).toBe(987);
    });

    it('should set prop.getBanner to dispatch a balanceRetrieveRequested action', () => {
        wrapper.prop('getBanner')();

        const actions = store.getActions();

        expect(actions).toEqual([{
            type: 'BALANCE_RETRIEVE_REQUESTED',
        }]);
    });
});
