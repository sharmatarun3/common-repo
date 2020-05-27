import React, { Component } from "react";
import Auxilary from "../../../hoc/Auxilary";
import WithClass from "../../../hoc/WithClass";
import classes from "./Person.module.css";
import PropTypes from "prop-types";
import ContextAuthentication from "../../../auth-context/Authentication";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = ContextAuthentication;
  componentDidMount() {
    this.inputElementRef.current.focus();
  }
  render() {
    console.log("[Person.js] authFlag ...", this.context.authFlag);
    return (
      <Auxilary>
        <div className={classes.Personstyle}>
          {this.context.authFlag ? (
            <p>This is Authenticated</p>
          ) : (
            "Please login to authenticate"
          )}

          <div
            onClick={this.props.click}
            style={{
              alignItems: "center",
            }}
          >
            Delete
          </div>

          <p>
            My name is {this.props.name} and my age is {this.props.age}
          </p>
          <p>
            <input
              type="text"
              value={this.props.name}
              // ref={(inputElement) => (this.inputElementRef = inputElement)}
              ref={this.inputElementRef}
              onChange={this.props.changed}
            />
          </p>
          <p>{this.props.children}</p>
        </div>
      </Auxilary>
    );
  }
}
Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
  click: PropTypes.func,
};
export default WithClass(Person, null);
