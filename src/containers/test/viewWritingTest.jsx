import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTestById } from '../../actions/writingTestTopic';
import { viewWritingTestById, postComment, editComment, listCommentByPage } from '../../actions/viewWritingTest';
import ViewTest from '../../components/test/view_writing_test.jsx';
import { notification, Input, Divider } from 'antd';

class PostTest extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        if (this.props.match.params.id != undefined)
            this.props.fetchTestById(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <h3>{this.props.testItem.wt_title}</h3>
                <Divider />
                <ViewTest {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        testItem: state.writingTestTopic.testItem,
        actionName: state.writingTestTopic.actionName,
        countFetchById: state.writingTestTopic.countFetchById,
        msg: state.writingTestTopic.msg,
        success: state.writingTestTopic.success,
        countUpdate: state.writingTestTopic.countUpdate,
        data: state.writingTestTopic.data,

        qaItem: state.viewWritingTest.qaItem,
        lstComment: state.viewWritingTest.lstComment,
        actionName: state.viewWritingTest.actionName,
        countFetchById: state.viewWritingTest.countFetchById,
        msg: state.viewWritingTest.msg,
        success: state.viewWritingTest.success,
        countUpdate: state.viewWritingTest.countUpdate,
        data: state.viewWritingTest.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTestById: (params) => {
            dispatch(fetchTestById(params))
        },
        viewWritingTestById: (params) => {
            dispatch(viewWritingTestById(params))
        },
        postComment: (params) => {
            dispatch(postComment(params))
        },
        editComment: (params) => {
            dispatch(editComment(params))
        },
        listCommentByPage: (params) => {
            dispatch(listCommentByPage(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTest);