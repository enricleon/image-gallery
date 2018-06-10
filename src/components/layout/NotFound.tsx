import * as React from 'react'
import { Component } from 'react'

import Header from '../presentation/Header';
import { StaticContext } from 'react-router';

interface Props {
    staticContext: StaticContext
}

class NotFound extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentWillMount() {
        let { staticContext } = this.props;
        if (staticContext) {
            staticContext.statusCode = 404;
        }
    }
    
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body fill-height-or-more">
                    Not Found 404
                </div>
            </div>
        );
    }
}

export default NotFound;