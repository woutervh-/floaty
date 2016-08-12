import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import RowSeparator from './RowSeparator';
import shallowEqual from 'shallowequal';

export default class Row extends React.Component {
    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    state = {
        growValues: []
    };

    componentWillMount() {
        this.resizeRowValues(React.Children.count(this.props.children));
    }

    componentWillReceiveProps(nextProps) {
        if (React.Children.count(nextProps.children) != this.state.growValues.length) {
            this.resizeRowValues(React.Children.count(nextProps.children));
        }
    }

    resizeRowValues(length) {
        const growValues = [];
        for (let i = 0; i < length; i++) {
            growValues.push(i < this.state.growValues.length ? this.state.growValues[i] : 1);
        }
        this.setState({growValues});
    }

    renderRowItems(children) {
        const result = [];
        const rows = React.Children.toArray(children);
        for (let i = 0; i < rows.length; i++) {
            if (i > 0) {
                result.push(<RowSeparator getBounds={this.getBoundsForSeparator.bind(this, i - 1)} onPositionChange={this.handlePositionChange.bind(this, i - 1)}/>);
            }
            const rowItem = rows[i];
            const growValue = this.state.growValues[i];
            const style = 'props' in rowItem && 'style' in rowItem.props && rowItem.props.style || {};
            const element = React.cloneElement(rowItem, {ref: 'row-item-' + i, style: {...style, flexGrow: growValue}});
            result.push(element);
        }
        return result;
    }

    getWidthForRowItemIndex(index) {
        return this.getWidthForRowItem(ReactDOM.findDOMNode(this.refs['row-item-' + index]));
    }

    getWidthForRowItem(rowItem) {
        const regExp = /^(\d+(\.\d+)?)px$/;
        return parseFloat(window.getComputedStyle(rowItem).getPropertyValue('width').match(regExp)[1]);
    }

    getBoundsForSeparator(index) {
        const widthA = this.getWidthForRowItemIndex(index);
        const widthB = this.getWidthForRowItemIndex(index + 1);
        return {min: -widthA, max: widthB};
    }

    handlePositionChange(index, offset) {
        const widthA = this.getWidthForRowItemIndex(index);
        const widthB = this.getWidthForRowItemIndex(index + 1);
        const widthSum = widthA + widthB;
        const growValuesSum = this.state.growValues[index] + this.state.growValues[index + 1];
        const fraction = (widthA + offset) / widthSum;
        const growValues = [...this.state.growValues];
        growValues[index] = fraction * growValuesSum;
        growValues[index + 1] = (1 - fraction) * growValuesSum;
        this.setState({growValues});
    }

    render() {
        const {children, className, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-row'], className)} {...other}>
            {this.renderRowItems(children).map((item, index) => React.cloneElement(item, {key: index}))}
        </div>;
    }
};
