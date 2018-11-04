import React, { Component } from 'react';
import { connect } from 'react-redux';

import Present from '../../components/grammar/present_component.jsx';
import { notification, Input, Divider } from 'antd';

class Dashboard extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        document.title = "Present Tenses"
    }

    render() {
        return (
            <div>
                <h3>Thì hiện tại</h3>
                <Divider />
                <Present {...this.props}
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