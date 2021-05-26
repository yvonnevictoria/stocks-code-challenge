import React from 'react';
import { shallow, mount } from 'enzyme';
import { Banner } from './Banner';
import { act } from 'react-dom/test-utils';

describe('Banner', () => {
    let wrapper;

    const requiredProps = {
        balance: 7430,
        isLoading: false,
        isError: false,
        getBalance: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Banner {...requiredProps} />);
    });

    it('should render greeting', () => {
        expect(wrapper.find('.greeting').text()).toBe('Good morning Yvonne, your cash balance is:');
    });

    describe(`balance`, () => {
        it(`should call props.getBalance if balance is empty`, () => {
            const props = {
                balance: '',
                isLoading: false,
                isError: false,
                getBalance: jest.fn()
            };
            const wrapper = mount(<Banner {...props} />); // Mounted to get useEffect working
            wrapper.setProps({
                balance: 0
            }); // Force a re-render
            expect(props.getBalance).toHaveBeenCalledTimes(1);
        });

        it(`should display balance`, () => {
            expect(wrapper.find('.cash-balance').text()).toBe('$7430');
        });
    });

    describe(`isLoading and isError`, () => {
        it(`should display loading screen if isLoading is true`, () => {
            wrapper = shallow(<Banner {...requiredProps} isLoading />);
            expect(wrapper.find('p').text()).toBe('Loading');
        });

        it(`should display error screen if isError is true`, () => {
            wrapper = shallow(<Banner {...requiredProps} isError />);
            expect(wrapper.find('p').text()).toBe('Something went wrong');
        });
    });

    describe(`edit balance button`, () => {
        it(`should render edit balance button`, () => {
            expect(wrapper.find('.edit-balance').length).toBe(1);
        });
    });
});
