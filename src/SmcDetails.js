import React, { Component } from 'react';


import { OrganizationChart } from 'primereact/components/organizationchart/OrganizationChart';

export default class SmcDetails extends Component {

    constructor() {
        super();
    }

    nodeTemplate(node) {
        if (node.type === "person") {
            return (<div>
                <div className="node-header ui-corner-top">{node.label}</div>
                <div className="node-content">
                    <img alt={node.data.avatar} src={`showcase/resources/demo/images/organization/${node.data.avatar}`} style={{ width: '32px' }} />
                    <div>{node.data.name}</div>
                </div>
            </div>);
        }

        if (node.type === "department") {
            return node.label;
        }
    }

    render() {
        var data1 = [{
            label: 'Manager',
            type: 'person',
            className: 'ui-person',
            expanded: true,
            data: { name: 'Dipankar Das', 'avatar': 'male1.png' },
            children: [
                {
                    label: 'Scrum Master',
                    type: 'person',
                    className: 'ui-person',
                    expanded: false,
                    data: { name: 'Anita Guha', 'avatar': 'female1.png' },
                    children: [{
                        label: 'Mobile View',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Mobile Capture',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Mobile Configuration',
                        className: 'department-cfo'
                    }],
                },
                {
                    label: 'Scrum Master',
                    type: 'person',
                    className: 'ui-person',
                    expanded: false,
                    data: { name: 'Arindam Chakraborty', 'avatar': 'male1.png' },
                    children: [{
                        label: 'Warriors',
                        className: 'department-coo'
                    },
                    {
                        label: 'Knight Riders',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Royals',
                        className: 'department-cfo'
                    }]
                },
                {
                    label: 'Scrum Master',
                    type: 'person',
                    className: 'ui-person',
                    expanded: false,
                    data: { name: 'Soumya Sikder', 'avatar': 'male1.png' },
                    children: [{
                        label: 'Nolij',
                        className: 'department-coo'
                    },
                    {
                        label: 'Super Kings',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Prod. Engg',
                        className: 'department-cfo'
                    }]
                },
                {
                    label: 'Scrum Master',
                    type: 'person',
                    className: 'ui-person',
                    expanded: false,
                    data: { name: 'Suvonkar Dam', 'avatar': 'male1.png' },
                    children: [{
                        label: 'IHE',
                        className: 'department-coo'
                    },
                    {
                        label: 'Dare Devils',
                        className: 'department-cfo'
                    },
                    {
                        label: 'DAX',
                        className: 'department-cfo'
                    }]
                },
                {
                    label: 'Scrum Master',
                    type: 'person',
                    className: 'ui-person',
                    expanded: false,
                    data: { name: 'Subrata RoyChowdhury', 'avatar': 'male1.png' },
                    children: [{
                        label: 'Media Portal',
                        className: 'department-coo'
                    },
                    {
                        label: 'Media Manager',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Alchemist',
                        className: 'department-cfo'
                    }]
                },
                {
                    label: 'Scrum Master',
                    type: 'person',
                    className: 'ui-person',
                    expanded: false,
                    data: { name: 'Vikrant Chopra', 'avatar': 'male1.png' },
                    children: [{
                        label: 'Nile',
                        className: 'department-coo'
                    },
                    {
                        label: 'Rhine',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Indus',
                        className: 'department-cfo'
                    },
                    {
                        label: 'Search',
                        className: 'department-cfo'
                    }]
                }
            ]
        }];

        return (
            <div class="ui-organizationchart">
                
                <OrganizationChart value={data1} nodeTemplate={this.nodeTemplate.bind(this)} style={{fontSize: "75%"}}></OrganizationChart>
            </div>

        );

    }
}