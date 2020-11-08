import React from 'react';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {MDBInput, MDBContainer, MDBRow} from 'mdbreact';
import '../css/login.css';


export class DrWritesSecondOpinion extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
            {
                secondDiagnosisMessage: '',
                parsedJSON: []

            };

        this.correctCase = [];

    }

    componentDidMount() {
        //Convert these to props later
        let doctorID = 1;
        let allCaseInfo = [];
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id": doctorID})
        };

        fetch("http://52.247.220.137:80/get_all_physician_records",requestOptions)
            .then(response => response.json())
            .then(json => {

                for(let i = 0; i < json.length; i++)
                {
                    allCaseInfo[i] = json[i];
                }
                this.setState(
                    {
                        parsedJSON: allCaseInfo
                    }
                )
            });
    }


    ChooseCorrectCase()
    {
        this.state.parsedJSON.map((value, index) =>
        {
            if(value.record_id === this.props.passRecordId)
            {
                this.correctCase = value;
                index = this.state.parsedJSON.length;
            }
        })

    }

    handleInputChange = (event) =>
    {
        this.setState(
            {

                [event.target.name]: event.target.value
            })

    }

    SelectTitle()
    {
        /*
        if(this.props.data.userMode === 'Doctor')
        {
            return(<Form.Label><u className={"display-4"}>Case Diagnosis</u></Form.Label>);
        }
        else
        {
            return(<Form.Label><u className={"display-4"}>Case Review</u></Form.Label>);
        }
        */

    }




    showDrEditView = () =>
    {
//physician_id

        return(
            <Container style={{width:"50%", margin:"auto"}}>
                <Form className={'loginForm'} onSubmit={this.handleSubmit}>
                    {this.SelectTitle()}
                    <br />

                    <Container style={{width: "50%", margin:"auto", padding:"0px"}}>
                        <Form.Label>
                            <Row>
                                <Col  style={{width: "50%", margin:"auto", border: "1px", padding:"25px", borderStyle: "solid", borderColor: "black"}}>
                                    <h3 style={{padding: "2px"}}>Fill in Second Diagnosis</h3>
                                    <Row style={{padding:"5px"}}>Patient Name: {this.correctCase.pat_name}</Row>
                                    <Row style={{padding:"5px"}}>Patient Sex: {this.correctCase.pat_sex}</Row>
                                    <Row style={{padding:"5px"}}>Patient Age: {this.correctCase.pat_age}</Row>
                                    <Row style={{padding:"5px"}}>Patient Email: {this.correctCase.email}</Row>
                                    <Row style={{padding:"5px"}}>Record ID: {this.correctCase.record_id}</Row>
                                    <br />
                                    Patient Medical History:
                                    <Container>
                                        <Row style={{border: "2px", padding:"25px", borderStyle: "solid", borderColor: "black"}}>{this.correctCase.pat_medical_history}</Row>
                                    </Container>
                                    <br />
                                    Primary Diagnosis:
                                    <Container>
                                        <Row style={{border: "2px", padding:"25px", borderStyle: "solid", borderColor: "black"}}>{this.correctCase.comment}</Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Form.Label>
                    </Container>

                    <MDBInput  type={"textarea"}
                               name="secondDiagnosisMessage"
                               label={"Enter Second Diagnosis Here"}
                               value={this.state.secondDiagnosisMessage}
                               onChange={this.handleInputChange}
                               rows={10}
                               cols={100}
                               required/>


                    <br />


                    <Button type="button" onClick={()=>this.handleSubmit()}>Submit</Button>
                </Form>
            </Container>
        );
    }


    handleSubmit()
    {
        console.log(this.state.secondDiagnosisMessage);

        //Submit to the backend

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": 1, "assessment": this.state.secondDiagnosisMessage, "status": "Complete"})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response=>response.text()).then(text => console.log(text));


    }

    render() {
        {this.ChooseCorrectCase()}
        return(
            <div>
                {this.showDrEditView()}
            </div>


        );
    }

}