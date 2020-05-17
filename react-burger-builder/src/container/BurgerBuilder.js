import React, { Component } from "react";
import Auxilary from "../hoc/Auxilary/Auxilary";
import Burger from "../component/Burger/Burger";
import BuildControls from "../component/Burger/BuildControls/BuildControls";
import Model from "../component/UI/Model/Model";
import OrderSummary from "../component/Burger/OrderSummary/OrderSummary";
import axios from "../axios-order";
import Spinner from "../component/UI/spinner/Spinner";
import WithErrorHandler from "../withErrorHandler/WithErrorHandler";

const INCREDIENT_PRICE = {
  salad: 1.4,
  bacon: 1.2,
  cheese: 1.5,
  meat: 2.5,
};
class BurgerBuilder extends Component {
  state = {
    ingrediants: null,
    totolPrice: 4,
    purchasable: true,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://react-udumy-taru.firebaseio.com/ingredients.json")
      .then((response) => {
        console.log("Response :: ", response);
        this.setState({ ingrediants: response.data });
      });
    // .catch((error) => {
    //   console.log(error);
    //   this.setState({ error: true });
    // });
  }
  // state = {
  //   ingrediants: {
  //     salad: 0,
  //     bacon: 0,
  //     cheese: 0,
  //     meat: 0,
  //   },
  //   totolPrice: 4,
  //   purchasable: true,
  //   purchasing: false,
  //   loading: false,
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  updatePuchasableState() {
    this.setState((prevState, props) => {
      let ingredient = prevState.ingrediants;
      let sum = Object.keys(ingredient)
        .map((enKey) => {
          return ingredient[enKey];
        })
        .reduce((sum, el) => {
          return sum + el;
        }, 0);
      return { purchasable: !sum > 0 };
    });
  }

  addIngredientHandler = (type) => {
    let oldcount = this.state.ingrediants[type];

    let newcount = oldcount + 1;
    let udatedIngredients = { ...this.state.ingrediants };
    udatedIngredients[type] = newcount;
    let ingredientUnitprice = INCREDIENT_PRICE[type];
    let newPrice = this.state.totolPrice + ingredientUnitprice;
    this.setState({
      ingrediants: udatedIngredients,
      totolPrice: newPrice,
    });
    this.updatePuchasableState();
  };
  removeIngredientHandle = (type) => {
    let oldcount = this.state.ingrediants[type];
    // if (oldcount <= 0) {
    //   return;
    // }
    let newcount = oldcount - 1;
    let decreseIngredients = { ...this.state.ingrediants };
    decreseIngredients[type] = newcount;
    let decreseUnitprice = INCREDIENT_PRICE[type];
    let newPrice = this.state.totolPrice - decreseUnitprice;
    this.setState({ ingrediants: decreseIngredients, totolPrice: newPrice });
    this.updatePuchasableState();
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    console.log("sdsdsd :: ", this.props.history);
    let queryParams = [];
    let ingredient = this.state.ingrediants;
    for (let i in ingredient) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredient[i])
      );
    }
    console.log("this.state.totolPrice :: ", this.state.totolPrice);
    queryParams.push(
      encodeURIComponent("totolPrice") +
        "=" +
        encodeURIComponent(this.state.totolPrice)
    );
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
    //this.props.history.push("/checkout");
  };
  render() {
    let disabledInfo = { ...this.state.ingrediants };
    for (let key in disabledInfo) {
      disabledInfo[key] = !disabledInfo[key] > 0;
    }
    let orderSummary = null;
    // console.log("Burger builder :: ", this.state.error);
    let burger = this.state.error ? (
      <p>The burger can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingrediants) {
      burger = (
        <Auxilary>
          <Burger ingrediants={this.state.ingrediants} />

          <BuildControls
            ingrediantAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandle}
            disabled={disabledInfo}
            totolPrice={this.state.totolPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Auxilary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingrediants}
          price={this.state.totolPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchasecontinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Auxilary>
        <Model
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Model>
        {burger}
      </Auxilary>
    );
  }
}
export default WithErrorHandler(BurgerBuilder, axios);
