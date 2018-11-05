import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
import draftToHtml from 'draftjs-to-html';
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
                params.content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                console.log(params)
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
                            {getFieldDecorator('place_type_code',
                                {
                                    rules: [{ type: "string", max: 20, message: "Không nhập quá 20 ký tự" },
                                    { type: "string", required: true, whitespace: true, message: "Nhập Chọn danh mục bài viết" },
                                    ],
                                }
                            )(
                                <Input placeholder="Nhập Chọn danh mục bài viết" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col className="formInputRow" span={24}>
                        <FormItem {...formItemLayout} label="Nhập tiêu đề bài viết">
                            {getFieldDecorator('place_type_code',
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
                        Create
                    </Button>
                    &nbsp;
                    <Button type="primary" className="text-right btn btn-success">
                        <Link to={'/place-type/list-place-type'}
                            className="nav-link" >Back</Link>
                    </Button>
                </Row>
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm