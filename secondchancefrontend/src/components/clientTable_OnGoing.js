import React from 'react';

import {GenerateSortableTable} from './generateSortableTable';

export class ClientTable_OnGoing extends React.Component
{

    constructor(props) {
        super(props);

        this.data={
            is_patient: true
        };

        this.data.defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        this.data.columns = [{
            dataField: 'name',
            text: 'Doctor',
            sort: true
        }, {
            dataField: 'comment',
            text: 'Original Diagnosis',
            sort: true
        }, {
            dataField: 'assessment',
            text: 'Secondary Diagnosis',
            sort: true
        }, {
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
            }];

        this.data.requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"pat_id": this.props.userInfo.userID})
        };
        this.data.URL_for_Fetch = "http://52.247.220.137/get_all_patient_records";
    }

    render() {
        return (
            <div>
                <GenerateSortableTable incomingData = {this.data} />
            </div>
        );
    }
}