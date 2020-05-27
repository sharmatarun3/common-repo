import React, { Component, PureComponent } from "react";
import Person from "./Person/Person";

// class Persons extends Component {
class Persons extends PureComponent {
  //   static getDerivedStateFromProps(nextProps, state) {
  //     return state;
  //   }
  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("[Persons.js] ShouldComponentUpdate");
  //     if (nextProps.persons !== this.props.persons) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  getSnapshotBeforeUpdate(nextProps, nextState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate  ....");
    return { message: "Snapshot" };
  }
  componentDidUpdate(nextProps, nextState, snapshot) {
    console.log("[Persons.js] ComponentDidUpdate  ....", snapshot);
  }
  render() {
    console.log("[Persons.js] rendering ...");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          click={() => this.props.clicked(index)}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
