import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';
import { Banner } from '../containers/Banner';
import { Portfolio } from '../containers/Portfolio';

describe('Dashboard', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Dashboard />);
    });

    it(`should display Banner`, () => {
        expect(wrapper.find(Banner).length).toBe(1);
    });

    it(`should display Portfolio`, () => {
        expect(wrapper.find(Portfolio).length).toBe(1);
    });
});
