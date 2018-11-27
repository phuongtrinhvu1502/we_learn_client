import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { notification, Row, Pagination, Button, Radio } from 'antd';
import '../../scss/test.scss';
const RadioGroup = Radio.Group;

class ViewReadingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lstQuestion: {
                results: [
                    {
                        tq_id: 1, tq_content: "What is hello?",
                        lst_answer: [
                            { ta_id: 1, ta_content: "Hello is hello" },
                            { ta_id: 2, ta_content: "Hello is hi" },
                            { ta_id: 3, ta_content: "Hello is good bye" },
                        ]
                    },
                    {
                        tq_id: 2, tq_content: "What is hello1?",
                        lst_answer: [
                            { ta_id: 4, ta_content: "Hello is hello" },
                            { ta_id: 5, ta_content: "Hello is hi" },
                            { ta_id: 6, ta_content: "Hello is good bye" },
                        ]
                    },
                    {
                        tq_id: 3, tq_content: "What is hello2?",
                        lst_answer: [
                            { ta_id: 7, ta_content: "Hello is hello" },
                            { ta_id: 8, ta_content: "Hello is hi" },
                            { ta_id: 9, ta_content: "Hello is good bye" },
                        ]
                    },
                    {
                        tq_id: 1, tq_content: "What is hello?",
                        lst_answer: [
                            { ta_id: 1, ta_content: "Hello is hello" },
                            { ta_id: 2, ta_content: "Hello is hi" },
                            { ta_id: 3, ta_content: "Hello is good bye" },
                        ]
                    },
                    {
                        tq_id: 2, tq_content: "What is hello1?",
                        lst_answer: [
                            { ta_id: 4, ta_content: "Hello is hello" },
                            { ta_id: 5, ta_content: "Hello is hi" },
                            { ta_id: 6, ta_content: "Hello is good bye" },
                        ]
                    },
                    {
                        tq_id: 3, tq_content: "What is hello2?",
                        lst_answer: [
                            { ta_id: 7, ta_content: "Hello is hello" },
                            { ta_id: 8, ta_content: "Hello is hi" },
                            { ta_id: 9, ta_content: "Hello is good bye" },
                        ]
                    },
                ],
                total: 30
            },
            current: 1,
            lstQuestionDisplay: [],
        }
        this.renderLstQuestion = this.renderLstQuestion.bind(this)
        this.changePage = this.changePage.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
    }

    onChangeAnswer(ta_id, tq_id) {
        console.log(tq_id, ta_id)
    }

    changePage(current) {
        this.setState({
            current
        })
    }

    renderLstQuestion() {
        let lstQuestionDisplay = []
        let current = (this.state.current - 1) * 5
        for (var i = current; i < current + 5; i++) {
            if (this.state.lstQuestion.results[i] == undefined)
                break;
            lstQuestionDisplay.push(this.state.lstQuestion.results[i])
        }
        this.setState({
            lstQuestionDisplay
        })
    }

    componentDidMount() {
        this.renderLstQuestion();
    }

    render() {
        const { current } = this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            fontWeight: 400,
            marginLeft: 30,
        };
        return (
            <Row>
                <Row>
                    {
                        this.state.lstQuestionDisplay.map((item, key) =>
                            <div>
                                <h5>Câu {(key + 1) + ((current - 1) * 5)} : {item.tq_content}</h5>
                                <RadioGroup onChange={(e) => this.onChangeAnswer(e.target.value, item.tq_id)}>
                                    {item.lst_answer.map(itemAnswer =>
                                        <Radio style={radioStyle} value={itemAnswer.ta_id}>{itemAnswer.ta_content}</Radio>
                                    )}
                                </RadioGroup>
                                <ul>

                                </ul>
                            </div>
                        )
                    }
                </Row>
                <Pagination
                    onChange={this.changePage}
                    defaultCurrent={this.state.current}
                    current={this.state.current}
                    pageSize={5}
                    total={this.state.lstQuestion.total} />
            </Row>
        )
    }
}

export default ViewReadingComponent;