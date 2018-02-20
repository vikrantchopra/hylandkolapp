import React, { Component } from 'react';

import firebase from './firebase.js';

import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';

export default class AddEmployee extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      shortname: '',
      empid: '',
      team: '',
      title: '',
      email: '',
      phone: '',
      seat: '',
      extension: '',
      //agilecoach: '',
      manager: '',
      employees: [],
      selectedEmployees: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const empsRef = firebase.database().ref('employee');
    const emp = {
      Name: this.state.name,
      ShortName: this.state.shortname,
      EmpId: this.state.empid,
      Team: this.state.team,
      Title: this.state.title,
      Email: this.state.email,
      Phone: this.state.phone,
      Seat: this.state.seat,
      Extension: this.state.extension,
      Manager: this.state.manager
    }
    empsRef.push(emp);
    this.setState({
      name: '',
      shortname: '',
      empid: '',
      team: '',
      title: '',
      email: '',
      phone: '',
      seat: '',
      extension: '',
      manager: ''
    });
  }

  componentDidMount() {
    const employeesRef = firebase.database().ref('employee');
    employeesRef.on('value', (snapshot) => {
      let emps = snapshot.val();
      let newState = [];
      for (let emp in emps) {
        newState.push({
          id: emp,
          Name: emps[emp].Name,
          ShortName: emps[emp].ShortName,
          EmpId: emps[emp].EmpId,
          Team: emps[emp].Team,
          Title: emps[emp].Title,
          Email: emps[emp].Email,
          Phone: emps[emp].Phone,
          Seat: emps[emp].Seat,
          Extension: emps[emp].Extension,
          Manager: emps[emp].Manager
        });
      }
      this.setState({
        employees: newState
      });
    });
  }

  displaySelection(data) {
    if (!data || data.length === 0) {
      return <div style={{ textAlign: 'left' }}>No Selection</div>;
    }
    else {
      if (data instanceof Array)
        return <ul style={{ textAlign: 'left', margin: 0 }}>{data.map((employee, i) => <li key={employee.id} style={{listStyle: 'none'}}>{employee.Email}</li>)}</ul>;
      else
        return <div style={{ textAlign: 'left' }}>Selected Employee: {data.email}</div>
    }
  }

  render() {
    let employees = this.state.employees;
    var employeeCount = this.state.employees ? this.state.employees.length : 0;
    var header = <div className="ui-helper-clearfix" style={{ 'lineHeight': '1.87em' }}>Employee List <Button icon="fa-refresh" style={{ 'float': 'right' }} /></div>;
    var footer = "There are " + employeeCount + ' employees';
    return (
      <div class="ui-g">


        <div class="ui-g-2">
          <form onSubmit={this.handleSubmit}>
            <Panel header="Add-Employee Form">
              <div className="ui-grid ui-grid-responsive ui-fluid">
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="employee">Employee Name</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="employee" name="name" placeholder="Enter Employee name" onChange={this.handleChange} value={this.state.name} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="shortname">Short Name</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="shortname" name="shortname" placeholder="Enter Employee Short Name" onChange={this.handleChange} value={this.state.shortname} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="empid">Employee ID</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="empid" name="empid" placeholder="Enter Employee Id" onChange={this.handleChange} value={this.state.empid} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="team">Team Name</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="team" name="team" placeholder="Enter Employee team" onChange={this.handleChange} value={this.state.team} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="title">Employee Title</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="title" name="title" placeholder="Enter Employee title" onChange={this.handleChange} value={this.state.title} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="email">Email</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="email" name="email" placeholder="Enter Employee email" onChange={this.handleChange} value={this.state.email} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="phone">Phone</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="phone" name="phone" placeholder="Enter Employee phone" onChange={this.handleChange} value={this.state.phone} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="seat">Seat</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="seat" name="seat" placeholder="Enter Employee seat" onChange={this.handleChange} value={this.state.seat} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="extn">Extension</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="extn" name="extension" placeholder="Phone Extension" onChange={this.handleChange} value={this.state.extension} />
                </div>

                <div className="ui-grid-col-12" style={{ padding: '2px 10px', textAlign: 'left' }}><label htmlFor="manager">Manager</label></div>
                <div className="ui-grid-col-12" style={{ padding: '2px 10px', fontSize: '100%', width: '100%' }}>
                  <InputText id="manager" name="manager" placeholder="Enter manager name" onChange={this.handleChange} value={this.state.manager} />
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

        <div class="ui-g-10">
          <DataTable value={employees} style={{ fontSize: '100%', textAlign: 'left' }} header={header} footer={this.displaySelection(this.state.selectedEmployees)} autoLayout="true"
            selection={this.state.selectedEmployees} onSelectionChange={(e) => this.setState({ selectedEmployees: e.data })}>
            <Column selectionMode="multiple" style={{ width: '2em', backgroundColor: 'white' }} className="ui-chkbox-label" />
            <Column field="Name" header="Name" style={{ width: 120, textAlign: 'left' }} />
            <Column field="ShortName" header=" Short Name" style={{ width: 80, textAlign: 'left' }} sortable="true" />
            <Column field="EmpId" header="Emp ID" style={{ width: 70, textAlign: 'left' }} />
            <Column field="Team" header="Team" style={{ width: 80, textAlign: 'left' }} />
            <Column field="Title" header="Title" style={{ width: 90, textAlign: 'left' }} />
            <Column field="Email" header="Email" style={{ width: 180, textAlign: 'left' }} />
            <Column field="Phone" header="Phone" style={{ width: 110, textAlign: 'left' }} />
            <Column field="Seat" header="Seat" style={{ width: 60, textAlign: 'left' }} />
            <Column field="Extension" header="Extn" style={{ width: 50, textAlign: 'left' }} />
            <Column field="Manager" header="Manager" style={{ width: 100, textAlign: 'left' }} />
          </DataTable>
        </div>

      </div>
    );
  }

}