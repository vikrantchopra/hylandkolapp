import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserInfo from './UserInfo';
import AddEmployee from './AddEmployee';
import SmcDetails from './SmcDetails';
import AddRelease from './AddRelease';

import { TabView, TabPanel } from 'primereact/components/tabview/TabView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content-section introduction App-header">
          <div className="feature-intro">
            <h1>Welcome to Hyland Kolkata</h1>
            
          </div>
        </div>
        {/*<UserInfo />*/}


        <TabView>
          <TabPanel header="Add/Show Employees">
            <AddEmployee />
          </TabPanel>
          <TabPanel header="Our Community">
            <SmcDetails />
          </TabPanel>
          <TabPanel header="Add/Show Releases">
            <AddRelease />
          </TabPanel>
        </TabView>

      </div>
    );
  }
}

export default App;
