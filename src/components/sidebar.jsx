import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Tooltip } from 'antd';
import cookie from 'react-cookies';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSidebar: '#/',
            activeKey: ''
        }
        this.changeMenuSelect = this.changeMenuSelect.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    changeMenuSelect(e) {
        if (e.length == 0) {
            this.setState({
                activeKey: ''
            })
        }
        else {
            this.setState({
                activeKey: e[1]
            })
        }
    }

    onSelect(e) {
        this.setState({
            selectedSidebar: e.key
        })
    }

    componentDidMount() {
        if (window.location.hash != '#/dashboard') {
            this.setState({
                selectedSidebar: window.location.hash
            })
        }

        if (window.location.hash.includes('/area/')) {
            this.setState({ activeKey: "subMenuArea" })
        }
        else if (window.location.hash.includes('/location/')) {
            this.setState({ activeKey: "subMenuLocation" })
        }
        else if (window.location.hash.includes('/place/')) {
            this.setState({ activeKey: "subMenuLocation" })
        }
        else if (window.location.hash.includes('/opportunity/')) {
            this.setState({ activeKey: "subMenuGrammar" })
        }
        else if (window.location.hash.includes('/provider/')) {
            this.setState({ activeKey: "subMenuProvider" })
        }
        else if (window.location.hash.includes('/supplier/')) {
            this.setState({ activeKey: "subMenuProvider" })
        }
        else if (window.location.hash.includes('/properties/')) {
            this.setState({ activeKey: "subMenuProperties" })
        }
        else if (window.location.hash.includes('/place-type/')) {
            this.setState({ activeKey: "subMenuProperties" })
        }
        else if (window.location.hash.includes('/system-control/')) {
            this.setState({ activeKey: "subMenuSystem" })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hash != this.props.hash) {
            if (nextProps.hash != '#/dashboard') {
                this.setState({
                    selectedSidebar: nextProps.hash
                })
            }

            if (nextProps.hash.includes('/area/')) {
                this.setState({ activeKey: "subMenuArea" })
            }
            else if (nextProps.hash.includes('/location/')) {
                this.setState({ activeKey: "subMenuLocation" })
            }
            else if (nextProps.hash.includes('/place/')) {
                this.setState({ activeKey: "subMenuLocation" })
            }
            else if (nextProps.hash.includes('/opportunity/')) {
                this.setState({ activeKey: "subMenuGrammar" })
            }
            else if (nextProps.hash.includes('/provider/')) {
                this.setState({ activeKey: "subMenuProvider" })
            }
            else if (nextProps.hash.includes('/supplier/')) {
                this.setState({ activeKey: "subMenuProvider" })
            }
            else if (nextProps.hash.includes('/properties/')) {
                this.setState({ activeKey: "subMenuProperties" })
            }
            else if (nextProps.hash.includes('/place-type/')) {
                this.setState({ activeKey: "subMenuProperties" })
            }
            else if (nextProps.hash.includes('/system-control/')) {
                this.setState({ activeKey: "subMenuSystem" })
            }
        }
    }

    render() {
        const { activeSidebar } = this.props
        const lstPermission = cookie.load('lstPermission') || [];
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={activeSidebar}
                style={{ overflow: 'auto', height: '100vh', left: 0 }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" openKeys={[this.state.activeKey]}
                    selectedKeys={[this.state.selectedSidebar]}
                    onOpenChange={this.changeMenuSelect}
                    onSelect={this.onSelect}>
                    <Menu.Item key="#/">
                        <Link to={'/dashboard'} className="nav-link" >
                            <i style={{ width: '16px', height: '16px' }} className="fas fa-home"></i>&nbsp;&nbsp;
                            <span>Homepage</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="subMenuLocation" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-user"></i>&nbsp;&nbsp;<span>Ngữ pháp</span></span>}>
                        <Menu.Item key="#/grammar/present-tenses" >
                            <Link to={'/grammar/present-tenses'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Thì hiện tại</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="subMenuGrammar" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-user"></i>&nbsp;&nbsp;<span>Ngữ pháp</span></span>}>
                        <Menu.Item key="#/grammar/present-tenses" >
                            <Link to={'/grammar/present-tenses'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Thì hiện tại</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="#/grammar/past-tenses" >
                            <Link to={'/grammar/past-tenses'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Thì quá khứ</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="#/grammar/future-tenses" >
                            <Link to={'/grammar/future-tenses'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Thì tương lai</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="subMenuSystem" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-cogs"></i>&nbsp;&nbsp;<span>Quản lý hệ thống</span></span>}>
                        <Menu.Item key="#/system-control/list-article" >
                            <Link to={'/system-control/list-article'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Danh sách bài viết</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="#/system-control/upload-image" >
                            <Link to={'/system-control/upload-image'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Upload Ảnh</span>
                            </Link>
                        </Menu.Item>
                        {lstPermission.indexOf("PER-GROUP") > -1 &&
                            <Menu.Item key="#/system-control/grant-permission" >
                                <Link to={'/system-control/grant-permission'} className="nav-link" >
                                    <Icon type="flag" />
                                    <span>Quản lý phân quyền</span>
                                </Link>
                            </Menu.Item>
                        }
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }


}

export default Sidebar