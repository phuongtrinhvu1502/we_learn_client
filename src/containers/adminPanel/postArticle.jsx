import React, { Component } from 'react';
import { connect } from 'react-redux';

import Article from '../../components/adminPanel/postArticle.jsx';
import { notification, Input, Divider } from 'antd';

class PostArticle extends Component {
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostArticle);