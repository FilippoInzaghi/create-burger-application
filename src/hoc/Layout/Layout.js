import React, { Fragment, Component } from "react";
import {connect} from 'react-redux';
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showSideDrawer: false
    };
  };

  sideDrawerClosedHandler = () => {
      this.setState(prevState => ({
        showSideDrawer: false
      }))
  }
  toolbarModalClosedHandler = () => {
      this.setState(prevState => ({
        showSideDrawer: !prevState.showSideDrawer
      }))
  }
  render() {
    return (
      <Fragment>
        <Toolbar showModal={this.toolbarModalClosedHandler} authenticated={this.props.authenticated}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} showBackdrop={this.state.showSideDrawer} authenticated={this.props.authenticated}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
