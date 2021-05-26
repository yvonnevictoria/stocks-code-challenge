import { connect } from 'react-redux';
import { actionCreators as balanceActions } from '../redux/balance';

import { Dashboard as DashboardComponent } from '../components/Dashboard';

const mapStateToProps = ({
    balance: {
        balance,
        isLoading,
        isError
    }
}) => ({
    balance,
    isLoading,
    isError
});

const mapDispatchToProps = dispatch => ({
    getBalance: () => dispatch(balanceActions.balanceRetrieveRequested())
});

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

export {
    Dashboard
};
