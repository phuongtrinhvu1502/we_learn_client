import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import ViewReadingComponent from '../../components/test/view_test.jsx';
import { insertTest, fetchTestById } from '../../actions/user_test';
import { notification, Divider } from 'antd';
class ViewReadingContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ViewReadingComponent
                    {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        testItem: state.user_test.testItem,
        actionName: state.user_test.actionName,
        countUpdate: state.user_test.countUpdate,
        countFetchById: state.user_test.countFetchById,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertTest: (params) => {
            dispatch(insertTest(params))
        },
        fetchTestById: (params) => {
            dispatch(fetchTestById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewReadingContainer);