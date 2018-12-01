import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {
    Collapse, Button, Modal, Form, Input, Table, Col, Select, InputNumber, Upload,
    notification, Icon, Row, Divider, Popconfirm
} from 'antd';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'
import { scrollToErrorForm, validateInputNumber } from '../../actions/reuse_action/reuse';
import axios from 'axios';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;


class GeneralInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            lst_answer: [],
            lstQuestion: [],
            pagination: {
                page: 1,
                pageSize: 10,
                position: 'both'
            },
            ta_content: undefined,
        }
        this.editRecordAnswer = {};
        this.editRecordQuestion = null;
        this.lstPermission = cookie.load('lstPermission') || [];
        this.disableUpdate = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalQuestionCancel = this.modalQuestionCancel.bind(this)
        this.showQuestionModal = this.showQuestionModal.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
        this.deleteQuestion = this.deleteQuestion.bind(this)
        this.modalAnswerCancel = this.modalAnswerCancel.bind(this)
        this.showModalAnswer = this.showModalAnswer.bind(this)
        this.addAnswer = this.addAnswer.bind(this)
        this.deleteAnswer = this.deleteAnswer.bind(this)
        this.changeInputAnswer = this.changeInputAnswer.bind(this)
        this.createTest = this.createTest.bind(this)
    }

    setIndexArrObject(listObj) {
        let i = 0;
        listObj.forEach(function (element) {
            element.index = i++;
        })
        return listObj
    }

    modalQuestionCancel(e) {
        this.setState({
            modalQuestionVisible: false,
            lst_answer: []
        });
        this.editRecordQuestion = null;
    }

    showQuestionModal(record) {
        if (record != undefined) {
            this.setState({
                lst_answer: record.lst_answer
            })
            this.editRecordQuestion = record;
        }
        this.setState({
            modalQuestionVisible: true,
        });
    }

    addQuestion(newEdit) {
        newEdit.is_change = true;
        let oldList = [...this.state.lstQuestion];
        let findEdit = oldList.findIndex(item => newEdit.index === item.index);
        if (findEdit != -1) {
            Object.assign(oldList.filter(item => newEdit.index === item.index)[0], newEdit);
        }
        else {
            oldList.push(newEdit);
        }
        oldList = this.setIndexArrObject(oldList);
        this.setState({
            lstQuestion: oldList,
        })
        this.modalQuestionCancel()
    }

    deleteQuestion(tq_id, index) {
        let arrlstQuestion = [...this.state.lstQuestion]
        //Xử lý xóa
        arrlstQuestion.splice(index, 1)
        arrlstQuestion = this.setIndexArrObject(arrlstQuestion);
        this.setState({
            lstQuestion: arrlstQuestion
        })

        if (tq_id != undefined) {
            let params = {
                tq_id: tq_id
            }
            this.props.deleteQuestionById(params)
        }
    }

    modalAnswerCancel(e) {
        this.setState({
            modalAnswerVisible: false,
            ta_content: undefined,
        });
        this.editRecordAnswer = {};
    }

    showModalAnswer(record) {
        if (record != undefined) {
            this.editRecordAnswer = record;
            this.setState({
                ta_content: record.ta_content
            })
        }
        this.setState({
            modalAnswerVisible: true,
        });
    }

    changeInputAnswer(value) {
        this.setState({
            ta_content: value.target.value
        })
    }

    addAnswer() {
        if (this.state.ta_content != undefined && this.state.ta_content.trim() != "") {
            Object.assign(this.editRecordAnswer, { ta_content: this.state.ta_content })
            this.editRecordAnswer.is_change = true;
            let oldList = [...this.state.lst_answer];
            let findEdit = oldList.findIndex(item => this.editRecordAnswer.index === item.index);
            if (findEdit != -1) {
                Object.assign(oldList.filter(item => this.editRecordAnswer.index === item.index)[0], this.editRecordAnswer);
            }
            else {
                oldList.push(this.editRecordAnswer);
            }
            oldList = this.setIndexArrObject(oldList);
            this.setState({
                lst_answer: oldList
            })
            this.modalAnswerCancel();
        } else {
            notification.warn({
                message: "Thông báo",
                description: "Câu trả lời không được để trống"
            })
        }
    }

    deleteAnswer(ta_id, index) {
        let arrLstAnswer = [...this.state.lst_answer]
        //Xử lý xóa
        arrLstAnswer.splice(index, 1)
        arrLstAnswer = this.setIndexArrObject(arrLstAnswer);
        this.setState({
            lst_answer: arrLstAnswer
        })

        if (ta_id != undefined) {
            let params = {
                ta_id: ta_id
            }
            // this.props.deleteQuestionById(params)
        }
    }

    handleSubmit(e) {
        this.setState({
            disableUpdate: true
        })
        setTimeout(() => {
            this.setState({
                disableUpdate: false
            })
        }, 300);
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = { ...values }
                if (this.editRecordQuestion != null)
                    params.index = this.editRecordQuestion.index
                params.lst_answer = this.state.lst_answer
                this.addQuestion(params)
            } else {
                scrollToErrorForm(err)
            }
        });
    }

    createTest() {
        console.log(this.state.lstQuestion)
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

        const columns = [
            {
                title: '#', key: "index", width: '4%', dataIndex: "index", align: 'center',
                render: (text, record, index) => (
                    <span>{(index + 1) + (this.state.pagination.page - 1) * this.state.pagination.pageSize}</span>
                )
            },
            {
                title: 'Câu hỏi', dataIndex: "test_name",
            }, {
                title: 'Số lượng câu trả lời', dataIndex: "lst_answer", align: 'center', width: '20%',
                render: (text, record) => {
                    return text.length
                }
            },
            {
                title: 'Chức năng', dataIndex: "action", width: '10%', align: 'center',
                render: (text, record, index) => {
                    return (
                        (record.tq_id != undefined) && (record.tq_id > 0) ?
                            <div>
                                <a onClick={() => this.showQuestionModal(record, record.index)}><i className="fa fa-edit"></i></a>
                                <Divider type="vertical" />
                                <Popconfirm className="nav-link" title="Bạn có muốn xóa phân xưởng này không?" onConfirm={() => this.deleteQuestion(record.tq_id, record.index)}>
                                    <a href="#"><i className="far fa-trash-alt"></i></a>
                                </Popconfirm>
                            </div>
                            :
                            <div>
                                <a onClick={() => this.showQuestionModal(record, record.index)}><i className="fa fa-edit"></i></a>
                                <Divider type="vertical" />
                                <a onClick={() => this.deleteQuestion(record.tq_id, record.index)}><i className="far fa-trash-alt"></i></a>
                            </div>
                    )
                },
            }
        ]

        const columnsQuestion = [
            {
                title: '#', key: "index", width: '5%', dataIndex: "index",
                render: (text, record, index) => (
                    <span>{index + 1}</span>
                )
            }, {
                title: 'Câu trả lời', dataIndex: "ta_content",
            }, {
                title: 'Chức năng', dataIndex: "action", width: '15%', align: 'center',
                render: (text, record, index) => {
                    return (
                        <div>
                            <a onClick={() => this.showModalAnswer(record, index)}><i className="fa fa-edit"></i></a>
                        </div>
                    )
                },
            }
        ]

        return (
            <span>
                <Modal className="modal-question"
                    visible={this.state.modalAnswerVisible}
                    title="Nhập câu trả lời"
                    onCancel={this.modalAnswerCancel}
                    destroyOnClose={true}
                    maskClosable={false}
                    footer={[
                        <Button onClick={this.addAnswer}>Cập nhật</Button>
                    ]}
                >
                    <Row>
                        <Col className="formInputRow" span={24} >
                            <FormItem {...formItemLayout} label="Câu Trả lời">
                                <TextArea placeholder="Nhập Câu Trả lời"
                                    onChange={this.changeInputAnswer}
                                    value={this.state.ta_content}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>
                <Modal className="modal-customer"
                    visible={this.state.modalQuestionVisible}
                    title="Tạo câu hỏi"
                    onCancel={this.modalQuestionCancel}
                    destroyOnClose={true}
                    maskClosable={false}
                    footer={null}
                >
                    <Form layout="vertical" className="contact-modal" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col className="formInputRow" span={24} >
                                <FormItem {...formItemLayout} label="Câu hỏi">
                                    {getFieldDecorator('test_name', {
                                        rules: [
                                            { required: true, whitespace: true, message: "Nhập Câu hỏi" },
                                            { max: 500, message: "Câu hỏi tối đa 500 ký tự" }],
                                        initialValue: this.editRecordQuestion == null ? undefined : this.editRecordQuestion.test_name
                                    })(
                                        <TextArea placeholder="Nhập Câu hỏi" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col className="formInputRow" span={24} >
                                <FormItem {...formItemLayout} label="Câu trả lời đúng">
                                    {getFieldDecorator('correct_answer', {
                                        rules: [
                                            { type: 'number', required: true, whitespace: true, message: "Chọn câu trả lời đúng" },
                                        ],
                                        initialValue: this.editRecordQuestion == null ? undefined : this.editRecordQuestion.correct_answer
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="Chọn câu trả lời đúng"
                                        >
                                            {
                                                this.state.lst_answer.map(item =>
                                                    <Select.Option key={item.index} value={item.index}>{item.ta_content}</Select.Option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Button type="primary" key="add-contact" size='large' className="margin-bottom-5" onClick={() => this.showModalAnswer(undefined)}>
                            Thêm đáp án
				            </Button>
                        <Table
                            size='small'
                            className='table-provider'
                            columns={columnsQuestion}
                            rowKey="index"
                            bordered
                            // pagination={this.state.paginationTrans}
                            // onChange={this.changeTableHandle}
                            dataSource={this.state.lst_answer}
                            scrollY={500} />
                        <Row style={{ textAlign: "right", marginTop: '10px' }}>
                            <Button htmlType="submit">Cập nhật</Button>
                        </Row>
                    </Form>
                </Modal>
                <Button type="primary" key="add-contact" size='large' className="margin-bottom-5" onClick={() => this.showQuestionModal(undefined)}>
                    Thêm câu hỏi
				</Button>
                <Table
                    size='small'
                    className='table-provider'
                    dataSource={this.state.lstQuestion}
                    columns={columns}
                    rowKey="index"
                    bordered
                    pagination={this.state.pagination}
                />
                <Row style={{ textAlign: 'center', marginTop: 10 }}>
                    <Button type="primary" key="add-test" size='large' className="margin-bottom-5" onClick={this.createTest}>
                        Tạo đề thi
				    </Button>
                    &nbsp;
                    <Button type="primary" key="return" size='large' className="margin-bottom-5">
                        Trở lại
				    </Button>
                </Row>
            </span >
        )
    }
}

const CollectionCreateForm = Form.create()(GeneralInfoForm)
export default CollectionCreateForm;