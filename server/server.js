'use strict';
const StocksHandler = require('./handlers/stocksHandler');
const BalanceHandler = require('./handlers/balanceHandler');

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const init = async () => {
    server.route({
        method: 'GET',
        path: '/balance',
        handler: BalanceHandler.getBalance
    });

    server.route({
        method: 'PATCH',
        path: '/add',
        handler: BalanceHandler.addToBalance
    });

    server.route({
        method: 'PATCH',
        path: '/deduct',
        handler: BalanceHandler.deductFromBalance
    });

    server.route({
        method: 'GET',
        path: '/stock-price/{stockSymbol}',
        handler: StocksHandler.getStockPrice
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

module.exports = server;
