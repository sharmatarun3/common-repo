import React from "react";
import Layout from "./hoc/Auxilary/layout/layout";
import BurgerBuilder from "./container/BurgerBuilder";
class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
