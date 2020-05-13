import React from "react";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const orderingredient = Object.keys(props.ingredients).map((inKey, index) => {
    return (
      <li key={inKey + index}>
        <span style={{ textTransform: "capitalize" }}>{inKey}</span>:
        {props.ingredients[inKey]}
      </li>
    );
  });

  return (
    <Auxilary>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients</p>
      {orderingredient}
      <p>
        <strong>Total price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        Canel
      </Button>
      <Button btnType="Success" clicked={props.purchasecontinue}>
        Continue
      </Button>
    </Auxilary>
  );
};

export default OrderSummary;
