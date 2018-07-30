import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./style.css";

class Header extends Component {
  static PropTypes = {
    username: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }
  render() {
    const { username, location, logout } = this.props;
    return (
      <div className="header">
        <div className="nav">
          <span className="left-link">
            <Link to="/">首页</Link>
          </span>
          {
            /* 传入有效用户名 */
            username && username.length > 0 ? (
              <span className="username">
                当前用户：{username}&nbsp;<button onClick={logout}>注销</button>
              </span>
            ) : (
              /* 没有用户名 -> redux中的username默认是null -> 用户未登录  */
              <span className="right-link">
                {/* 跳转到登录页并向登录页传入当前页面location */}
                <Link to={{ pathname: "/login", state: { from: location } }}>
                  登录
                </Link>
              </span>
            )
          }
        </div>
      </div>
    );
  }
}

export default Header;
