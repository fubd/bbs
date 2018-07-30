import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'jack',
      password: '123456',
      redirectToReferrer: false
    };
  }

  handleChange = e => {
    if (e.target.name === 'username') {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.name === 'password') {
      this.setState({
        password: e.target.value
      });
    }
  };

  // 用户submit表单，登陆成功，redux中的userId不再为null，
  // store改变，虚拟DOM更新，componentWillReceiveProps被调用传入新的props
  // 注意componentWillReceiveProps中需要把新的props和老的props对比
  // 我们通过一个状态来判断用户是否登录成功，如果成功就跳转到上一页面，如果没有登录则render return Login页面。
  componentWillReceiveProps(nextProps) {
    const isLoggedIn = !this.props.user.userId && nextProps.user.userId;
    if (isLoggedIn) {
      this.setState({
        redirectToReferrer: true
      });
    }
  }

  handleSubmit = e => {
    // 组织表单的默认提交
    e.preventDefault();
    const { username, password } = this.state;
    if (username.length === 0 || password.length === 0) {
      alert("用户名或密码不能为空！");
      return;
    }
    // dispatch登录action，修改store中的值
    this.props.login(username, password);
  }

  render() {
    const { from } = this.props.location.state || {from: {pathname: '/'} };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div>
          <label>
            用户名：
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            密码：
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <input type="submit" value="登录" />
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
