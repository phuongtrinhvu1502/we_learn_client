
import React, { Component } from 'react';

import { Layout, Menu, Icon, Link, Divider } from 'antd';
const { Header, Sider, Content } = Layout;
import cookie from 'react-cookies';
class Topbar extends Component {
    constructor(props) {
        super(props)
        this.userInfo = cookie.load('userInfo')
        this.token = cookie.load('token')
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.logoutSuccess) {
            cookie.remove('lstPermission')
            cookie.remove('userInfo')
            cookie.remove('token', { path: '/' })
            this.props.resetStoreBar()
            this.props.history.push('/login')
        }
    }
    render() {
        const { logout, sidebarCollapse, activeSidebar } = this.props
        return (
            <Header style={{ background: '#fff', paddingLeft: '15px', paddingRight: '10px' }}>
                <Icon
                    style={{ fontSize: '30px' }}
                    className="glyphicon glyphicon-align-justify"
                    type={activeSidebar ? 'menu-unfold' : 'menu-fold'}
                    onClick={sidebarCollapse}
                />
                {/* <Link to={'/user/change-password/'}
                    className="nav-link" ><span>PhuNB</span></Link> */}
                {this.token === undefined || this.token == "" ?
                    <a href="#/login" className="logout">Login</a>
                    :
                    <span>
                        <a href="#" className="logout" onClick={logout}>Logout</a>
                        <span className="logout"><Divider type="vertical" /></span>
                    </span>
                }
                <a href="#/user/change-password/" className="logout">{this.userInfo != undefined ? this.userInfo.username : ""}</a>
            </Header>
        );
    }
}

export default Topbar;