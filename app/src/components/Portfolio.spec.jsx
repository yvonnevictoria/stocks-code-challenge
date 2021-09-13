import React from 'react';
import { shallow, mount } from 'enzyme';
import { Portfolio } from './Portfolio';

describe('Portfolio', () => {
    let wrapper;

    const requiredProps = {
        portfolio: 7430,
        isLoading: false,
        isError: false,
        getPortfolio: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Portfolio {...requiredProps} />);
    });

    describe(`isLoading and isError`, () => {
        it(`should display loading screen if isLoading is true`, () => {
            wrapper = shallow(<Portfolio {...requiredProps} isLoading />);
            expect(wrapper.find('p').text()).toBe('Loading');
        });

        it(`should display error screen if isError is true`, () => {
            wrapper = shallow(<Portfolio {...requiredProps} isError />);
            expect(wrapper.find('p').text()).toBe('Something went wrong');
        });
    });

    describe(`buy stocks button`, () => {
        it(`should render buy stocks button`, () => {
            expect(wrapper.find('.buy-stocks').length).toBe(1);
        });
    });

    describe(`portfolio`, () => {
        it(`should call props.getPortfolio if portfolio is empty`, () => {
            const mountedWrapper = mount(<Portfolio {...requiredProps} />); // Mounted to get useEffect working
            mountedWrapper.setProps({
                portfolio: {}
            }); // Force a re-render
            expect(requiredProps.getPortfolio).toHaveBeenCalledTimes(1);
        });

        it(`should render portfolio table with correct headers`, () => {
            expect(wrapper.find('.portfolio-table').length).toBe(1);

            // TODO YVO: Add table tests when completed
        });
    });
});
