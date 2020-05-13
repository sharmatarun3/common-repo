import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import Drawertoggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const ToolBar = (props) => {
  return (
    <header className={classes.Toolbar}>
     <Drawertoggle clicked={props.openDrawer}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};
export default ToolBar;
