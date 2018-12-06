import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import TableImage from '../../components/adminPanel/tableImg.jsx';
import InsertImage from '../../components/adminPanel/filterImg.jsx';
import { listImagePagination, deleteImage, insertImage } from '../../actions/image';
import { Upload, Select, Button, Row, Col, Collapse, Divider, Input, Form, DatePicker, notification } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel
class ListPlaceType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img_lstfile: [],
            filterParam: {
                article_title: '',
                article_type: -1,
                status: -1,
                currentStatus: -1
            },
            filterDropdownVisible: {
                article_title: false,
            },
            searchText: {
                article_title: '',
            },
            filtered: false,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                sortField: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortField,
                sortOrder: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortOrder,
                position: 'both'
            },
            selectedRowKeys: [],
        }
        this.searchInput = undefined;

        //Xử lý filter
        this.onInsert = this.onInsert.bind(this);

        //Xử lý table
        this.onDelete = this.onDelete.bind(this)
        this.resetSelected = this.resetSelected.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.changePageSize = this.changePageSize.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.changeInputSearch = this.changeInputSearch.bind(this)
        this.onFilterDropdownVisibleChange = this.onFilterDropdownVisibleChange.bind(this)
    }

    onInputChange(e, column) {
        let searchText = this.state.searchText
        searchText[column] = e.target.value
        this.setState({ searchText: searchText });
        let filterDropdownVisible = { ...this.state.filterDropdownVisible }
        filterDropdownVisible[column] = false

        let filterObject = { ...this.state.filterParam }
        let pagination = { ...this.state.pagination }
        pagination.current = 1
        this.setState({ pagination: pagination, filterParam: filterObject })
        let params = Object.assign({}, pagination, filterObject, this.state.searchText);
        this.props.listImagePagination(params);
    }

    changeInputSearch(ele) {
        this.searchInput = ele
    }

    onFilterDropdownVisibleChange(visible, column) {
        let filterDropdownVisible = this.state.filterDropdownVisible
        filterDropdownVisible[column] = visible
        this.setState({
            filterDropdownVisible: filterDropdownVisible,
        }, () => this.searchInput && this.searchInput.focus());
    }

    componentDidMount() {
        let params = { ...this.state.pagination, ...this.state.filterParam }
        // this.props.listImagePagination(params);
    }

    getValueFromAnotherObj(childObj, parentObj) {
        for (var k in childObj) childObj[k] = parentObj[k];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchPage > this.props.countFetchPage) {
            const pagination = { ...this.state.pagination }
            pagination.total = nextProps.listImage.total
            // this.resetSelected();
            this.setState({
                pagination
            })
        }
        if (nextProps.countDelete > this.props.countDelete) {
            notification.success({
                message: 'Thành công',
                description: 'Xóa bài viết thành công'
            });
            let params = Object.assign({}, this.state.pagination, this.state.filterParam);
            this.props.listImagePagination(params);
        }
    }

    onDelete(img_id) {
        let params = {
            img_id
        }
        this.props.deleteImage(params)
    }

    resetSelected() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: []
            });
        }, 100);
    }

    handleDelete() {
        if (this.state.selectedRowKeys.length == 0) {
            return;
        }
        let lstId = "";
        this.state.selectedRowKeys.forEach(function (val, index) {
            lstId += val + ",";
        })
        this.props.deleteImage({ img_id: lstId.substring(0, lstId.length - 1) });
    }

    handleTableChange(pagination, filters, sorter) {
        let filterParam = { ...this.state.filterParam }
        let params = Object.assign({}, filterParam);
        params.pageSize = pagination.pageSize
        params.current = pagination.current
        if (sorter.columnKey != null || sorter.columnKey != undefined) {
            params.sortField = sorter.columnKey;
            params.sortOrder = sorter.order;
            pagination.sortField = sorter.columnKey;
            pagination.sortOrder = sorter.order;
        }
        else {
            pagination.sortField = null;
            pagination.sortOrder = null;
        }
        this.setState({
            pagination: pagination
        })
        this.props.listImagePagination(params)

    }
    changePageSize(value) {
        let paginationState = { ...this.state.pagination }
        paginationState.pageSize = value
        this.setState({
            pagination: paginationState
        })
        let params = Object.assign({}, paginationState, this.state.filterParam)
        this.props.listImagePagination(params)
    }

    onInsert() {
        let params = new FormData();
        this.state.img_lstfile.forEach(function (item) {
            if (!item.uploaded) {
                params.append("attachment", item.originFileObj)
            }
        })
        this.props.insertImage(params);
    }

    render() {
        const { selectedRowKeys } = this.state;
        let rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys
                })
            },
            hideDefaultSelections: true,
        };

        const props_upload = {
            onRemove: (file) => {
                if (file.uploaded) {
                    if (window.confirm('Bạn có chắc chắn muốn xóa file này?')) {
                        let new_path = "";
                        let lstFile = this.state.img_lstfile;
                        var index = lstFile.indexOf(file)
                        if (index != -1) {
                            lstFile.splice(index, 1);
                        }
                        lstFile.forEach(function (element) {
                            // Chỉ lấy những file đã upload
                            if (element.uploaded)
                                new_path += element.name + ";"
                        });
                        // this.setState({
                        //     images: new_path
                        // })
                        let image_object = {
                            pic_bo_id: this.props.editRecordContact.pic_bo_id,
                            new_path: new_path,
                            file_name: file.name,
                            // file_type: "images"
                        }
                        this.props.setPathLstContactProv(new_path, this.props.editRecordContact.index)
                        this.props.deleteFile(image_object);
                    } else {
                        return false;
                    }
                }
            },
            onChange: (info) => {
                let fileList = info.fileList;
                if (info.file.status === "error") {
                    fileList = fileList.slice(1, 6);
                }
                else {
                    if (fileList.length > 5) {
                        fileList.shift()
                        notification.error({
                            message: 'Thông báo',
                            description: 'Tối đa 5 file.'
                        });
                    }
                }
                this.setState({ img_lstfile: fileList });
            },
            multiple: true,
            beforeUpload: (file) => {
                const isJPG = file.type.includes("image/");
                const isLt4M = file.size / 1024 / 1024 < 4;
                if (!isJPG) {
                    notification.error({
                        message: 'Thông báo',
                        description: 'File upload không phải file ảnh'
                    });
                    file.status = "error";
                }
                else if (!isLt4M) {
                    notification.error({
                        message: 'Thông báo',
                        description: 'File ảnh phải nhỏ hơn 4MB'
                    });
                    file.status = "error";
                }
                return false;
            },
            fileList: this.state.img_lstfile,
            listType: "picture"
        };


        return (
            <div>
                <Collapse className="collapse-search-area-frm">
                    <Panel header="Tìm kiếm">
                        <Row>
                            <Col className="gutter-row list-provider-filter" span={12}>
                                <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Ảnh">
                                    <Upload {...props_upload} fileList={this.state.img_lstfile}>
                                        <Button type="primary" className="btn btn-success" id="images">Add</Button>
                                    </Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <Button type="primary" className={"margin-bottom-5"} style={{ float: 'right' }} onClick={this.onInsert}>Thêm Ảnh</Button>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse >
                <TableImage rowKey='index'
                    pagination={this.state.pagination}
                    searchText={this.state.searchText}
                    filterDropdownVisible={this.state.filterDropdownVisible}
                    onInputChange={this.onInputChange}
                    searchInput={this.searchInput}
                    changeInputSearch={this.changeInputSearch}
                    onFilterDropdownVisibleChange={this.onFilterDropdownVisibleChange}
                    handleTableChange={this.handleTableChange}
                    onDelete={this.onDelete}
                    changePageSize={this.changePageSize}
                    listImage={this.props.listImage}
                    filterParam={this.state.filterParam}
                    handleDelete={this.handleDelete}
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listImage: state.img.listImage,
        success: state.img.success,
        msg: state.img.msg,
        countDelete: state.img.countDelete,
        countFetchPage: state.img.countFetchPage,
        countUpdate: state.img.countUpdate,
        lastSearchObj: state.img.lastSearchObj,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listImagePagination: (params) => {
            dispatch(listImagePagination(params))
        },
        deleteImage: (params) => {
            dispatch(deleteImage(params))
        },
        insertImage: (params) => {
            dispatch(insertImage(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPlaceType);