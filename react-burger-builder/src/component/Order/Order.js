import React from "react";
import classes from "./Order.module.css";
const order = (props) => {
  const Ingredients = [];

  for (let ingredient in props.ingredients) {
    Ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }
  const spanIngredient = Ingredients.map((indre) => (
    <span
      key={indre.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #eee",
        padding: "5px",
      }}
    >
      {indre.name} ({indre.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>
        <strong>Ingredients :</strong> {spanIngredient}
      </p>
      <p>
        Price :<strong> USD {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
