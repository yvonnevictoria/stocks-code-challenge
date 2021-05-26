import React from 'react';
import { shallow } from 'enzyme';
import { Stocks } from './Stocks';

describe('Stocks', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Stocks />);
    });

    it(`should render cash balance`, () => {
        expect(wrapper.text()).toBe('Stonks:');
    });
});
