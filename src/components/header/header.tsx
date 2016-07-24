import * as React from 'react';
import { Dropdown } from './dropdown';

interface Props extends React.Props<Header> {
    assistance: boolean;
    toggleAssistance: () => void;
}

interface State {
    dropdownActive: boolean;
}

export class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dropdownActive: false
        };
    }

    private toggleDropdown() {
        this.setState({ dropdownActive: !this.state.dropdownActive });
    }

    public render() {
        return (
            <header>
                <nav>
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">Text Tester</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li>
                                    <a><i onClick={ this.toggleDropdown.bind(this) } className="material-icons">menu</i></a>
                                    { this.state.dropdownActive ?
                                        <Dropdown
                                            assistance={ this.props.assistance }
                                            toggleAssistance={ this.props.toggleAssistance } />
                                    : '' }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}