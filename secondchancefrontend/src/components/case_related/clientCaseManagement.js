import React from 'react';

import {ClientTable_OnGoing} from './clientTable_OnGoing';

//Renders the UI for client case management table
export class ClientCaseManagement extends React.Component
{
    constructor(props) {
        super(props);


    }



    render() {
      console.log("from Client Case Management modeID = " + this.props.userInfo.modeID);
      console.log("from Client Case Management userID = " + this.props.userInfo.userID);


      return(
          <div>
              <div className={"CaseMgmtFixedBackgroundImg"} />
              <h2 style={{zIndex: "50", width:"100%", position: "fixed", marginBottom:"10%",
                  color: "white", textAlign: 'center',
                  background: `rgba(0,0,0,0.9)`}}><u>Patient Case Management</u></h2>
              <div style={{height:"40px"}}/>
              <ClientTable_OnGoing userInfo = {this.props.userInfo}/>

          </div>
      );
  }
};

//   <ClientTable_Completed userInfo = {this.props.userInfo}/>