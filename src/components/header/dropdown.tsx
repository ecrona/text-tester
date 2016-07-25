import * as React from 'react';

interface Props extends React.Props<Dropdown> {
    assistance: boolean;
    toggleAssistance: () => void;
}

export class Dropdown extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        console.log(props)
    }

    public render() {
        return (
            <ul className="dropdown-content">
                <li><a onClick={ this.props.toggleAssistance }>
                    <i className="material-icons">
                        { this.props.assistance ? 'done' : 'clear' }
                    </i>
                    <span>Assistance</span>
                </a></li>
            </ul>
        );
    }
}