import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Portfolio } from './Portfolio';

describe('Portfolio container', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        portfolio: {
            portfolio: { test: 'test' },
            isLoading: true,
            isError: false
        }
    });

    const wrapper = shallow(<Portfolio store={store} />);

    afterEach(() => {
        store.clearActions();
    });

    it(`should set props.isLoading to state.isLoading`, () => {
        expect(wrapper.dive().prop('isLoading')).toBe(true);
    });

    it(`should set props.isLoading to state.isError`, () => {
        expect(wrapper.dive().prop('isError')).toBe(false);
    });

    it(`should set props.portfolio to state.portfolio`, () => {
        expect(wrapper.dive().prop('portfolio')).toStrictEqual({ test: 'test' });
    });
});
