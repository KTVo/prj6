import React from 'react';

import {ClientTable_OnGoing} from './clientTable_OnGoing';

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
              <h2 style={{textAlign: 'center'}}><u>Patient Case Management</u></h2>
              <ClientTable_OnGoing userInfo = {this.props.userInfo}/>

          </div>
      );
  }
};

//   <ClientTable_Completed userInfo = {this.props.userInfo}/>