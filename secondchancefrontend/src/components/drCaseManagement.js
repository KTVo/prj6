import React from 'react';


import {GenerateSortableTable} from './generateSortableTable';

export class DrCaseManagement extends React.Component
{

    constructor(props) {
        super(props);

        this.data={
            is_patient: false
        };

        this.data.defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        this.data.columns = [{
            dataField: 'id',
            text: 'Case ID',
            sort: true
        }, {
            dataField: 'pat_name',
            text: 'Patient Name',
            sort: true
        }, {
            dataField: 'comment',
            text: 'Original Diagnosis',
            sort: true
        },{
            dataField: 'assessment',
            text: 'Secondary Diagnosis',
            sort: true
        },{
            dataField: 'completion_dt',
            text: 'Date Completed',
            sort: true
        }, {
            dataField: 'create_dt',
            text: 'Date Created',
            sort: true
        }, {
            dataField: 'status',
            text: 'Case Status',
            sort: true
        }, {
            dataField: 'cancelButton',
            text: 'Cancel',
            sort: false
        }, {
            dataField: 'acceptButton',
            text: 'Accept',
            sort: false
        }];

        this.data.requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id": this.props.userInfo.userID})
        };
        this.data.URL_for_Fetch = "http://52.247.220.137/get_all_physician_records";
    }

    render() {
        return (
            <div>
                <GenerateSortableTable incomingData = {this.data} />
            </div>
        );
    }
}