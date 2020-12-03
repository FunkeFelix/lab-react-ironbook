import React from "react";
import "./App.css";
import users from "./users.json";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  state = {
    userList: users,
    search: "",
    role: "",
  };

  changeHandler = (event) => {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  teacherFilter = (event) => {
    event.preventDefault();
    console.log(event.target);
    const teacherFiltered = users.filter((user) => {
      return user.role === event.target.value;
    });
    this.setState({
      userList: teacherFiltered,
    });
  };

  studentFilter = (event) => {
    event.preventDefault();
    const studentFiltered = users.filter((user) => {
      return user.role === event.target.value;
    });
    this.setState({
      userList: studentFiltered,
    });
  };

  searchName = (event) => {
    event.preventDefault();

    const nameFiltered = this.state.search
      ? users.filter((user) => {
          return (
            user.firstName.toLowerCase() === this.state.search.toLowerCase() ||
            user.lastName.toLowerCase() === this.state.search.toLowerCase()
          );
        })
      : users;
    const roleFiltered = nameFiltered.filter((user) => {
      if (this.state.role) {
        return user.role === this.state.role;
      } else {
        return user;
      }
    });

    this.setState({
      userList: roleFiltered,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>IronBook</h1>
        <form onSubmit={this.searchName}>
          <label htmlFor="search">
            <button>Search</button>
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.changeHandler}
          />
          <label htmlFor="role">Teacher</label>
          <input
            type="checkbox"
            name="role"
            id="role"
            value="teacher"
            onChange={this.teacherFilter}
          />
          <label htmlFor="role">Student</label>
          <input
            type="checkbox"
            name="role"
            id="role"
            value="student"
            onChange={this.studentFilter}
          />
        </form>
        <table>
          <thead>
            <tr>
              <th className="tableHead">First Name</th>
              <th className="tableHead">last Name</th>
              <th className="tableHead">Campus</th>
              <th className="tableHead">Role</th>
              <th className="tableHead">Links</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userList.map((user) => {
              return (
                <tr>
                  <td className="tableRow">{user.firstName}</td>
                  <td className="tableRow">{user.lastName}</td>
                  <td className="tableRow">{user.campus}</td>
                  <td className="tableRow">{user.role}</td>
                  <td className="tableRow">{user.linkedin}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
