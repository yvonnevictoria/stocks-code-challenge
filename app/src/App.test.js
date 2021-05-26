import App from './App';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('renders react app', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        balance: {
            balance: 0,
            isLoading: false,
            isError: false
        },
        portfolio: {
            portfolio: {},
            isLoading: false,
            isError: false
        }
    });

    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );

    expect(wrapper.find('Dashboard').length).toBe(1);
});
