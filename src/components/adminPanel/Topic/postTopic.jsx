import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { scrollToErrorForm } from '../../../actions/reuse_action/reuse';
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
            this.props.fetchTopicContentById(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchById > this.props.countFetchById) {
            this.props.form.setFieldsValue({
                atc_title: nextProps.articleItem.atc_title,
                at_id: nextProps.articleItem.at_id,
            })

            let contentBlock = htmlToDraft(nextProps.articleItem.atc_content);
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
                    description: "Thêm mới thành công"
                })
                this.props.history.push("/system-control/list-topic/")
            }
            else if (nextProps.actionName == "update") {
                notification.success({
                    message: "Success",
                    description: "Cập nhật thành công"
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
                params.atc_content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

                if (this.props.match.params.id == undefined)
                    this.props.insertTopicContent(params)
                else {
                    params.atc_id = this.props.match.params.id
                    this.props.updateTopicContent(params)
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

        return (
            <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit} >
                <Row>
                    <Col className="formInputRow" span={24}>
                        <FormItem {...formItemLayout} label="Loại đề tài">
                            {getFieldDecorator('at_id',
                                {
                                    rules: [
                                        { type: "number", required: true, whitespace: true, message: "Nhập Chọn Loại ngữ pháp" },
                                    ],
                                }
                            )(
                                <Select placeholder="Nhập Chọn Loại ngữ pháp">
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
                        <FormItem {...formItemLayout} label="Tiêu đề topic">
                            {getFieldDecorator('atc_title',
                                {
                                    rules: [{ type: "string", max: 20, message: "Không nhập quá 20 ký tự" },
                                    { type: "string", required: true, whitespace: true, message: "Nhập Tiêu đề topic" },
                                    ],
                                }
                            )(
                                <Input placeholder="Nhập Tiêu đề topic" />
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
                        <Link to={'/system-control/list-topic'}
                            className="nav-link" >Trở lại</Link>
                    </Button>
                </Row>
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm