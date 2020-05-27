import React from "react";

const Authentication = React.createContext({
  authFlag: false,
  authLoginHandler: () => {},
});

export default Authentication;
