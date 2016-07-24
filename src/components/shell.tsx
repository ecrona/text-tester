import * as React from 'react';
import { Header } from './header/header';

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
            <Header
                assistance={ this.state.assistance }
                toggleAssistance={ this.toggleAssistance.bind(this) } />
        );
    }
}