import React, { Component } from "react";
import classes from "./layout.module.css";
import Auxilary from "../Auxilary";
import ToolBar from "../../../component/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../../component/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState((prevState, props) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  openDrawerHandler = () => {
    this.setState((prevState, props) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxilary>
        <div>Toolbar, sidedrawer, Backdrop</div>
        <ToolBar openDrawer={this.openDrawerHandler}></ToolBar>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

export default Layout;
