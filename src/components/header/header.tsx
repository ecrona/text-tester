import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dropdown } from './dropdown';

interface Props extends React.Props<Header> {
    assistance: boolean;
    toggleAssistance: () => void;
}

interface State {
    dropdownActive: boolean;
}

interface Refs {
    [key: string]: (Element);
    menu: HTMLElement;
    dropdown: HTMLElement;
}

export class Header extends React.Component<Props, State> {
    public refs: Refs;

    constructor(props: Props) {
        super(props);

        this.state = {
            dropdownActive: false
        };
    }

    private contains(container, element: HTMLElement): boolean {
        let containerElement = ReactDOM.findDOMNode(container);
        
        return containerElement.contains(element);
    }
    
    private onDocumentClick = (e: Event) => {
		if (!this.contains(this.refs.menu, e.target as HTMLElement)) {
			this.toggleDropdown();
		}
    }

    private toggleDropdown() {
        const active = !this.state.dropdownActive;

        if (active) {
            document.addEventListener('click', this.onDocumentClick);
        } else {
            document.removeEventListener('click', this.onDocumentClick);
        }

        this.setState({ dropdownActive: active });
    }

    public render() {
        return (
            <header>
                <nav>
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">Text Tester</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li ref="menu">
                                    <a onClick={ this.toggleDropdown.bind(this) }>
                                        <i className="material-icons">menu</i>
                                    </a>
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