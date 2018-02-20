import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserInfo from './UserInfo';
import AddEmployee from './AddEmployee';

import { TabView, TabPanel } from 'primereact/components/tabview/TabView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content-section introduction App-header">
          <div className="feature-intro">
            <h1>Welcome</h1>
            <p>User Information displayed here.</p>
          </div>
        </div>
        {/*<UserInfo />*/}


        <TabView>
          <TabPanel header="Add/Show Employees" leftIcon="fa-calendar">
            <AddEmployee />
          </TabPanel>
          <TabPanel header="Second Tab">
            This is Tab 2
          </TabPanel>
        </TabView>

      </div>
    );
  }
}

export default App;
