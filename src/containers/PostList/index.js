import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as postActions } from "../../redux/modules/posts";
import { getPostListWithAuthors } from "../../redux/modules";
import "./style.css";
import { getLoggedUser } from "../../redux/modules/auth";
import { actions as uiActions, isAddDialogOpen } from "../../redux/modules/ui";
import PostsView from "./components/PostsView";
import "./style.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchAllPosts();  // 获取帖子列表
  }

  // 新建帖子
  handleNewPost = () => {
    this.props.openAddDialog();
  };

  render() {
    const { posts, user, isAddDialogOpen } = this.props;
    console.log(this.props);
    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
          {
            user.userId ? (
              <button onClick={this.handleNewPost}>发帖</button>
            ) : null
          }
        </div>
        <PostsView posts={posts}/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    posts: getPostListWithAuthors(state),
    isAddDialogOpen: isAddDialogOpen(state)
  }
};

const mapDispatchToProps = dispatch => {
  return  {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);