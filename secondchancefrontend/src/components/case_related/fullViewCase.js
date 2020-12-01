import React from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import patientImg from '../../pictures/patient_avatar/pat_avatar_1.jpg';
import primaryImg from '../../pictures/patient_avatar/male_tux.PNG';

import './fullView/fullViewCase.css';

export class FullViewCase extends React.Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                show: true,
                showPaymentModal: false,
                caseDetail: null
            }
        // Status: Pending, Diagnosing, Cancelled, Complete
        this.completeValue = "Complete";
        this.awaitPayValue = "awaiting payment";
        this.pendingValue = "pending";
        this.cancelValue = "canceled";
        this.caseStatus = "canceled";
    }

    componentDidMount() {

    }

    ShowPaymentModalHandler(caseInfo)
    {
        this.setState(
            {
                showPaymentModal: !this.state.showPaymentModal,
                caseDetail: caseInfo
            }
        )
    }

    GetPaymentModal()
    {
        return(
            <div>
                <Modal show = {this.state.showPaymentModal}
                       size = {'xl'}
                >

                    <Modal.Header>
                        <h1>Full Case View</h1>
                        <Button style={{left: 0}}onClick={()=>{this.setState({showPaymentModal: !this.state.showPaymentModal})}}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                        <Container >
                            <FullViewCase caseDetails={this.state.caseDetail} />
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    PageTitleBlock()
    {
        console.log(this.props.caseDetails.assessment);
        return(
            <div>
                <div style={{height:"10px"}} />
                <Row>
                    <Container className={"CaseTitleBlock"}>
                        <h1 style={{color:"white"}}>Case ID: {this.props.caseDetails.record_assessment_id}</h1>
                        <h1 style={{color:"white"}}>Status:
                            {

                                (this.props.caseDetails.assessment == this.completeValue) &&
                                    <div>
                                        <h2 style={{textAlign:"left", float:"left",color:"#4BFF23",fontWeight:"bold"}}> Completed</h2>
                                        <div style={{textAlign:"right", float:"right", display: "inline"}}>
                                            <Button
                                                onClick={()=>this.ShowPaymentModalHandler(this.props.caseDetails)}>View Payment</Button>
                                        </div>

                                    </div>

                            }
                            {

                                (this.props.caseDetails.assessment) && <h2 style={{display: "inline", color:"#FFFF00",
                                    fontWeight:"bold"}}> {this.props.caseDetails.assessment.toUpperCase()}</h2>

                            }

                        </h1>
                    </Container>
                </Row>
            </div>

        );
    }

    PatientInfoBlock()
    {
        let patientSex = 'Male';

        if(this.props.caseDetails.pat_sex != 'm')
        {
            patientSex = 'Female';
        }
        else
        {
            patientSex = 'Male';
        }

        return(
            <Container className={"IndividualBlock"}>

                <Row style={{borderColor:"black", borderStyle:"solid", borderSize:"1px"}}>
                    <Col>
                        <img style={{padding:"1px", border: "1px solid black"}} src={patientImg}/>
                    </Col>
                    <Col style={{marginTop: "20px", color:"white", fontFamily: "Times New Roman"}}>
                        <h5><u>Patient Details:</u></h5>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Patient's Name: {this.props.caseDetails.pat_name}</h4>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Patient's Age: {this.props.caseDetails.pat_age}</h4>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px"}}>Patient's Sex: {patientSex}</h4>
                    </Col>
                </Row>


            </Container>
        );
    }

    PrimaryProviderBlock()
    {
        return(
            <Container  className={"IndividualBlock"}>

                <Row>
                    <Col style={{marginTop: "15px"}}>
                        <h5 style={{color:"white", fontFamily: "Times New Roman"}}><u>Primary Health Provider Details:</u></h5>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px", color:"white", fontFamily: "Times New Roman"}}>
                            Name: {this.props.caseDetails.phy_name}
                        </h4>
                        <h4 style={{marginLeft: "15px", marginBottom: "15px", color:"white", fontFamily: "Times New Roman"}}>
                            NPI: {this.props.caseDetails.phy_id}
                        </h4>
                    </Col>
                    <Col>
                        <img src={primaryImg} style={{padding:"2px", border: "1px solid black", marginLeft:"210px"}}/>
                    </Col>
                </Row>

            </Container>
        );
    }

    PictureButton()
    {
        return(
            <Button className={"ShowMedicalImgButton"} style={{color:"white", fontFamily: "Times New Roman"}}>Show Medical Images</Button>
        )
    }

    SecondaryDiagnosisBlock()
    {
        return(
            <Container className={"IndividualBlock"}>

                <Row style={{marginLeft: "10px"}}>
                    <h3 style={{color:"white", fontFamily: "Times New Roman"}}><u>Primary Diagnosis:</u></h3>
                </Row>
                <Row style={{marginLeft: "50px", color:"white", fontFamily: "Times New Roman"}}>
                    <div style={{height:"85px"}} />
                    <h5>{this.props.caseDetails.comment}</h5>
                </Row>

            </Container>
        );
    }

    PrimaryDiagnosisBlock()
    {
        return(
            <Container className={"IndividualBlock"} style={{color:"white", fontFamily: "Times New Roman"}}>
                <Row>
                    <h3 style={{color:"white", fontFamily: "Times New Roman"}}><u>Patient Bio:</u></h3>
                </Row>
                <div style={{height:"10px"}} />
                <Row  style={{marginLeft: "50px", color:"white", fontFamily: "Times New Roman"}}>
                    <h5 style={{color: "white"}}>{this.props.caseDetails.pat_medical_history}</h5>
                </Row>

            </Container>
        );
    }


render() {
        console.log("hello");
    return(
        <div>
            {this.GetPaymentModal()}
            {this.PageTitleBlock()}
            <div style={{height:"30px"}}/>
            {this.PatientInfoBlock()}


            <div style={{height:"30px"}}/>

            {this.PrimaryProviderBlock()}

            <div style={{height:"30px"}}/>

            {this.PictureButton()}

            <div style={{height:"30px"}}/>
            {this.SecondaryDiagnosisBlock()}

            <div style={{height:"30px"}}/>
            {this.PrimaryDiagnosisBlock()}
        </div>
    )
}


}

/*
  {this.PageTitleBlock()}
                        <div style={{height:"30px"}}/>
                        {this.PatientInfoBlock()}


                        <div style={{height:"30px"}}/>

                        {this.PrimaryProviderBlock()}

                        <div style={{height:"30px"}}/>

                        {this.PictureButton()}

                        <div style={{height:"30px"}}/>
                        {this.SecondaryDiagnosisBlock()}

                        <div style={{height:"30px"}}/>
                        {this.PrimaryDiagnosisBlock()}
 */