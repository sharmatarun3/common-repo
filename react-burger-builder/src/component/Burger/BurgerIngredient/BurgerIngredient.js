import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropType from "prop-types";

class BurgerIngredient extends React.Component {
  render() {
    let ingridient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingridient = <div className={classes.BreadBottom}></div>;

        break;

      case "bread-top":
        ingridient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingridient = <div className={classes.Meat}></div>;

        break;
      case "cheese":
        ingridient = <div className={classes.Cheese}></div>;

        break;
      case "salad":
        ingridient = <div className={classes.Salad}></div>;

        break;
      case "bacon":
        ingridient = <div className={classes.Bacon}></div>;

        break;
      default:
        ingridient = null;
        break;
    }
    return ingridient;
  }
}
BurgerIngredient.propTypes = {
  type: PropType.string.isRequired,
};

export default BurgerIngredient;
