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
            body: JSON.stringify({username: 1, age: 1, sex: 1, medical_history: 1, email: "1@yahoo.com", password: 1})
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
            body: JSON.stringify({npi: 1, username: 1, name: 1, bio: 1, addr: 1, qual: 1, reviewCnt: 1, email: 1, password: 1})
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
            body: JSON.stringify({record_assesment_id: 1, assesment: 1, status: 1})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response => console.log(response));
    }

    Test_WTFFF_accept_pending_record_Handle()
    {
        console.log("WTFFF_accept_pending_record PUT");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({record_assesment_id: 1})
        };

        fetch("http://52.247.220.137:80/accept_pending_record", requestOptions)
            .then(response => console.log(response));
    }

    /**********************************
     *                                *
     *          The POSTs              *
     *                                *
     **********************************/


    Test_physician_login_Handle()
    {
        console.log("Testing physician_login POST");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: 1, password: 1})
        };

        fetch("http://52.247.220.137:80/physician/login", requestOptions)
            .then(response => console.log(response));
    }

    /**********************************
     *                                *
     *          The GETs              *
     *                                *
     **********************************/
    Test_hospitals_Handle()
    {
        console.log("Testing Hospitals GET");

        fetch("http://52.247.220.137:80/hospitals?phy_id=3")
            .then(response => response.json())
            .then(json => console.log(json));
    }

    Test_get_pending_records_Handle()
    {
        console.log("Testing get_pending_records GET");

        fetch("http://52.247.220.137:80/get_pending_records?phy_id=3")
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
                                    <Button onClick={this.Test_physician_login_Handle}>/physician/login</Button>
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
                                    <Button onClick={this.Test_hospitals_Handle}>/hospitals (HARD CRASHES)</Button>
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