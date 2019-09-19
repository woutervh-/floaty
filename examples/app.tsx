import * as React from 'react';
import { Basic } from './01-basic/basic';
import { CustomStyle } from './02-custom-style/custom-style';

const examples: { label: string, component: React.ComponentType }[] = [
    { label: 'Basic', component: Basic },
    { label: 'Custom style', component: CustomStyle }
];

interface State {
    example: number;
}

export class App extends React.PureComponent<{}, State> {
    public state: State = {
        example: 1
    };

    public renderExample() {
        const example = examples[this.state.example];
        return <example.component />;
    }

    public renderOptions() {
        return <div>
            {examples.map((example, index) => {
                return <button key={index} onClick={this.handleClick(index)}>{example.label}</button>;
            })}
        </div>;
    }

    public render() {
        return <React.Fragment>
            <h3>Examples</h3>
            {this.renderOptions()}
            <hr />
            {this.renderExample()}
        </React.Fragment>;
    }

    private handleClick = (index: number) => () => {
        this.setState({ example: index });
    }
}
