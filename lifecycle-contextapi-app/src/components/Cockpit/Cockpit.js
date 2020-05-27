import React, { useEffect, useRef, useContext } from "react";
import ContextAuthentication from "../../auth-context/Authentication";
const Cockpit = (props) => {
  const toggleButton = useRef(null);

  /**
   * Way to use the context api in functional based component
   */
  const authContext = useContext(ContextAuthentication);

  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    // setTimeout(() => {
    //   alert("--");
    // }, 1000);
    toggleButton.current.click();
    return () => {
      console.log("[Cockpi.js] 1st cleanup work ");
    };
  }, []);

  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    return () => {
      console.log("[Cockpi.js] 2nd cleanup work ");
    };
  });
  console.log("Length :: ", props.personsLength);
  let style = null;
  if (props.personsLength > 0) {
    style = {
      backgroundColor: "red",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      curson: "pointer",
    };
  } else {
    style = {
      backgroundColor: "green",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      curson: "pointer",
    };
  }
  const styleLogin = {
    backgroundColor: "green",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    curson: "pointer",
  };

  return (
    <div>
      <p>
        <button ref={toggleButton} style={style} onClick={props.clicked}>
          Toggle Person
        </button>
        {/* commented due to auto click happening by using ref keyword */}

        {/* <button
          ref={toggleButton}
          style={styleLogin}
          onClick={authContext.login}
        >
          Authenticate
        </button> */}

        <button style={styleLogin} onClick={authContext.login}>
          Authenticate
        </button>
      </p>
    </div>
  );
};

export default React.memo(Cockpit);
