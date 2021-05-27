import React from 'react';
import { Banner } from '../containers/Banner';
import { Portfolio } from '../containers/Portfolio';

import '../stylesheets/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Banner />
            <Portfolio />
        </div>
    );
};

export {
    Dashboard
};
