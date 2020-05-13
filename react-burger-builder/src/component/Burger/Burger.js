import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  let transformedIngrediants = Object.keys(props.ingrediants)
    .map((inKey) => {
      return [...Array(props.ingrediants[inKey])].map((_, i) => (
        <BurgerIngredient key={inKey + i} type={inKey} />
      ));
    })
    .reduce((prevEl, currEl) => {
      return prevEl.concat(currEl);
    }, []);
  if (transformedIngrediants.length === 0) {
    transformedIngrediants = <p>Please start adding ingrediants.</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngrediants}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
