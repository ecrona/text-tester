import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BlockItem } from './block-item';
import { Input } from './input';

import { Block } from './block.d';

interface Props extends React.Props<Main> {
    assistance: boolean;
}

interface State {
    blocks: Array<Block>;
    inputActive: boolean;
    inputBlock: Block;
    activeRow: number;
    charactersLeft: number;
}

interface Refs {
    [key: string]: (Element);
    card: HTMLElement;
}

export class Main extends React.Component<Props, State> {
    public refs: Refs;

    constructor(props: Props) {
        super(props);

        this.state = {
            blocks: [],
            inputActive: false,
            inputBlock: {
                firstRow: '',
                secondRow: '',
                new: true
            },
            activeRow: 1,
            charactersLeft: 37
        };
    }

    private getBlockRest(inputBlock: Block, row: number): Array<string> {
        const rowName = row === 1 ? 'firstRow' : 'secondRow';
        const split = inputBlock[rowName].split(' ');
        const rest = split.splice(split.length - 1);

        inputBlock[rowName] = split.join(' ');
        return rest;
    }

    private getCharactersLeft(activeRow: number, inputBlock: Block): number {
        return activeRow === 1 ?
            37 - inputBlock.firstRow.length
            : 37 - inputBlock.secondRow.length;
    }

    public setInputActive(active: boolean) {
        this.setState({ inputActive: active } as State);
    }

    public changeInputText(text: string) {
        const blocks = this.state.blocks;
        // Split the rows up from the text string
        const rows = text.split('\n');
        // Set initial, unmodified input row values
        let inputBlock = {
            firstRow: rows[0],
            secondRow: rows[1] || '',
            new: true
        };
        // Set the active row
        let activeRow = this.state.activeRow;

        // Enter (new line) was pressed
        if (rows.length > 2) {
            if (activeRow === 2) {
                // If the active row was the second row, consider it a block change
                blocks.push(inputBlock);
                // Create a new input with the rest
                inputBlock = {
                    firstRow: '',
                    secondRow: '',
                    new: true
                };
            }
            
            // Switch active row
            activeRow = activeRow === 1 ? 2 : 1;
        }

        // Adjust rows values
        if (inputBlock.firstRow.length > 37) {
            // Remove overflowing words from the first row
            const rest = this.getBlockRest(inputBlock, 1);
            // Split the current words from the second row up into an array
            let split = inputBlock
                .secondRow
                .split(' ');

            if (rest.length) {
                // Unshift all the rest words
                split.unshift(...rest);
            }

            // Join the newly merged second row up whilst filtering
            // out empty words to nullify post-space possibilities
            inputBlock.secondRow = split.filter((word) => word !== '').join(' ');

            activeRow = 2;
        }

        // Have we reached the maximum length for the second row?
        if (inputBlock.secondRow.length > 37) {
            // Remove overflowing words from the second row
            const rest = this.getBlockRest(inputBlock, 2);
            // Push in the finished input block into the block list
            blocks.push(inputBlock);
            // Create a new input with the rest
            inputBlock = {
                firstRow: rest[0],
                secondRow: '',
                new: true
            };
            // Reset the active row
            activeRow = 1;
        }

        // Set our calculated state and set appropriate scroll position
        this.setState({
            blocks,
            inputBlock,
            activeRow,
            charactersLeft: this.getCharactersLeft(activeRow, inputBlock)
        } as State, () => this.refs.card.scrollTop = this.refs.card.scrollHeight);
    }

    public normalizeBlock(block: Block) {
        block.new = false;
        this.setState({ blocks: this.state.blocks } as State);
    }

    public render() {
        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div  className="col s12">
                            <div ref="card" className="card">
                                <div className="card-content">
                                    { this.state.blocks.map((block, index) => (
                                        <BlockItem
                                            key={ index }
                                            block={ block }
                                            normalizeBlock={ this.normalizeBlock.bind(this) } />
                                    )) }
                                    <Input
                                        assistance={ this.props.assistance }
                                        active={ this.state.inputActive }
                                        block={ this.state.inputBlock }
                                        activeRow={ this.state.activeRow }
                                        charactersLeft={ this.state.charactersLeft }
                                        setActive={ this.setInputActive.bind(this) }
                                        changeText={ this.changeInputText.bind(this) } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}