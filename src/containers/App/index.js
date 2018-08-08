import React, { Component } from 'react';
import { actions as appActions, getError, getRequestQuantity } from '../../redux/modules/app';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home';
import Loading from '../../components/Loading';
import Login from '../Login';

class App extends Component {
  render() {
    const { error, requestQuantity } = this.props;
    const errorDialog = error && (
      <div style={{position: 'fixed', top: 0, left: '50%', width: '200px', height: '10px', borderRadius: '3px'}}>
        {error.message && error}
      </div>
    );

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/posts" component={Home} />
          </Switch>
        </Router>
        {errorDialog}
        {requestQuantity > 0 && <Loading />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state),
    requestQuantity: getRequestQuantity(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
