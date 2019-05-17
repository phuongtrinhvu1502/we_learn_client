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
            attachment: []
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.id != undefined) {
            this.props.fetchCourseById(this.props.match.params.id)
        }
        // this.props.getAllListArticleTopic();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchById > this.props.countFetchById) {
            this.props.form.setFieldsValue({
                course_title: nextProps.courseItem.course_title,
            })

            let contentBlock = htmlToDraft(nextProps.courseItem.course_content);
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
                this.props.history.push("/system-content/list-course/")
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
                let params = new FormData();
                let paramString = JSON.parse(JSON.stringify(values))
                paramString.course_content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

                if (this.state.attachment != null && this.state.attachment.length > 0) {
                    // chỉ gửi những file thêm vào từ giao diện
                    this.state.attachment.forEach(function (element) {
                        if (!element.uploaded)
                            params.append("file", element.originFileObj)
                    });
                }
                params.append("course", JSON.stringify(paramString))

                if (this.props.match.params.id == undefined)
                    this.props.insertCourse(params)
                else {
                    params.course_id = this.props.match.params.id
                    this.props.updateCourse(params)
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

        const props_upload = {
            onChange: (info) => {
                let listFile = info.fileList;
                listFile.filter((value, key) => {
                    if (value.status == "error") {
                        listFile.splice(key, 1)
                    }
                })

                let listFileUploaded = listFile.filter((item) => {
                    return item.uploaded === true
                })
                if (listFile.length - listFileUploaded.length > 1 - listFileUploaded.length) {
                    listFile.splice(0, listFile.length - 1)
                    if (!this.checkFive) {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Upload tối đa 1 file'
                        });
                        this.checkFive = true;
                    }
                }
                this.setState({ attachment: listFile })
            },
            beforeUpload: (file) => {
                // const isJPG = file.type.includes("image/");
                const isLt1M = file.size / 1024 / 1024 < 25;
                if (!isLt1M) {
                    notification.error({
                        message: 'Thông báo',
                        description: 'File upload phải nhỏ hơn 25MB'
                    });
                    file.status = "error";
                }
                return false;
            },
            fileList: this.state.attachment,
            listType: "picture"
        };


        return (
            <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit} >
                <Row>
                    <Col className="formInputRow" span={24}>
                        <FormItem {...formItemLayout} label="Nhập tiêu đề bài học">
                            {getFieldDecorator('course_title',
                                {
                                    rules: [{ type: "string", max: 50, message: "Không nhập quá 50 ký tự" },
                                    { type: "string", required: true, whitespace: true, message: "Nhập Nhập tiêu đề bài học" },
                                    ],
                                }
                            )(
                                <Input placeholder="Nhập Nhập tiêu đề bài học" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col className="formInputRow" span={24} >
                        <FormItem {...formItemLayout} label="Video bài học">
                            {getFieldDecorator('images',
                                {
                                    rules: [{ required: true, message: "Upload video bài học" },
                                    ],
                                }
                            )(
                                <div>
                                    <Upload {...props_upload} fileList={this.state.attachment}>
                                        <Button type="primary" className="btn btn-success" id="images"> Add</Button>
                                    </Upload>
                                </div>
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
                        <Link to={'/system-content/list-atc'}
                            className="nav-link" >Trở lại</Link>
                    </Button>
                </Row>
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm