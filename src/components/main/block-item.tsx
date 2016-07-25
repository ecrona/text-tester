import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Block } from './block.d';

interface Props extends React.Props<BlockItem> {
    block: Block;
    normalizeBlock: (block: Block) => void;
}

export class BlockItem extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);

        if (props.block.new) {
            setTimeout(() => props.normalizeBlock(props.block));
        }
    }

    public render() {
        return (
            <div className={ 'card-panel block ' + (this.props.block.new ? ' block-animation' : '') }>
                <div className="row valign-wrapper">
                    <div className="hide-on-small-only col m1">
                        <i className="material-icons">done</i>
                    </div>
                    <div className="col m2"></div>
                    <div className="col s12 m6">
                        <p>{ this.props.block.firstRow }</p>
                        <p>{ this.props.block.secondRow }</p>
                    </div>
                    <div className="col m3"></div>
                </div>
            </div>
        );
    }
}