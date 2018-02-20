import React, { Component } from 'react';

import firebase from './firebase.js';

import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

export default class UserInfo extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      team: '',
      email: '',
      phone: '',
      users: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateProperty(property, value) {
    this.setState({
      //[e.target.name]: e.target.value
      property: value
    });
  }

  handleChange(e) {
    //console.log("Property: " + e.target.name + " Value: " + e.target.value)
    //console.log("State value: " + this.state.name)
    this.setState({
      [e.target.name]: e.target.value
      //property: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const usersRef = firebase.database().ref('users');
    const user = {
      Name: this.state.name,
      Team: this.state.team,
      Email: this.state.email,
      Phone: this.state.phone
    }
    usersRef.push(user);
    this.setState({
      name: '',
      team: '',
      email: '',
      phone: ''
    });
  }

  render() {
    return (
      <div>
        <div style={{ padding: '3px', margin: '5px' }} className="ui-g-2">
          <form onSubmit={this.handleSubmit}>
            <Panel header="Add User Form">
              <div className="ui-grid ui-grid-responsive ui-fluid">

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="user">User Name</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '80%', width: '100%' }}>
                  <InputText id="user" name="name" placeholder="Enter user name" onChange={this.handleChange} value={this.state.name} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="team">Team Name</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '80%', width: '100%' }}>
                  <InputText id="team" name="team" placeholder="Enter user's team" onChange={this.handleChange} value={this.state.team} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="email">Email</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '80%', width: '100%' }}>
                  <InputText id="email" name="email" placeholder="Enter user Email" onChange={this.handleChange} value={this.state.email} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="phone">Phone</label></div>
                <div className="ui-grid-col-12" style={{ padding: '4px 10px', fontSize: '80%', width: '100%' }}>
                  <InputText id="phone" name="phone" placeholder="Enter user phone" onChange={this.handleChange} value={this.state.phone} />
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-8" style={{ padding: '4px 10px', textAlign: 'left' }}>
                    <Button label="Save" icon="fa-check" type="submit" />
                  </div>
                </div>

              </div>
            </Panel>
          </form>
        </div>
      </div>
    );
  }
}