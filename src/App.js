import React, { Component, Suspense, lazy } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const AsyncCheckout = lazy(() => import("./containers/Checkout/Checkout"));
const AsyncAuth = lazy(() => import("./containers/Auth/Auth"));

function WaitingComponent(Component){
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
    </Suspense>
  )
}

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={WaitingComponent(AsyncAuth)} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={WaitingComponent(AsyncCheckout)} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={WaitingComponent(AsyncAuth)} />
          <Route path="/" exact component={BurgerBuilder} />
          {this.props.buildingBurger ? (
            <Redirect to="/checkout" />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burger.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
