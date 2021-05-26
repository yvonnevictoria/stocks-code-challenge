import { connect } from 'react-redux';
import { actionCreators as balanceActions } from '../redux/balance';

import { Banner as BannerComponent } from '../components/Banner';

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

const Banner = connect(mapStateToProps, mapDispatchToProps)(BannerComponent);

export {
    Banner
};
