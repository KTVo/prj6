import React from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import doctor_left from '../pictures/patient_doctor_select/left_doctor.png';
import patient_right from '../pictures/patient_doctor_select/right_patient.png';
import {HoverImgBlkWhite} from "./hoverImgBlkWhite";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {LoginRegisterDisplay} from "./loginRegisterDisplay";
import {Modal_It} from "./modal_it";


export class DoctorPatientSelect extends React.Component
{
    constructor(props) {
        super(props);
        this.data = {};
        this.data.picHeight = '500px';
        this.data.picWidth  = '550px';
        this.data.overlayColor = "black-strong";
        this.data.selectedUserMode = "none";
        this.state={
            showPic:true
        }


    }

    GetShowDoctorPatientPicLoginSelect(showIt_bool)
    {
        this.setState(
            {
                showPic: showIt_bool
            }
        )
    }


    toggleShowPic(selectedMode)
    {
        this.data.selectedUserMode = selectedMode;



        this.setState(
            {
                showPic: !this.state.showPic
            }
        )
    }
    handleDoctorPic = () =>
    {

        this.toggleShowPic('Doctor');
    }

    handlePatientPic = () =>
    {
        this.toggleShowPic('Patient');

    }

    DisplaySelectionPics()
    {
        return(
            <div>

            <Container style={{width: "800px"}} >

                <Row>
                    <Col>
                        <h3 style={{textAlign:"center"}}><u>Select Which Type of You Are:</u></h3>
                    </Col>
                </Row>

                <Row>

                    <Col>
                        <div onClick = {() => this.handleDoctorPic()}>

                            <HoverImgBlkWhite data={this.data} overlayText = "Sign In / Register as Doctor"
                                              imgSource = {doctor_left}

                            ></HoverImgBlkWhite>

                        </div>
                    </Col>

                    <Col >


                        <div onClick = { () => this.handlePatientPic()}>
                            <HoverImgBlkWhite data={this.data} overlayText = "Sign In / Register as Patient"
                                              imgSource = {patient_right}

                            />


                        </div>


                    </Col>

                </Row>

            </Container>

            </div>
        );
    }

    SwitchToAccessPage()
    {
        if(this.state.showPic)
        {
            return(
                <div>
                    {this.DisplaySelectionPics()}
                </div>
            )
        }
        else
        {
            return(
                <div>
                    <LoginRegisterDisplay userMode={this.data.selectedUserMode}
                                          getShowPicStatus = {this.GetShowDoctorPatientPicLoginSelect(this.state.showPic)}/>

                </div>
            );
        }
    }


    render()
    {

        return(
            <div>

            {this.SwitchToAccessPage()}
            </div>
        );
    }
}

