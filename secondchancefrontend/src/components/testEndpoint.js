import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';



export class TestEndpoint extends React.Component
{
    /**********************************
     *                                *
     *          The PUTs              *
     *                                *
     **********************************/

    Test_client_Handle()
    {
        console.log("Testing_client PUT");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": 1, "name":'Kevin Vo', "age": 1, "sex": 1, "medical_history": 1, "email": "1@yahoo.com", "password": 1, "pat_id": 3})
        };

        fetch("http://52.247.220.137:80/client", requestOptions)
            .then(response => console.log(response));

    }

    Test_physician_Handle()
    {
        console.log("Testing_physician PUT");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"npi": 99, "username": 1, "name": "Eric Diaz", "bio": "Dances in the evening",
                "addr": "1987 Apple Dr", "qual": "Butts", "reviewCnt": 1, "email": "phy@phy.com", "password": "258", "phy_id":3})
        };

        fetch("http://52.247.220.137:80/physician", requestOptions)
            .then(response => console.log(response));
    }

    Test_update_pending_records_Handle()
    {
        console.log("Testing_update_pending_records PUT");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": 1, "assessment": 1, "status": "Complete"})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response=>response.text()).then(text => console.log(text));

    }



    Test_WTFFF_accept_pending_record_Handle()
    {
        console.log("WTFFF_accept_pending_record PUT");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": 2})
        };

        fetch("http://52.247.220.137:80/accept_pending_record", requestOptions)
            .then(response => console.log(response));
    }

    /**********************************
     *                                *
     *          The POSTs             *
     *                                *
     **********************************/

    Test_record_assessment_Handle()
    {
        console.log("Testing record_assessment POST");

        const requestOptions ={
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( {"record_id": 1, "physician_id": 1, "pat_id": 1} )
        };

        fetch("http://52.247.220.137/record_assessment", requestOptions)
            .then(response => console.log(response));
    }



    Test_get_client_records_Handle()
    {
        console.log("Testing get_client_records POST ");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"record_id":1,"pat_id":1,"physician_id":1})
        };

        fetch("http://52.247.220.137:80/client_records",requestOptions)
            .then(response => response.json())
            .then(json => console.log(json));



    }

    Test_get_all_physician_records_Handle()
    {
        console.log("Testing get_all_physician_records POST");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id":1})
        };

        fetch("http://52.247.220.137:80/get_all_physician_records",requestOptions)
            .then(response => response.json())
            .then(json => console.log(json));



    }

    Test_get_all_patient_records_Handle()
    {
        console.log("Testing get_all_patient_records POST");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"pat_id":1})
        };

        fetch("http://52.247.220.137:80/get_all_patient_records",requestOptions)
            .then(response => response.json())
            .then(json => console.log(json));



    }

    /**********************************
     *                                *
     *          The GETs              *
     *                                *
     **********************************/

    Test_get_pending_records_Handle()
    {
        console.log("Testing get_pending_records GET");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id": 3})
        };

        fetch("http://52.247.220.137/get_pending_records", requestOptions)
            .then(response => response.json())
            .then(json => console.log(json));

    }

    Test_hospitals_Handle()
    {
        console.log("Testing Hospitals GET");

        fetch("http://52.247.220.137:80/hospitals")
            .then(response => response.json())
            .then(json => console.log(json));
    }


    Test_client_all_Handle()
    {
        console.log("Testing client_all GET");

        fetch("http://52.247.220.137:80/client/all")
            .then(response => response.json())
            .then(json => console.log(json));
    }

    Test_client_id_Handle()
    {
        console.log("Testing client_<id> GET");

        fetch("http://52.247.220.137:80/client/1")
            .then(response => response.json())
            .then(json => console.log(json));
    }
    Test_physician_login_Handle()
    {
        console.log("Testing physician_login POST");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: "bib@aol.com", password: 1})
        };

        fetch("http://52.247.220.137:80/physician/login", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response));

    }

    render()
    {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Container style={{textAlign: "center"}}>
                                <Row>
                                    <Col>PUTs</Col>

                                </Row>

                                <Row>
                                    <Button onClick={this.Test_client_Handle}>/client</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_physician_Handle}>/physician</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_update_pending_records_Handle}>/update_pending_records</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_WTFFF_accept_pending_record_Handle}>WTFFF_accept_pending_record</Button>
                                </Row>


                            </Container>
                        </Col>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>POSTs</Col>

                                </Row>
                                <Row>
                                    <Button onClick={this.Test_record_assessment_Handle}>/record_assessment</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_get_client_records_Handle}>/client_records</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_physician_login_Handle}>/physician/login</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_get_all_physician_records_Handle}>/get_all_physician_records</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_get_all_patient_records_Handle}>/get_all_patient_records</Button>
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>GETs</Col>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_client_all_Handle}>/client/all</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_client_id_Handle}>/client/id</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_hospitals_Handle}>/hospitals</Button>
                                </Row>
                                <Row>
                                    <Button onClick={this.Test_get_pending_records_Handle}>/get_pending_records</Button>
                                </Row>

                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}