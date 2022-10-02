import { create } from '@mui/material/styles/createTransitions';
import React, {Component} from 'react'
import getApiUrl from './getApiUrl';

// Define the Login form component
export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      create: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwapState = this.handleSwapState.bind(this);
}

handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

handleSwapState(event) {
    event.preventDefault();
    this.setState({
      create: !this.state.create,
    });
  }

async handleSubmit(event) {
    event.preventDefault();
    if (this.state.create) {
        const add_body = { email: this.state.email, password: this.state.password};
        var res = await fetch(
            getApiUrl(`/api/user/add`), 
            { method: 'POST' , headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(add_body)}
        );
        console.log("RES", res)
    } else {
        const login_body = { email: this.state.email, password: this.state.password};
        const res = await fetch(
            getApiUrl(`/api/user/login`), 
            { method: 'POST' , headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(login_body)}
        );
        console.log("RES", res)
    }
  }

render() {
    return this.state.create ? (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <button type="submit" onClick={this.handleSwapState}>Returning User</button>
      </div>)
        :
        (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Log in</button>
        </form>
        <button type="submit" onClick={this.handleSwapState}>New User</button>
      </div>
    );
  }
}
