import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import ListReadingComponent from '../../components/test/list_reading.jsx';
import { listQAPagination, removeQA, restoreQA, deleteQA, setLastSearchQA } from '../../actions/qa';
import { notification, Divider } from 'antd';
class ListReadingContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h3>Danh sách đề thi</h3>
                <Divider />
                <ListReadingComponent
                    {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listQA: state.qa.listQA,
        success: state.qa.success,
        msg: state.qa.msg,
        countDelete: state.qa.countDelete,
        countRemove: state.qa.countRemove,
        countRestore: state.qa.countRestore,
        countFetchPage: state.qa.countFetchPage,
        countUpdate: state.qa.countUpdate,
        lastSearchObj: state.qa.lastSearchObj,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listQAPagination: (params) => {
            dispatch(listQAPagination(params))
        },
        removeQA: (params) => {
            dispatch(removeQA(params))
        },
        restoreQA: (params) => {
            dispatch(restoreQA(params))
        },
        deleteQA: (params) => {
            dispatch(deleteQA(params))
        },
        setLastSearchQA: (param) => {
            dispatch(setLastSearchQA(param))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListReadingContainer);