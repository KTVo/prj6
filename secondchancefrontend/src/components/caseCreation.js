import React from 'react';
import {PicCarousel} from './picCarousel';
import {MultiBrowsePic} from './multiBrowsePic';
//import {people1} from './data/data';
import {Row, Col, Button, Form, Container} from 'react-bootstrap';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Caller_SwipeCardAnimation} from './caller_SwipeCardAnimation';
import {MDBInput} from "mdbreact";
import {PatientSlidePanel} from "./patientSidePanel";
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/style.css';

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
                record_id: 1
            };
        this.data = {
            pat_email: '',  //For identifying who the case belongs to
            phy_email: '',
            phy_firstName: '',
            phy_lastName: '',
            phy_bio: '',
            phy_spec: '',
            phy_hospital: '',
            pics: '',    //Images of the patient for the case
            caseTitle: '',
            userID: '1', //0 -> Doctor User, 1 -> Patient User
            show: false,
            prim_case_name: 'Menstrual Cramps',
            prim_case_description: 'Patient seems to exhibit abnormal menstrual cramps. X-rays shows vitamin D3 and Calcium deficiency' +
                '. Course of action is to prescribe Oxycodone and oral vitamin supplements.'

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
                pat_id: 1 // pat_id
            })
        }
        fetch("http://52.247.220.137/get_all_patient_records", requestMethods)
            .then((d) => d.json())
            .then(d => {
                console.log(d);
                    this.setState({
                        patientRecords: d,
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

        if(this.data.userID === this.patModeID)
        {
            return <h3 style={{display:"inline"}}>Category for Second Opinion:</h3>
        }
        else
        {
            return <h3 style={{display:"inline"}}>Category:</h3>
        }

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
                        Description (Optional):
                        <br/>
                        <textarea name="pat_notes" rows="5" cols="100" value={this.state.pat_notes}
                                  onChange={this.handleInputChange}/>
                    </label>
                </div>

            );
        }
        else
        {
            return(
                <label>
                    Description:
                    <br />
                    <textarea  name="pat_notes" rows="20" cols="100" value={this.state.pat_notes} onChange={this.handleInputChange}/>
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
            <div>
                <PatientSlidePanel pat_data={this.data}/>
                <Form style={{textAlign:"center"}}>
                    {this.pageTitleUserDisplay()}
                    <br />


                        <Container style={{width:"1000px", margin:"auto", border:"0px"}}>
                            <Row>
                                <Col style={{width:"0px", marginLeft:"200px", border:"0px"}}>
                                    <h3 style={{width:"250px", margin:"0px", border:"0px", textAlign:"right"}}>Name for Case:</h3>
                                </Col>
                                <Col >
                                    <p style={{width:"500px", margin:"0px", border:"0px", textAlign:"left"}}>{this.data.prim_case_description}</p>
                                </Col>
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
                            {this.categoryTitleUserDisplay()}

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

                    <br />

                    <Button name="submit" style={{display:"inline"}} onClick={this.handleSubmit}>Submit</Button>


                </Form>
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

        let selectedDr = JSON.parse(sessionStorage.getItem('selectedDoctorIndx'));
        let selectedNPI = 0;
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
                pat_id: 1 // this.props.userInfo.pat_id

            })
        }
        //Res PendingRec is response pending records
        // needs to be tested still. sever was down 11/7/20.
        // server should be up by 3pm
        fetch("http://52.247.220.137/record_assessment", requestMethods)
            .then(ResPendingRec => ResPendingRec.text())
            .then(s => {
                if (s == "record updated") {
                    this.setState({responsestatus: "success"})
                }
                else {
                    console.log("ERROR");
                    this.setState({responsestatus:"error"})
                }

            })



    }

    render()
    {
        console.log("from Case Submission modeID = " + this.props.userInfo.modeID);
        console.log("from Case Submission = " + this.props.userInfo.userID);
        return(
            <div>

                {this.drCaseCreationComponents()};
            </div>
        );
    }
};