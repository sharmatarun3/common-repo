import React from "react";
import BurgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";
const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="My Burger"></img>
    </div>
  );
};

export default logo;
