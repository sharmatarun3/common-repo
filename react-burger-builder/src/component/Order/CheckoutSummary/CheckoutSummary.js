import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope this is a tasty burger !!</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingrediants={props.ingrediants} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
