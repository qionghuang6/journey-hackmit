import React, {Component} from 'react'
import getApiUrl from '../src/getApiUrl';

// Define the Login form component
export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

async handleSubmit(event) {
    event.preventDefault();
    const body = { email: this.username, password: this.password};
    const res = await fetch(
        getApiUrl(`/api/user/login`), 
        { method: 'POST' , headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body: JSON.stringify(body)}
      )
      console.log("RES", res)
  }

render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              name="username"
              type="text"
              value={this.state.username}
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
      </div>
    );
  }
}
