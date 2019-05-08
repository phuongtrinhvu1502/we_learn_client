import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment, editComment, viewCourseById, listCommentCourseByPage } from '../../actions/viewCourse';
import QA from '../../components/grammar/view_course.jsx';
import { notification, Input, Divider } from 'antd';

class viewQA extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>{this.props.courseItem.course_title}</h3>
                <p>Đăng bởi: {this.props.courseItem.user_login}</p>
                <Divider />
                <QA {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        courseItem: state.viewCourse.courseItem,
        lstComment: state.viewCourse.lstComment,
        actionName: state.viewCourse.actionName,
        countFetchById: state.viewCourse.countFetchById,
        msg: state.viewCourse.msg,
        success: state.viewCourse.success,
        countUpdate: state.viewCourse.countUpdate,
        data: state.viewCourse.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (params) => {
            dispatch(postComment(params))
        },
        editComment: (params) => {
            dispatch(editComment(params))
        },
        viewCourseById: (params) => {
            dispatch(viewCourseById(params))
        },
        listCommentCourseByPage: (params) => {
            dispatch(listCommentCourseByPage(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(viewQA);