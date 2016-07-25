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
    inputBlock: Block;
    activeRow: number;
    charactersLeft: number;
}

export class Main extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            blocks: [{
                firstRow: ' asd ',
                secondRow: ' asd ',
                new: true
            },{
                firstRow: ' asd ',
                secondRow: ' asd ',
                new: true
            },{
                firstRow: ' asd ',
                secondRow: ' asd ',
                new: true
            },{
                firstRow: ' asd ',
                secondRow: ' asd ',
                new: true
            },{
                firstRow: ' asd ',
                secondRow: ' asd ',
                new: true
            },{
                firstRow: ' asd ',
                secondRow: ' asd ',
                new: true
            }],
            inputBlock: {
                firstRow: '',
                secondRow: '',
                new: true
            },
            activeRow: 1,
            charactersLeft: 37
        };
    }

    private getBlockRest(inputBlock: Block, row: number): string {
        const rowName = row === 1 ? 'firstRow' : 'secondRow';
        const split = inputBlock[rowName].split(' ');
        const rest = split.splice(split.length - 1);

        inputBlock[rowName] = split.join(' ');
        console.log(rowName, split, rest, inputBlock[rowName])
        return rest;
    }

    private getCharactersLeft(activeRow: number, inputBlock: Block): number {
        return activeRow === 1 ?
            37 - inputBlock.firstRow.length
            : 37 - inputBlock.secondRow.length;
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

        // Adjust rows values
        if (inputBlock.firstRow.length > 37) {
            // Remove overflowing words from the first row ...
            const rest = this.getBlockRest(inputBlock, 1);
            // ... and unshift them into the second row
            inputBlock.secondRow = inputBlock
                .secondRow
                .split(' ');

            inputBlock.secondRow.unshift(rest);

            inputBlock.secondRow = inputBlock
                .secondRow
                .join(' ');

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
                firstRow: rest,
                secondRow: '',
                new: true
            };
            // Reset the active row
            activeRow = 1;
        }

        console.log(inputBlock)

        this.setState({
            blocks,
            inputBlock,
            activeRow,
            charactersLeft: this.getCharactersLeft(activeRow, inputBlock)
        });
    }

    public normalizeBlock(block: Block) {
        block.new = false;
        this.setState({ blocks: this.state.blocks });
    }

    public render() {
        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div  className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    { this.state.blocks.map((block, index) => (
                                        <BlockItem
                                            key={ index }
                                            block={ block }
                                            normalizeBlock={ this.normalizeBlock.bind(this) } />
                                    )) }
                                    <Input
                                        block={ this.state.inputBlock }
                                        activeRow={ this.state.activeRow }
                                        charactersLeft={ this.state.charactersLeft }
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