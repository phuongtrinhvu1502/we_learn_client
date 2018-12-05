import React, { Component } from 'react';
import { connect } from 'react-redux';
import GrammarComponent from '../../components/grammar/grammar_component.jsx';
import { notification, Input, Divider } from 'antd';

class Grammar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <GrammarComponent {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Grammar);