import * as React from 'react'
import { Component } from 'react'
import Images from '../containers/Images';

import Header from '../presentation/Header';

class Home extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body fill-height-or-more">
                    <Images />
                </div>
            </div>
        );
    }
}

export default Home;