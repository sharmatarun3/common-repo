import React from "react";
import classes from "./Model.module.css";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import BackDrop from "../Backdrop/Backdrop";
class Model extends React.Component {
  //  Implemented to improve the performace
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Auxilary>
        <BackDrop
          show={this.props.show}
          clicked={this.props.modelClosed}
        ></BackDrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxilary>
    );
  }
}

export default Model;
