import React from 'react';
import {PicCarousel} from '../picCarousel';
import {MultiBrowsePic} from '../multiBrowsePic';
import {Payment_Form} from "../payment/payment_form"
import {Row, Col, Button, Form, Container} from 'react-bootstrap';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Caller_SwipeCardAnimation} from '../card_related/caller_SwipeCardAnimation';
import {PatientSlidePanel} from "../patientSidePanel";
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/style.css';
import './caseCreation/fixedBackground_caseCreationPage.css';


export class CaseCreation extends React.Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                pat_notes: '',  //Details that patients can add to case
                patientSelectedCategory: '',
                people1: [],
                patientRecords: [],
                is_rec_loading: true,
                record_id: this.props.userInfo.record_id,
                submitButtonClicked: false
            };
        this.data = {
            pics: '',    //Images of the patient for the case
            userID: '1', //0 -> Doctor User, 1 -> Patient User
            show: false,
            prim_case_description: '',


        };

        this.drModeID = '0';  //ID for a doctor user
        this.patModeID = '1'; //ID for a patient user

        this.GetDrInfoForBackend = this.GetDrInfoForBackend.bind(this);
    }

    componentDidMount() {
        const requestMethods = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( {

                pat_id: this.props.userInfo.pat_id // pat_id

            })
        }
        fetch("http://52.247.220.137/get_pat_records_lite", requestMethods)
            .then((d) => d.json())
            .then(d => {
                    console.log(d);
                    this.setState({
                        patientRecords: d,
                        record_id: d[0].record_id,
                        is_rec_loading: false
                    })
                }
            )
    }

    pageTitleUserDisplay = () =>
    {
        if(this.data.userID === this.patModeID)
        {
            return(
                <Form.Label>
                    <h2><u>Submit Case for Second Opinion</u></h2>
                </Form.Label>
            );
        }
        else
        {
            return(
                <Form.Label>
                    <h1>Submit Case</h1>
                </Form.Label>
            );
        }
    }

    categoryTitleUserDisplay = () =>
    {
        console.log(this.data.userID + " - pat - " + this.patModeID);


        return <h3 style={{display:"inline", fontSize:"25px", fontWeight:"bold"}}>Select Category for Second Opinion:</h3>

    }


    viewOrAddPicMode = () =>
    {

        if(this.data.userID === this.patModeID)
        {
            return (<PicCarousel />)
        }
        else
        {
            return (<MultiBrowsePic/>)
        }

    }



    descriptionTitleUserDisplay = () =>
    {
        if(this.userID === this.patModeID) {
            return (
                <div>
                    <label>
                        <div style={{fontWeight: "bold", fontSize: "30px"}}>Description (Optional):</div>
                        <br/>
                        <textarea name="pat_notes" rows="10" cols="150" value={this.state.pat_notes}
                                  onChange={this.handleInputChange}/>
                    </label>
                </div>

            );
        }
        else
        {
            return(
                <label>
                    <div style={{fontWeight: "bold", fontSize: "30px"}}>Description:</div>
                    <br />
                    <textarea  name="pat_notes" rows="10" cols="150" value={this.state.pat_notes}
                               onChange={this.handleInputChange}/>
                    <div style={{height:"40px"}}/>
                </label>
            );
        }

    }

    handleSelectDoctor ()
    {
        return(<Caller_SwipeCardAnimation GetDrInfoForBackend={(p) => {this.GetDrInfoForBackend(p)} }/>);
    }




    drCaseCreationComponents = () =>
    {
        /*
        let pat_id = this.props.userInfo.pat_id
         */

        return(
            <div className={"FixedBackgroundImgCaseCreation"} >
                <div style={{ background: `rgba(255, 255, 255, 0.7)`, height:"100%" }}>

                <Form style={{zIndex: "10", textAlign:"center"}} >
                    <PatientSlidePanel pat_data={this.data}/>
                    {this.pageTitleUserDisplay()}
                    <br />


                    <Container style={{width:"1000px", margin:"auto", border:"0px"}}>
                        <Row>
                            <h4 style={{textAlign:"left", paddingLeft:"30px", fontSize:"30px",
                                fontWeight:"bold"}}>Note: </h4>
                        </Row>

                        <Row style={{paddingLeft:"50px"}}>
                                <h4 style={{textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                                    An Identifying Number will be generated for this case on the servers once created.
                                </h4>
                        </Row>

                    </Container>

                    <br />



                    {this.viewOrAddPicMode()}

                    <Row>
                        <Col style={{width: "1000px", margin:"auto"}}>
                            <Form.Label style={{width: "500px", marginLeft:"45%", marginRight:"1px"}}>

                                {this.categoryTitleUserDisplay()}
                                <Form.Control name={"patientSelectedCategory"} as={"select"} defaultValue={"January"}
                                              value={this.state.value} onChange={this.handleInputChange}>
                                    <option value="Allergy and Immunology">Allergy and Immunology</option>
                                    <option value="Endovascular Surgical Neuroradiology">Endovascular Surgical Neuroradiology</option>
                                    <option value="Gastroenterology">Gastroenterology</option>
                                    <option value="General Surgery">General Surgery</option>
                                    <option value="Hematology">Hematology</option>
                                    <option value="Musculoskeletal Radiology">Musculoskeletal Radiology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Orthopaedics">Orthopaedics</option>
                                    <option value="Otolaryngology">Otolaryngology</option>
                                    <option value="Pathology">Pathology</option>
                                    <option value="Pediatric">Pediatric</option>
                                    <option value="Radiation Oncology">Radiation Oncology</option>
                                    <option value="Reproductive Endocrinology and Infertility">Reproductive Endocrinology and Infertility</option>
                                    <option value="Spinal Cord Injury Medicine">Spinal Cord Injury Medicine</option>
                                    <option value="Sports Medicine">Sports Medicine</option>
                                    <option value="Thoracic Surgery">Thoracic Surgery</option>
                                    <option value="Vascular and Interventional Radiology">Vascular and Interventional Radiology</option>
                                </Form.Control>
                            </Form.Label>
                        </Col>
                        <Col>
                            <h3 style={{marginLeft:"170px", fontSize:"25px", fontWeight:"bold"}}>Select the case:</h3>

                            <Form.Label style={{width: "500px", marginLeft:"45%", marginRight:"1px"}}>
                                <Form.Control name={"record_id"} as={"select"} defaultValue={"1"}
                                              onChange={this.handleInputChange}>
                                    {!this.state.is_rec_loading && this.state.patientRecords.map(item => {
                                        return(
                                            <option value={item.record_id}>{item.comment}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Label>
                        </Col>
                        <Col style={{width: "50px"}}>
                            <Caller_SwipeCardAnimation GetDrInfoForBackend = {(p) => {this.GetDrInfoForBackend(p)}}/>
                        </Col>

                    </Row>

                    <br />

                    <br />

                    {this.descriptionTitleUserDisplay()}

                    {(this.state.submitButtonClicked) && <div style={{fontSize: "60px"}}>Case Submitted.</div>}
                    <div style={{border:"0px", margin:"0px", padding:"0px"}}/>
                    <Button name="submit" style={{display:"inline"}} onClick={this.handleSubmit}>Submit</Button>

                </Form>
                </div>
            </div>
        );
    }
    handleInputChange = (event) =>
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            })
    }

    GetDrInfoForBackend(people1)
    {
        this.setState (
            {
                people1: people1
            }
        )
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // if (this.is_paid){
        //     return(<Payment_Form caseDetail={}/>)
        // }
        let selectedDr = JSON.parse(sessionStorage.getItem('selectedDoctorIndx'));

        console.log("SELECTED DOCTOR");
        console.log(selectedDr)
        //selectedNPI = this.state.people1[selectedDr];

        console.log("RECORD ID");
        console.log(this.state.record_id);

        const requestMethods = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( {
                record_id: this.state.record_id,
                physician_id: selectedDr.drId,
                pat_id: this.props.userInfo.pat_id // this.props.userInfo.pat_id

            })
        }
        //Res PendingRec is response pending records
        // needs to be tested still. sever was down 11/7/20.
        // server should be up by 3pm
        fetch("http://52.247.220.137/record_assessment", requestMethods)
            .then(ResPendingRec => ResPendingRec.text())
            .then(s => {
                console.log("Message from Backend after Primary Dr. Submits");
                console.log(s);
                if (s == "record updated") {
                    this.setState({responsestatus: "success"})
                }
                else {
                    console.log("ERROR");
                    this.setState({responsestatus:"error"})
                }

            })

            this.setState({submitButtonClicked: true})


    }

    render()
    {
        console.log("from dr Case Submission modeID = " + this.props.userInfo.modeID);
        console.log("from dr Case Submission = " + this.props.userInfo.userID);
        return(
            <div className={"keep_it_100"}>

                <div className={"keep_it_100"} style={{position: "fixed"}}>
                    <h2 style={{zIndex: "50", width:"100%", position: "fixed", marginBottom:"10%",
                        color: "white", textAlign: 'center',
                        background: `rgba(0,0,0,0.9)`}}><u>Case Creation</u></h2>
                    <div style={{height:"40px"}}/>

                    {this.drCaseCreationComponents()};
                </div>
            </div>
        );
    }
};