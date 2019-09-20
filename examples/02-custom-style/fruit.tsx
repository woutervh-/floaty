import * as React from 'react';

interface Props {
    fruit: string;
}

export class Fruit extends React.PureComponent<Props, never> {
    public render() {
        switch (this.props.fruit) {
            case 'Apple':
                return '🍎';
            case 'Banana':
                return '🍌';
            case 'Cherries':
                return '🍒';
        }
        return '💣';
    }
}
