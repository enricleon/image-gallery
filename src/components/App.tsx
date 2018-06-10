
import * as React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import '../styles/App.scss';

import Home from './layout/Home';
import NotFound from './layout/NotFound';

class App extends React.Component {
    public render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={props => <Home {...props} />}
                />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default App;
