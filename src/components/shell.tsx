import * as React from 'react';
import { Header } from './header/header';
import { Main } from './main/main';

interface State {
    assistance: boolean;
}

export class Shell extends React.Component<any, State> {
    constructor() {
        super();

        this.state = {
            assistance: true
        };
    }

    public toggleAssistance() {
        this.setState({ assistance: !this.state.assistance });
    }

    public render() {
        return (
            <div>
                <Header
                    assistance={ this.state.assistance }
                    toggleAssistance={ this.toggleAssistance.bind(this) } />
                <Main
                    assistance={ this.state.assistance } />
            </div>
        );
    }
}