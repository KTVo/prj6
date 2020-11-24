import React, { useState } from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import patientImg from '../../pictures/patient_avatar/pat_avatar_1.jpg';
import primaryImg from '../../pictures/patient_avatar/male_tux.PNG';
import {SlidePageTransitionAnimation} from '../animations/ani_slideIn';

import './fullView/fullViewCase.css';

export function FullViewCase(caseDetails)
{
    const [show, toggleShow] = useState(true);
    let completeValue = "complete";
    let awaitPayValue = "awaiting payment";
    let pendingValue = "pending";
    let cancelValue = "canceled";
    let caseStatus = "canceled";

    function PageTitleBlock()
    {
        return(
            <div>
                <h2><u>Case View:</u></h2>
                <div style={{height:"40px"}} />
                <Row>
                    <Container className={"CaseTitleBlock"}>
                        <h1 style={{color:"white"}}>Case ID:</h1>
                        <h1 style={{color:"white"}}>Status:
                            {

                            (caseStatus == completeValue) && <h2 style={{display: "inline", color:"#4BFF23",
                                fontWeight:"bold"}}> Completed</h2>

                            }
                            {

                                (caseStatus == awaitPayValue) && <h2 style={{display: "inline", color:"#FFFF00",
                                    fontWeight:"bold"}}> Awaiting Payment from Patient</h2>

                            }
                            {

                                (caseStatus == pendingValue) && <h2 style={{display: "inline", color:"#FFFF00",
                                    fontWeight:"bold"}}> Awaiting Acceptance from Secondary Physician</h2>

                            }
                            {

                                (caseStatus == cancelValue) && <h2 style={{display: "inline", color:"#FF0027",
                                    fontWeight:"bold"}}> Cancelled</h2>

                            }
                        </h1>
                    </Container>
                </Row>
            </div>

        );
    }

    function PatientInfoBlock()
    {
        return(
            <Container className={"IndividualBlock"}>

                <Row style={{borderColor:"black", borderStyle:"solid", borderSize:"1px"}}>
                    <Col>
                        <img style={{padding:"1px", border: "1px solid black"}} src={patientImg}/>
                    </Col>
                    <Col style={{marginTop: "20px"}}>
                        <h5><u>Patient Details:</u></h5>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Patient's Name:</h4>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Patient's Age:</h4>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Patient's Sex:</h4>
                    </Col>
                </Row>


            </Container>
        );
    }

    function PrimaryProviderBlock()
    {
        return(
            <Container  className={"IndividualBlock"}>

                <Row>

                    <Col style={{marginTop: "15px"}}>
                        <h5><u>Primary Health Provider Details:</u></h5>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Name:</h4>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>NPI:</h4>
                    </Col>
                    <Col>
                        <img src={primaryImg} style={{padding:"2px", border: "1px solid black", marginLeft:"210px"}}/>
                    </Col>
                </Row>

            </Container>
        );
    }

    function PictureButton()
    {
        return(
            <Button className={"ShowMedicalImgButton"}>Show Medical Images</Button>
        )
    }

    function SecondaryDiagnosisBlock()
    {
        return(
            <Container className={"IndividualBlock"}>
                <Row>
                    <Row style={{marginLeft: "10px"}}>

                        <h3>Secondary Diagnosis:</h3>

                        <div style={{height:"75px"}} />
                    </Row>
                    <Row style={{marginLeft: "50px"}}>
                        <h6>Ugh... Your feet are kinda big!</h6>
                        <h6>Awaiting Second aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaDiagnosis</h6>
                        <h6>Awaiting Second aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaDiagnosis</h6>
                    </Row>

                </Row>
            </Container>
        );
    }

    function PrimaryDiagnosisBlock()
    {
        return(
            <Container className={"IndividualBlock"}>
                <Row>
                    <h3>Primary Diagnosis / Original Diagnosis:</h3>
                </Row>
                <Row style={{marginLeft: "50px"}}>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second Diagnosis</h6>
                    <h6>Awaiting Second aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaDiagnosis</h6>
                    <h6>Awaiting Second aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaDiagnosis</h6>
                    <h6>Awaiting Second aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaDiagnosis</h6>
                </Row>

            </Container>
        );
    }



    return(
        <div>
            <Modal show = {show}
                   size = {'xl'}
            >



                <Modal.Header>
                    Select Secondary Physician

                </Modal.Header>
                <Modal.Body className={"CaseFullViewMainBackgroundImg"} style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                    <Container >
                        <Button style={{marginLeft: "1000px"}}onClick={()=>{toggleShow(!show)}}>
                            Close
                        </Button>
                        {SlidePageTransitionAnimation(PageTitleBlock, "right")}
                    <div style={{height:"30px"}}/>
                    {SlidePageTransitionAnimation(PatientInfoBlock, "right")}


                    <div style={{height:"30px"}}/>

                    {SlidePageTransitionAnimation(PrimaryProviderBlock, "left")}

                    <div style={{height:"30px"}}/>

                    {SlidePageTransitionAnimation(PictureButton, "right")}

                    <div style={{height:"30px"}}/>
                    {SlidePageTransitionAnimation(SecondaryDiagnosisBlock, "left")}

                    <div style={{height:"30px"}}/>
                    {SlidePageTransitionAnimation(PrimaryDiagnosisBlock, "right")}
                    </Container>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>


        </div>
    )
}