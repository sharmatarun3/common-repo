import React, { Component } from "react";
import Button from "../../component/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../axios-order";
import Spinner from "../../component/UI/spinner/Spinner";
import Input from "../../component/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5,
        },
        valid: false,
        isFormDirty: false,
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        isFormDirty: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        isFormDirty: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        isFormDirty: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        isFormDirty: false,
      },
      deliveryMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    isFormValid: false,
    loading: false,
  };

  checkValidation(value, rule) {
    let isValid = true;

    if (rule.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rule.minLength) {
      isValid = value.trim().length <= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = value.trim().length <= rule.maxLength && isValid;
    }
    return isValid;
  }

  inputChangeHandler(event, formElmentKey) {
    let orderform = { ...this.state.orderForm };
    let updatedorderFormElement = { ...orderform[formElmentKey] };
    updatedorderFormElement.value = event.target.value;
    // if (updatedorderFormElement.validation) {
    updatedorderFormElement.valid = this.checkValidation(
      updatedorderFormElement.value,
      updatedorderFormElement.validation
    );
    // }

    updatedorderFormElement.isFormDirty = true;
    orderform[formElmentKey] = updatedorderFormElement;

    let formIsValid = true;
    for (let formElement in orderform) {
      formIsValid = orderform[formElement].valid && formIsValid;
    }
    console.log("flag :: ", formIsValid);
    this.setState({ orderForm: orderform, isFormValid: formIsValid });
  }

  orderHandler = (event) => {
    event.preventDefault();
    let formdata = {};
    for (let formElment in this.state.orderForm) {
      formdata[formElment] = this.state.orderForm[formElment].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingrediants,
      price: this.props.totolPrice,
      orderData: formdata,
    };
    console.log("form :: ", formdata);
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isFormDirty={formElement.config.isFormDirty}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}

        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.isFormValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data : </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
