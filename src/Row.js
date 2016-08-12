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
        offsets: []
    };

    componentWillMount() {
        this.resizeOffsets(this.props.children.length - 1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.length != this.state.offsets.length) {
            this.resizeOffsets(nextProps.children.length - 1);
        }
    }

    componentDidMount() {
        this.ensureOffsets();
    }

    componentDidUpdate() {
        this.ensureOffsets();
    }

    resizeOffsets(length) {
        const offsets = [];
        for (let i = 0; i < length; i++) {
            offsets.push(i < this.state.offsets.length ? this.state.offsets[i] : 0);
        }
        this.setState({offsets});
    }

    ensureOffsets() {
        const offsets = [...this.state.offsets];
        for (let i = 0; i < this.state.offsets.length; i++) {
            const rowItem = ReactDOM.findDOMNode(this.refs['row-item-' + i]);
            const style = window.getComputedStyle(rowItem);
            const regExp = /^(\d+(\.\d+)?)px$/;
            const flexBasis = parseFloat(style.getPropertyValue('flex-basis').match(regExp)[1]);
            const width = parseFloat(style.getPropertyValue('width').match(regExp)[1]);
            if (width != flexBasis) {
                offsets[i] += width - flexBasis;
            }
        }
        if (!shallowEqual(this.state.offsets, offsets)) {
            this.setState({offsets});
        }
    }

    renderRowItems(rows) {
        const result = [];
        for (let i = 0; i < rows.length; i++) {
            if (i > 0) {
                result.push(<RowSeparator onPositionChange={this.handlePositionChange.bind(this, i - 1)}/>);
            }
            const rowItem = rows[i];
            const offset = i == rows.length - 1 ? 0 : this.state.offsets[i];
            const style = 'style' in rowItem.props && rowItem.props.style || {};
            const basis = 'style' in rowItem.props && 'flexBasis' in rowItem.props.style && rowItem.props.style.flexBasis || '0px';
            const element = React.cloneElement(rowItem, {ref: 'row-item-' + i, style: {...style, flexBasis: `calc(${basis} + ${offset}px)`}});
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index, offset) {
        const offsets = [...this.state.offsets];
        offsets[index] += offset;
        this.setState({offsets});
    }

    render() {
        const {children, className, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-row'], className)} {...other}>
            {this.renderRowItems(children).map((item, index) => React.cloneElement(item, {key: index}))}
        </div>;
    }
};
