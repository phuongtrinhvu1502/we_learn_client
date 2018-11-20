import React, { Component } from 'react';
import { Button, Modal, Form, Input, Pagination, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import cookie from 'react-cookies'


class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {

    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        //set css for form item
        //note using col for divide col. 
        //default 24.
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        return (
            <div className="ant-row"> 
                <Row>
                    <Editor
                        placeholder="Insert comment ... "
                        editorState={this.state.editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor comment-box"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Row>
                <Row style={{ textAlign: 'right', marginTop: '5px' }}>
                    <Button size="small" type="primary" className="text-right btn btn-success" htmlType="submit">
                        Post Comment
                    </Button>
                </Row>
                <Row>
                    {
                        this.props.articleItem.listCommentByPage.map(item => {
                            return (
                                <div className="cmt-box col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                    <div className="cmt-user">
                                        <div className="cmt-user-info col-md-2 col-sm-2 col-xs-2 col-lg-2">
                                            <div className="cmt-user-avatar col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                                <img src="https://image.flaticon.com/icons/png/512/149/149071.png"
                                                    width="48" height="48" alt={item.user_login} />
                                            </div>
                                            <p className="user-information">
                                                {item.user_login}
                                            </p>
                                        </div>
                                        <div className="cmt-user-content col-md-10 col-sm-10 col-xs-10 col-lg-10">
                                            <p>Commented at: {item.created_date}</p>
                                            <p>{ReactHtmlParser(item.comment_content)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>
                <Row style={{ float: 'right', marginTop: "5px" }}>
                    <Pagination defaultCurrent={1} total={this.props.articleItem.total} pageSize={2} />
                </Row>
            </div>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm