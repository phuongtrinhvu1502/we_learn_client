import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertArticle, updateArticle, fetchArticleById } from '../../actions/article';
import Article from '../../components/adminPanel/postArticle.jsx';
import { notification, Input, Divider } from 'antd';

class viewArticle extends Component {
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
        articleItem: state.article.articleItem,
        actionName: state.article.actionName,
        countFetchById: state.article.countFetchById,
        msg: state.article.msg,
        success: state.article.success,
        countUpdate: state.article.countUpdate,
        data: state.article.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertArticle: (params) => {
            dispatch(insertArticle(params))
        },
        updateArticle: (params) => {
            dispatch(updateArticle(params))
        },
        fetchArticleById: (params) => {
            dispatch(fetchArticleById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(viewArticle);