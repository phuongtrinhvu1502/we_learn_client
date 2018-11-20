import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment, editComment, viewArticleById } from '../actions/viewArticle';
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
        articleItem: state.viewArt.articleItem,
        actionName: state.viewArt.actionName,
        countFetchById: state.viewArt.countFetchById,
        msg: state.viewArt.msg,
        success: state.viewArt.success,
        countUpdate: state.viewArt.countUpdate,
        data: state.viewArt.data,
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
        viewArticleById: (params) => {
            dispatch(viewArticleById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);