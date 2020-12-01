import React from 'react';
import {SlidePageTransitionAnimation} from '../animations/ani_reload_mgmt_table';
import './caseManagement/caseManagement.css';

//Generates a case management table for a clients so they can interact with the cases belonging to them
export class ClientTable_OnGoing extends React.Component
{

    constructor(props) {
        super(props);
        console.log("GET DEEZ PROPS for Patient");
        console.log(props);
        this.data={
            is_patient: true
        };

        this.data.defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        this.data.columns = [{
            dataField: 'phy_name',
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
        },{
            dataField: 'payButton',
            text: 'Payment',
            sort: false
        }, {
            dataField: 'viewFullCaseButton',
            text: 'View Case',
            sort: false
        }];

        this.data.requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"pat_id": this.props.userInfo.pat_id})
        };
        this.data.URL_for_Fetch = "http://52.247.220.137/get_all_patient_records";
        this.data.userInfo = this.props.userInfo;
    }

    render() {
        console.log("AAAAdata from client_ongoing");
        console.log(this.data);
        console.log('THIS IS PROPS');
        console.log(this.props.userInfo.pat_id);
        return (
            <div>
                <div className={"CaseMgmtFixedBackgroundImg"} />
                <SlidePageTransitionAnimation incomingData={this.data} />
            </div>
        );
    }
}