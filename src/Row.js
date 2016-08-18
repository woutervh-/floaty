import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import RowSeparator from './RowSeparator';
import DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import {noOperation, updateGrowValues} from './actions';

export default class Row extends React.Component {
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

    renderRowItems(children) {
        const result = [];
        const rows = React.Children.toArray(children);
        for (let i = 0; i < rows.length; i++) {
            if (i > 0) {
                result.push(<RowSeparator getBounds={this.getBoundsForSeparator.bind(this, i - 1)} onPositionChange={this.handlePositionChange.bind(this, i - 1)}/>);
            }
            const rowItem = rows[i];
            const growValue = this.props.growValues[i];
            const style = 'props' in rowItem && 'style' in rowItem.props && rowItem.props.style || {};
            const element = React.cloneElement(rowItem, {ref: 'row-item-' + i, style: {...style, flexGrow: growValue}});
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index, offset) {
        const widthA = this.getWidthForRowItemIndex(index);
        const widthB = this.getWidthForRowItemIndex(index + 1);
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
            const element = ReactDOM.findDOMNode(this.refs['row-item-' + i]);
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.refs['row-item-' + i].resolveDropArea(position);
            }
        }
        return {x: 0, y: 0, width: 0, height: 0, dispatch: noOperation, resolved: false};
    }

    render() {
        const {children, className, dispatch, growValues, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-row'], className)} {...other}>
            {this.renderRowItems(children).map((item, index) => React.cloneElement(item, {key: index}))}
        </div>;
    }
};
