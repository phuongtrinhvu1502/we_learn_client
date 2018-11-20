import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Pagination } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { scrollToErrorForm } from '../actions/reuse_action/reuse';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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
        // if (this.props.match.params.id != undefined) {
        //     this.props.fetchArticleById(this.props.match.params.id)
        // }
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
                console.log(params)
                // if (this.props.match.params.id == undefined)
                //     this.props.insertArticle(params)
                // else {
                //     params.article_id = this.props.match.params.id
                //     this.props.updateArticle(params)
                // }
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

        const articleItem = [
            {
                article_id: 1, img_url: "https://cdn-images-1.medium.com/max/1200/1*EPHVYygppZ2py-HQ57CSqA.jpeg",
                article_title: "Tiếng anh cơ bản cho người mới bắt đầu", article_content: "Nội dung tiếng anh căn bản cho người"
                    + " mới bắt đầu bao gồm những điều như sau", created_date: "10-11-2018", created_by_name: "hongpx"
            },
            {
                article_id: 2, img_url: "https://cdn-images-1.medium.com/max/1200/1*EPHVYygppZ2py-HQ57CSqA.jpeg",
                article_title: "Tiếng anh cơ bản cho người mới bắt đầu", article_content: "Nội dung tiếng anh căn bản cho người"
                    + " mới bắt đầu bao gồm những điều như sau", created_date: "10-11-2018", created_by_name: "hongpx"
            },
            {
                article_id: 3, img_url: "https://cdn-images-1.medium.com/max/1200/1*EPHVYygppZ2py-HQ57CSqA.jpeg",
                article_title: "Tiếng anh cơ bản cho người mới bắt đầu", article_content: "Nội dung tiếng anh căn bản cho người"
                    + " mới bắt đầu bao gồm những điều như sau mới bắt đầu bao gồm những điều như sau mới bắt đầu bao gồm những điều như sau", created_date: "10-11-2018", created_by_name: "hongpx"
            },
            {
                article_id: 4, img_url: "https://cdn-images-1.medium.com/max/1200/1*EPHVYygppZ2py-HQ57CSqA.jpeg",
                article_title: "Tiếng anh cơ bản cho người mới bắt đầu", article_content: "Nội dung tiếng anh căn bản cho người"
                    + " mới bắt đầu bao gồm những điều như sau", created_date: "10-11-2018", created_by_name: "hongpx"
            },
            {
                article_id: 5, img_url: "https://cdn-images-1.medium.com/max/1200/1*EPHVYygppZ2py-HQ57CSqA.jpeg",
                article_title: "Tiếng anh cơ bản cho người mới bắt đầu", article_content: "Nội dung tiếng anh căn bản cho người"
                    + " mới bắt đầu bao gồm những điều như sau mới bắt đầu bao gồm những điều như sau mới bắt đầu bao gồm những điều như sau", created_date: "10-11-2018", created_by_name: "hongpx"
            },
        ]

        return (
            <div className="ant-row">
                {articleItem.map(item => {
                    return (
                        <div href="#/dashboard" className="box-article col-md-12 col-sm-12 col-xs-12 col-lg-12 nopadding">
                            <div className="article-image col-md-3 col-sm-3 col-xs-3 col-lg-3 pdl0">
                                <img src={item.img_url} />
                            </div>
                            <div className="article-content col-md-9 col-sm-9 col-xs-9 col-lg-9 nopadding">
                                <h4>{item.article_title}</h4>
                                <p>{item.article_content}</p>
                            </div>
                        </div>
                    )
                })
                }
                <Row style={{ float: 'right', marginTop: "5px" }}>
                    <Pagination defaultCurrent={1} total={10} pageSize={5} />
                </Row>
            </div>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm