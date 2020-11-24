import React from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import doctor_left from '../../pictures/patient_doctor_select/left_doctor.png';
import patient_right from '../../pictures/patient_doctor_select/right_patient.png';
import {HoverImgBlkWhite} from "../hoverImgBlkWhite";

import {LoginRegisterDisplay} from "./loginRegisterDisplay";
import './userRelatedCSS/loginRegisterDisplay.css';



export class DoctorPatientSelect extends React.Component
{
    constructor(props) {
        super(props);
        this.data = {};
        this.data.picHeight = '500px';
        this.data.picWidth  = '550px';
        this.data.overlayColor = "blue-strong";
        this.data.selectedUserMode = "none";
        this.state={
            showPic:true
        }
        this.changeShowPic = null;
        this.GetShowDoctorPatientPicLoginSelect = this.GetShowDoctorPatientPicLoginSelect.bind(this);

    }

    GetShowDoctorPatientPicLoginSelect = (showIt_bool) =>
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
                        <h3 style={{textAlign:"center", color: "black"}}><u>Select Which Type of User You Are:</u></h3>
                    </Col>
                </Row>

                <Row>

                    <Col>
                        <div style ={{border:"5px solid black", background: `rgba(0,0,0,.8)`}} onClick = { () => this.handleDoctorPic()}>
                             <HoverImgBlkWhite  data={this.data} overlayText = "Doctor"
                                                  imgSource = {doctor_left}
                             />
                        </div>

                    </Col>

                    <Col >


                        <div style ={{border:"5px solid black", background: `rgba(0,0,0,.8)`}} onClick = { () => this.handlePatientPic()}>
                            <HoverImgBlkWhite data={this.data} overlayText = "Patient"
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
                    <LoginRegisterDisplay handleUserLoginFromNavBar = {this.props.handleUserLoginFromNavBar} userMode={this.data.selectedUserMode}/>

                </div>
            );
        }
    }


    render()
    {

        return(
            <div>
                <div className={"LogReg_FixedBackgroundImg"} />
                {this.SwitchToAccessPage()}
            </div>
        );
    }
}

