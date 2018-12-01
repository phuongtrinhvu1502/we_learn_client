import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import TableTest from '../../components/adminPanel/tableTest.jsx';
import FilterTest from '../../components/adminPanel/filterTest.jsx';
import { listTestPagination, removeTest, restoreTest, deleteTest, setLastSearchTest } from '../../actions/test';
import { notification } from 'antd';
class ListTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.onClickSearch = this.onClickSearch.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.changeStatusFilter = this.changeStatusFilter.bind(this);

        //Xử lý table
        this.onDelete = this.onDelete.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onRestore = this.onRestore.bind(this)
        this.resetSelected = this.resetSelected.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.changePageSize = this.changePageSize.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleRestore = this.handleRestore.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.changeInputSearch = this.changeInputSearch.bind(this)
        this.onFilterDropdownVisibleChange = this.onFilterDropdownVisibleChange.bind(this)
        this.changeTestType = this.changeTestType.bind(this)
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
        this.props.listTestPagination(params);
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
        let params = undefined;
        if (this.props.lastSearchObj != null) {
            params = this.props.lastSearchObj
            // gán lại các biến từ lastSearchObj vào state
            let pagination = { ...this.state.pagination }
            let filterParam = { ...this.state.filterParam }
            this.getValueFromAnotherObj(pagination, this.props.lastSearchObj);
            this.getValueFromAnotherObj(filterParam, this.props.lastSearchObj);
            this.setState({
                pagination, filterParam
            })
        } else {
            params = { ...this.state.pagination, ...this.state.filterParam }
        }
        this.props.listTestPagination(params);
    }

    getValueFromAnotherObj(childObj, parentObj) {
        for (var k in childObj) childObj[k] = parentObj[k];
    }

    componentWillUnmount() {
        let params = Object.assign({}, this.state.pagination, this.state.filterParam)
        this.props.setLastSearchTest(params)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lastSearchObj != null && nextProps.lastSearchObj != this.props.lastSearchObj) {
            let pagination = { ...this.state.pagination }
            let filterParam = { ...this.state.filterParam }
            this.getValueFromAnotherObj(pagination, nextProps.lastSearchObj);
            this.getValueFromAnotherObj(filterParam, nextProps.lastSearchObj);
            this.setState({
                pagination, filterParam
            })
        }
        if (nextProps.countFetchPage > this.props.countFetchPage) {
            const pagination = { ...this.state.pagination }
            pagination.total = nextProps.listTest.total
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
            this.props.listTestPagination(params);
        }
        if (nextProps.countRemove > this.props.countRemove) {
            notification.success({
                message: 'Thành công',
                description: 'Xóa tạm thời bài viết thành công'
            });
            let params = Object.assign({}, this.state.pagination, this.state.filterParam);
            this.props.listTestPagination(params);
        }
        if (nextProps.countRestore > this.props.countRestore) {
            notification.success({
                message: 'Thành công',
                description: 'Hoàn tác thành công'
            });
            let params = Object.assign({}, this.state.pagination, this.state.filterParam);
            this.props.listTestPagination(params);
        }
    }

    onDelete(article_id) {
        let params = {
            article_id
        }
        this.props.deleteTest(params)
    }

    onRemove(article_id) {
        let params = {
            article_id: article_id
        }
        this.props.removeTest(params)
    }

    onRestore(article_id) {
        let params = {
            article_id: article_id
        }
        this.props.restoreTest(params)
    }

    resetSelected() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: []
            });
        }, 100);
    }

    handleRestore() {
        if (this.state.selectedRowKeys.length == 0) {
            return;
        }
        let lstId = "";
        this.state.selectedRowKeys.forEach(function (val, index) {
            lstId += val + ",";
        })
        this.props.restoreTest({ article_id: lstId.substring(0, lstId.length - 1) });
    }
    handleDelete() {
        if (this.state.selectedRowKeys.length == 0) {
            return;
        }
        let lstId = "";
        this.state.selectedRowKeys.forEach(function (val, index) {
            lstId += val + ",";
        })
        this.props.deleteTest({ article_id: lstId.substring(0, lstId.length - 1) });
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
        this.props.listTestPagination(params)

    }
    changePageSize(value) {
        let paginationState = { ...this.state.pagination }
        paginationState.pageSize = value
        this.setState({
            pagination: paginationState
        })
        let params = Object.assign({}, paginationState, this.state.filterParam)
        this.props.listTestPagination(params)
    }

    changeStatusFilter(value) {
        let filterParam = { ...this.state.filterParam }
        filterParam.status = value;
        this.setState({
            filterParam
        })
    }
    changeTestType(value) {
        let filterParam = { ...this.state.filterParam }
        filterParam.article_type = value;
        this.setState({
            filterParam
        })
    }

    clearFilter() {
        let filterParam = {
            article_title: '',
            article_type: -1,
            status: -1,
            currentStatus: -1
        }
        let filterDropdownVisible = {
            article_title: false,
        }
        let searchText = {
            article_title: '',
        }
        let pagination = {
            pageSize: 10,
            current: 1,
            total: 0,
            sortField: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortField,
            sortOrder: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortOrder,
            position: 'both'
        }
        let selectedRowKeys = []

        this.setState({ pagination, filterParam, searchText, filterDropdownVisible, selectedRowKeys })
        let params = Object.assign({}, pagination, filterParam);
        this.props.listTestPagination(params);
        this.resetSelected();
    }

    onClickSearch() {
        let filterObject = { ...this.state.filterParam }
        let pagination = { ...this.state.pagination }
        pagination.current = 1
        filterObject.currentStatus = filterObject.status
        this.setState({ pagination: pagination, filterParam: filterObject })
        let params = Object.assign({}, pagination, filterObject);
        this.resetSelected();
        this.props.listTestPagination(params);
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
        if (this.state.filterParam.currentStatus != -2) {
            rowSelection = undefined;
        }

        const status = [{ name: "Tất cả", type_name: -1 },
        { name: "Đã xóa", type_name: -2 }]
        return (
            <div>
                <FilterTest
                    status={status}
                    onClickSearch={this.onClickSearch}
                    changeStatusFilter={this.changeStatusFilter}
                    changeTestType={this.changeTestType}
                    clearFilter={this.clearFilter}
                />
                <TableTest rowKey='index'
                    pagination={this.state.pagination}
                    searchText={this.state.searchText}
                    filterDropdownVisible={this.state.filterDropdownVisible}
                    onInputChange={this.onInputChange}
                    searchInput={this.searchInput}
                    changeInputSearch={this.changeInputSearch}
                    onFilterDropdownVisibleChange={this.onFilterDropdownVisibleChange}
                    handleTableChange={this.handleTableChange}
                    onDelete={this.onDelete}
                    onRemove={this.onRemove}
                    onRestore={this.onRestore}
                    changePageSize={this.changePageSize}
                    listTest={this.props.listTest}
                    filterParam={this.state.filterParam}
                    handleDelete={this.handleDelete}
                    handleRestore={this.handleRestore}
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listTest: state.test.listTest,
        success: state.test.success,
        msg: state.test.msg,
        countDelete: state.test.countDelete,
        countRemove: state.test.countRemove,
        countRestore: state.test.countRestore,
        countFetchPage: state.test.countFetchPage,
        countUpdate: state.test.countUpdate,
        lastSearchObj: state.test.lastSearchObj,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listTestPagination: (params) => {
            dispatch(listTestPagination(params))
        },
        removeTest: (params) => {
            dispatch(removeTest(params))
        },
        restoreTest: (params) => {
            dispatch(restoreTest(params))
        },
        deleteTest: (params) => {
            dispatch(deleteTest(params))
        },
        setLastSearchTest: (param) => {
            dispatch(setLastSearchTest(param))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTest);