import React, { Component } from "react";
import { Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as authActions, getLoggedUser } from '../../redux/modules/auth';
import Header from "../../components/Header";
import PostList from '../PostList/index';
import postsView from "../PostList/components/PostsView";

class Home extends Component {
  render() {
    const { location, user, match } = this.props;
    // 向Header组件传入username就行
    const username = user && user.username ? user.username : "";
    return (
      <div>
        <Header
          username={username}
          location={location}
          logout={() => { this.props.logout() }}
        />
        <Route
          path={match.url}
          exact
          render={() => (<PostList />)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
