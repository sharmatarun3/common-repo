import React, { Component } from "react";
import "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/WithClass";
import Auxilary from "../hoc/Auxilary";
import ContextAuthentication from "../auth-context/Authentication";
const style = {
  backgroundColor: "white",
  font: "inherit",
  border: "1px solid blue",
  padding: "8px",
  curson: "pointer",
};
class App extends Component {
  state = {
    persons: [
      { id: "1", name: "tarun", age: 29 },
      { id: "2", name: "rahul", age: 26 },
      { id: "3", name: "Akshay kumar", age: 24 },
    ],
    showPerson: false,
    showCockpit: true,
    authFlag: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps");
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount", this.state.authFlag);
  }
  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  personchangehandler = (event, personId) => {
    let persons = [...this.state.persons];
    let personIndex = persons.findIndex((person) => {
      return person.id === personId;
    });
    let updatedPerson = persons[personIndex];
    updatedPerson.name = event.target.value;
    persons[personIndex] = updatedPerson;

    this.setState({ persons });
  };
  togglePerson = () => {
    this.setState({ showPerson: !this.state.showPerson });
  };
  deleteHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons });
  };
  authLoginHandler = () => {
    this.setState({ authFlag: !this.state.authFlag });
  };
  render() {
    console.log("[App.js] getDerivedStateFromProps");

    let persons = null;
    if (this.state.showPerson === true) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deleteHandler}
          changed={this.personchangehandler}
        />
      );
    }
    return (
      <Auxilary>
        <p>
          <strong>This is working great !!</strong>
        </p>
        <div>
          <button
            style={style}
            type="button"
            onClick={() => {
              this.setState({ showCockpit: !this.state.showCockpit });
            }}
          >
            {this.state.showCockpit ? "Hide Cockpit" : "Show Cockpit"}
          </button>
        </div>
        <ContextAuthentication.Provider
          value={{
            authFlag: this.state.authFlag,
            login: this.authLoginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              clicked={this.togglePerson}
              personsLength={this.state.persons.length}
            />
          ) : null}
          {persons}
        </ContextAuthentication.Provider>
      </Auxilary>
    );
  }
}

export default withClass(App, "App");
