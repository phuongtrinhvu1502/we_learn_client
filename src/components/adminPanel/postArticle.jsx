import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
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
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.id != undefined) {
            this.props.fetchArticleById(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchById > this.props.countFetchById) {
            this.props.form.setFieldsValue({
                article_title: nextProps.articleItem.article_title,
                article_type: nextProps.articleItem.article_type,
            })

            let contentBlock = htmlToDraft(nextProps.articleItem.article_content);
            if (contentBlock) {
                let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                let editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        }
        if (nextProps.countUpdate > this.props.countUpdate) {
            if (nextProps.actionName == "insert") {
                notification.success({
                    message: "Success",
                    description: "Insert Article Success"
                })
                this.props.history.push("/system-control/list-article/")
            }
            else if (nextProps.actionName == "update") {
                notification.success({
                    message: "Success",
                    description: "Update Article Success"
                })
            }
        }
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = JSON.parse(JSON.stringify(values))
                params.article_content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

                if (this.props.match.params.id == undefined)
                    this.props.insertArticle(params)
                else {
                    params.article_id = this.props.match.params.id
                    this.props.updateArticle(params)
                }
            } else {
                scrollToErrorForm(err)
            }
        });
    }

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
        const html = '<div>Example <b>HTML</b> string</div>';

        return (
            <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit} >
                <Row>
                    <Col className="formInputRow" span={24}>
                        <FormItem {...formItemLayout} label="Danh mục bài viết">
                            {getFieldDecorator('article_type',
                                {
                                    rules: [
                                        { type: "number", required: true, whitespace: true, message: "Nhập Chọn danh mục bài viết" },
                                    ],
                                }
                            )(
                                <Select placeholder="Nhập Chọn danh mục bài viết">
                                    <Option key={1} value={1}>News</Option>
                                    <Option key={2} value={2}>Grammar</Option>
                                    <Option key={3} value={3}>Event</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col className="formInputRow" span={24}>
                        <FormItem {...formItemLayout} label="Nhập tiêu đề bài viết">
                            {getFieldDecorator('article_title',
                                {
                                    rules: [{ type: "string", max: 20, message: "Không nhập quá 20 ký tự" },
                                    { type: "string", required: true, whitespace: true, message: "Nhập Nhập tiêu đề bài viết" },
                                    ],
                                }
                            )(
                                <Input placeholder="Nhập Nhập tiêu đề bài viết" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Row>

                <Row style={{ textAlign: 'center', marginTop: '5px' }}>
                    <Button type="primary" className="text-right btn btn-success" htmlType="submit">
                        {this.props.match.params.id == undefined ? "Create" : "Update"}
                    </Button>
                    &nbsp;
                    <Button type="primary" className="text-right btn btn-success">
                        <Link to={'/system-control/list-article'}
                            className="nav-link" >Trở lại</Link>
                    </Button>
                </Row>
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm