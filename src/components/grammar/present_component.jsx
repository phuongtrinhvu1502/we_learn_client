import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import cookie from 'react-cookies'


class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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
                <div>{ReactHtmlParser(html)}</div>

                <Row style={{ textAlign: 'center' }}>

                    <Button type="primary" className="text-right btn btn-success">
                        <Link to={'/place-type/list-place-type'}
                            className="nav-link" >Trở lại</Link>
                    </Button>
                </Row>
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm