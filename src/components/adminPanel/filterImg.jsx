import React, { Component } from 'react';
import moment from 'moment'
import { Upload, Select, Button, Row, Col, Collapse, Divider, Input, Form, DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel

const InsertImage = (props) => {
    const { img_lstfile, onInsert, props_upload } = props
    // const dateString = moment('2014-12-13', 'YYYY-MM-DD').toDate();
    // const dateObj = new Date(dateString);
    // const momentObj = moment(dateObj);
    return (
        <Collapse className="collapse-search-area-frm">
            <Panel header="Tìm kiếm">
                <Row>
                    <Col className="gutter-row list-provider-filter" span={12}>
                        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Ảnh">
                            <Upload {...props_upload} fileList={img_lstfile}>
                                <Button type="primary" className="btn btn-success" id="images">Add</Button>
                            </Upload>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={24}>
                        <Button type="primary" className={"margin-bottom-5"} style={{ float: 'right' }} onClick={onInsert}>Thêm Ảnh</Button>
                    </Col>
                </Row>
            </Panel>
        </Collapse >
    )
}

export default InsertImage