import React from 'react';
import './caseManagement/caseManagement.css';

import {GenerateSortableTable} from '../generateSortableTable';

export class DrCaseManagement extends React.Component
{

    constructor(props) {
        super(props);
        console.log("PROPS FOR DR CASE MANAGEMENT");
        console.log(props);
        this.data = {
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
        }, {
            dataField: 'acceptButton',
            text: 'Accept',
            sort: false
        }, {
            dataField: 'createAssessmentButton',
            text: 'Assessment',
            sort: false
        }, {
            dataField: 'payButton',
            text: 'Payment',
            sort: false
        },{
            dataField: 'viewFullCaseButton',
            text: 'View Case',
            sort: false
        }
        ];

        this.data.requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id": this.props.userInfo.phy_id})
        };
        this.data.URL_for_Fetch = "http://52.247.220.137/get_all_physician_records";
        this.data.userInfo = this.props.userInfo;
    }

    render() {
        return (
            <div>
                <div className={"CaseMgmtFixedBackgroundImg"} />
                <GenerateSortableTable incomingData = {this.data} phy_id={this.props.userInfo.phy_id}/>
            </div>
        );
    }
}