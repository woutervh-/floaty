import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ColumnSeparator from './ColumnSeparator';
import DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import {noOperation, updateGrowValues} from './actions';

export default class Column extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        growValues: React.PropTypes.array.isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    getHeightForColumnItem(index) {
        const columnItem = ReactDOM.findDOMNode(this.refs['column-item-' + index]);
        return parseFloat(window.getComputedStyle(columnItem)['height']);
    }

    getBoundsForSeparator(index) {
        const heightA = this.getHeightForColumnItem(index);
        const heightB = this.getHeightForColumnItem(index + 1);
        return {min: -heightA, max: heightB};
    }

    renderColumnItems(children) {
        const {growValues} = this.props;
        const result = [];
        const columns = React.Children.toArray(children);
        let growValuesSum = 0;
        for (let i = 0; i < columns.length; i++) {
            growValuesSum += growValues[i];
        }
        for (let i = 0; i < columns.length; i++) {
            if (i > 0) {
                result.push(<ColumnSeparator getBounds={this.getBoundsForSeparator.bind(this, i - 1)} onPositionChange={this.handlePositionChange.bind(this, i - 1)}/>);
            }
            const columnItem = columns[i];
            const growValue = growValues[i] / growValuesSum;
            const style = 'props' in columnItem && 'style' in columnItem.props && columnItem.props.style || {};
            const element = React.cloneElement(columnItem, {ref: 'column-item-' + i, style: {...style, flexGrow: growValue}});
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index, offset) {
        const widthA = this.getHeightForColumnItem(index);
        const widthB = this.getHeightForColumnItem(index + 1);
        const widthSum = widthA + widthB;
        const growValuesSum = this.props.growValues[index] + this.props.growValues[index + 1];
        const fraction = (widthA + offset) / widthSum;
        const growValues = [...this.props.growValues];
        growValues[index] = fraction * growValuesSum;
        growValues[index + 1] = (1 - fraction) * growValuesSum;
        this.props.dispatch(updateGrowValues(growValues));
    }

    resolveDropArea(position) {
        for (let i = 0; i < React.Children.count(this.props.children); i++) {
            const element = ReactDOM.findDOMNode(this.refs['column-item-' + i]);
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.refs['column-item-' + i].resolveDropArea(position);
            }
        }
        return {x: 0, y: 0, width: 0, height: 0, dispatch: noOperation, resolved: false};
    }

    render() {
        const {children, className, dispatch, growValues, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-column'], className)} {...other}>
            {this.renderColumnItems(children).map((item, index) => React.cloneElement(item, {key: index}))}
        </div>;
    }
};
