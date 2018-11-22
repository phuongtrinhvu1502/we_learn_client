import React, { Component } from 'react';
import { connect } from 'react-redux';
import Homepage from '../components/dashboard.jsx';
import { notification, Input, Divider } from 'antd';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>Tin mới</h3>
                <Divider />
                <Homepage {...this.props}
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);