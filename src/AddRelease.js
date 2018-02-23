import React, { Component } from 'react';

import firebase from './firebase.js';

import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';
import { Calendar } from 'primereact/components/calendar/Calendar';

import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';

export default class AddRelease extends Component {

  constructor() {
    super();

    this.state = {
      team: '',
      releaseName: '',
      releaseDate: null,
      comments: '',
      link: '',
      releaseList: [],
      dateRange: null
    }

    this.handleChange = this.handleChange.bind(this);
    //this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.dateBoundReleases = this.dateBoundReleases.bind(this);
    this.dateTemplate = this.dateTemplate.bind(this);
  }

  dateTemplate(rowData, column) {
    return <span>{rowData.Date}</span>;
  }

  dateBoundReleases() {//SimpleDateFormat.parse(String)
    let startDate = this.state.dateRange[0];
    let endDate = this.state.dateRange[1];
    //let startDate = new Date(this.state.dateRange[0]).getMilliseconds();
    //let endDate = new Date(this.state.dateRange[1]).getMilliseconds();

    //let formattedValue = this.formatDateTime(startDate);

   

    let today = new Date();
    //let olderDate = new Date().setDate(today.getDate() - 6);
    //let priorDate = new Date(olderDate);

    console.log("Start Date: " + startDate + "  -- End Date: " + endDate + " and today is: " + today);

    const releaseRef = firebase.database().ref('release');
    releaseRef.orderByChild("Date").startAt("Mon Jan 01 2018-").endAt("Thu Feb 22 2018~").on('value', (snapshot) => {
      let rels = snapshot.val();
      let newState = [];
      for (let rel in rels) {
        newState.push({
          id: rel,
          Team: rels[rel].Team,
          Release: rels[rel].Release,
          Date: rels[rel].Date,
          Comments: rels[rel].Comments,
          Link: rels[rel].Link
        });
      }
      this.setState({
        releaseList: newState
      });
    });
  }

  /**
   * ref.orderByChild("date").startAt(startDate).endAt(endDate)
  .on("child_added", function(snapshot){
    console.log("got the data!", snapshot);
  });
   */

  handleChange(e) {

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /*handleDate(e) {
    
    console.log("Release Date: " + this.state.releaseDate)
  }

  handleDate(e) {
    console.log("Name: " + e.value)
    this.setState({
      [e.name]: e.value
    });
  }*/

  handleSubmit(e) {
    e.preventDefault();
    const releaseRef = firebase.database().ref('release');

    const newRelease = {
      Team: this.state.team,
      Release: this.state.releaseName,
      Date: this.state.releaseDate.toDateString(),
      Comments: this.state.comments,
      Link: this.state.link
    }
    releaseRef.push(newRelease);

    this.setState({
      team: '',
      releaseName: '',
      releaseDate: null,
      comments: '',
      link: ''
    });
  }

  componentDidMount() {
    const releaseRef = firebase.database().ref('release');
    releaseRef.on('value', (snapshot) => {
      let rels = snapshot.val();
      let newState = [];
      for (let rel in rels) {
        newState.push({
          id: rel,
          Team: rels[rel].Team,
          Release: rels[rel].Release,
          Date: rels[rel].Date,
          Comments: rels[rel].Comments,
          Link: rels[rel].Link
        });
      }
      this.setState({
        releaseList: newState
      });
    });
  }

  render() {
    let myReleases = this.state.releaseList;
    return (
      <div class="ui-g">

        <div class="ui-g-12 ui-widget-header" style={{ padding: '4px 10px', borderBottom: '0 none' }}>
          <label style={{ paddingRight: '5px' }}>Date Bound Releases : Date Range</label>
          <Calendar style={{ paddingRight: '5px' }} value={this.state.dateRange} selectionMode="range" onChange={(e) => this.setState({ dateRange: e.value })}></Calendar>
          <Button label="Click" onClick={this.dateBoundReleases} />
        </div>

        <div class="ui-g-4">
          <form onSubmit={this.handleSubmit}>
            <Panel header="Add-Release Form">
              <div className="ui-grid ui-grid-responsive ui-fluid">


                <div className="ui-grid-row">
                  <div className="ui-grid-col-4" style={{ padding: '6px 20px', textAlign: 'left' }}><label htmlFor="team">Team Name</label></div>
                  <div className="ui-grid-col-8" style={{ padding: '4px 10px', width: '50%' }}>
                    <InputText id="team" name="team" placeholder="Enter team name" onChange={this.handleChange} value={this.state.team} />
                  </div>
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-4" style={{ padding: '6px 20px', textAlign: 'left' }}><label htmlFor="release">Release Name</label></div>
                  <div className="ui-grid-col-8" style={{ padding: '4px 10px', width: '50%' }}>
                    <InputText id="release" name="releaseName" placeholder="Enter release name" onChange={this.handleChange} value={this.state.releaseName} />
                  </div>
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-4" style={{ padding: '6px 20px', textAlign: 'left' }}><label htmlFor="date">Release Date</label></div>
                  <div className="ui-grid-col-8" style={{ color: '#7cc67c', padding: '4px 20px 4px 0px', width: '50%', marginLeft: '-3px' }}>
                    <Calendar id="date" name="releaseDate" showIcon="true" dateFormat="dd/mm/yy" onChange={(e) => { this.setState({ releaseDate: e.value }) }} value={this.state.releaseDate}></Calendar>
                  </div>
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-4" style={{ padding: '6px 20px', textAlign: 'left' }}><label htmlFor="release">Comments</label></div>
                  <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                    <InputText id="comments" name="comments" placeholder="Enter comments" onChange={this.handleChange} value={this.state.comments} />
                  </div>
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-4" style={{ padding: '6px 20px', textAlign: 'left' }}><label htmlFor="link">Release Link</label></div>
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-12" style={{ padding: '4px 10px 4px 20px' }}>
                    <InputText id="link" name="link" onChange={this.handleChange} value={this.state.link} />
                  </div>
                </div>

                <div className="ui-grid-row">
                  <div className="ui-grid-col-4" style={{ padding: '6px 20px', textAlign: 'left' }}>
                    <Button label="Save" icon="fa-check" type="submit" />
                  </div>
                </div>


              </div>
            </Panel>
          </form>
        </div>
        <div class="ui-g-8">

          <DataTable value={myReleases}>
            <Column field="Team" header="Team" style={{ width: 120 }} />
            <Column field="Release" header="Release" style={{ width: 160, textAlign: 'left' }} />
            <Column field="Date" header="Release Date" style={{ width: 130, textAlign: 'left' }}  body={this.dateTemplate} dateFormat="dd/mm/yy"/>
            <Column field="Comments" header="Comments" />
            <Column field="Link" header="Link" style={{ textAlign: 'left' }} />
          </DataTable>
        </div>
      </div>
    );

  }

}