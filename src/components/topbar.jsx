
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
            window.location.reload()
        }
    }
    render() {
        const { logout, sidebarCollapse, activeSidebar } = this.props
        return (
            <Header style={{ background: '#fff', paddingLeft: '15px', paddingRight: '10px', borderBottom: '2px solid cadetblue' }}>
                {/* <Link to={'/user/change-password/'}
                    className="nav-link" ><span>PhuNB</span></Link> */}
                {this.token === undefined || this.token == "" ?
                    <span>
                        <a href="#/login" className="logout">Login</a>
                        <span className="logout"><Divider type="vertical" /></span>
                        <a href="#/sign-up" className="logout">Sign Up</a>
                    </span>
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