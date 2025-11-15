import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

// IMPORTANT: backend container hostname is "api"
const apiUrl = `http://api:8081`;

class App extends Component {
  state = {
    users: []
  };

  async createUser() {
    try {
      await axios.get(apiUrl + '/user-create');
      this.loadUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  }

  async loadUsers() {
    try {
      const res = await axios.get(apiUrl + '/users');
      this.setState({
        users: res.data
      });
    } catch (err) {
      console.error("Error loading users:", err);
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <button onClick={() => this.createUser()}>
            Create User
          </button>

          <p>Users list:</p>
          <ul>
            {this.state.users.map(user => (
              <li key={user._id}>id: {user._id}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
