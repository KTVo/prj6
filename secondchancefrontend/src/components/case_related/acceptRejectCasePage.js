import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap'


//This function send a request to cancel a selected case on the server
function choseToRejectCase (caseProp)
{
    console.log("Testing_update_pending_records PUT");

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"record_assessment_id": 1, "assessment": 1, "status": "Reject"})
    };

    fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
        .then(response=>response.text()).then(text => console.log(text));

}

//This function send a request to accept a selected case on the server
function choseToAcceptCase (caseProp)
{
    console.log("running accept_pending_record PUT");

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"record_assessment_id": 2})
    };

    fetch("http://52.247.220.137:80/accept_pending_record", requestOptions)
        .then(response => console.log(response));

}


//Displays a modal with two buttons
//To Accept or Reject a case
function AcceptRejectCaseUI(caseProp)
{
    return(
        <div>
            <Container>
                <Row>
                    <label>Would you like to do with this case#{caseProp.data.ID}?</label>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={(caseProp=>{choseToAcceptCase(caseProp)})}>Accept</Button>
                    </Col>
                    <Col>
                        <Button onClick={(caseProp=>{choseToRejectCase(caseProp)})}>Reject</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}




export class AcceptRejectCasePage extends React.Component
{
    render() {

        return (
            <div>
                {AcceptRejectCaseUI(this.prop)}
            </div>
        );
    }

}
