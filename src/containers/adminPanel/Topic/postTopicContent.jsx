import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertTopicContent, updateTopicContent, fetchTopicContentById } from '../../../actions/topic_content';
import TopicContent from '../../../components/adminPanel/Topic/postTopicContent.jsx';
import { notification, Input, Divider } from 'antd';

class PostTopicContent extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>Nội dung bài viết</h3>
                <Divider />
                <TopicContent {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        articleItem: state.topicContent.articleItem,
        actionName: state.topicContent.actionName,
        countFetchById: state.topicContent.countFetchById,
        msg: state.topicContent.msg,
        success: state.topicContent.success,
        countUpdate: state.topicContent.countUpdate,
        data: state.topicContent.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertTopicContent: (params) => {
            dispatch(insertTopicContent(params))
        },
        updateTopicContent: (params) => {
            dispatch(updateTopicContent(params))
        },
        fetchTopicContentById: (params) => {
            dispatch(fetchTopicContentById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTopicContent);