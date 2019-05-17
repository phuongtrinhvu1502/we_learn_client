import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertCourse, updateCourse, fetchCourseById } from '../../actions/course';
import Article from '../../components/adminPanel/postCourse.jsx';
import { notification, Input, Divider } from 'antd';

class PostCourse extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>Đăng bài</h3>
                <Divider />
                <Article {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        courseItem: state.course.courseItem,
        actionName: state.course.actionName,
        countFetchById: state.course.countFetchById,
        msg: state.course.msg,
        success: state.course.success,
        countUpdate: state.course.countUpdate,
        data: state.course.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertCourse: (params) => {
            dispatch(insertCourse(params))
        },
        updateCourse: (params) => {
            dispatch(updateCourse(params))
        },
        fetchCourseById: (params) => {
            dispatch(fetchCourseById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostCourse);