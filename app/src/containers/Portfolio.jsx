import { connect } from 'react-redux';
import { actionCreators as portfolioActions } from '../redux/portfolio';

import { Portfolio as PortfolioComponent } from '../components/Portfolio';

const mapStateToProps = ({
    portfolio: {
        portfolio,
        isLoading,
        isError
    }
}) => ({
    portfolio,
    isLoading,
    isError
});

const mapDispatchToProps = dispatch => ({
    getPortfolio: () => dispatch(portfolioActions.portfolioRetrieveRequested()),
    purchaseStock: ({ stockSymbol, amount}) => dispatch(portfolioActions.stockPurchaseRequested({ stockSymbol, amount})),
    sellStock: ({ stockSymbol, amount}) => dispatch(portfolioActions.stockSellRequested({ stockSymbol, amount}))
});

const Portfolio = connect(mapStateToProps, mapDispatchToProps)(PortfolioComponent);

export {
    Portfolio
};
