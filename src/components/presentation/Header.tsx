import * as React from 'react'

import '../../styles/components/Header.scss';

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <img src="/img/logo.png" className="header-logo" alt="logo" />
            </header>
        )
    }
}