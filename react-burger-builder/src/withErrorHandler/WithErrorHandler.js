import React, { Component } from "react";
import Auxilary from "../hoc/Auxilary/Auxilary";
import Model from "../component/UI/Model/Model";
const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      }, null);
      this.resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxilary>
          <Model
            show={this.state.error}
            modelClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Auxilary>
      );
    }
  };
};
export default WithErrorHandler;
