import React from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import patient_Me from '../components/images/patient_Me.jpg';
import {Image, Button, Container, Col, Row} from 'react-bootstrap';
import '../css/slidePanelRowVerticalSpacing.css';

export class PatientSlidePanel extends React.Component
{
    constructor(props) {
        super(props);

        this.state={
            isPaneOpen: false,
        }
        this.data ={};
        this.data.pat_name= 'Kevin Vo';
        this.data.pat_age= '98';
        this.data.pat_bio= 'A delight for the senses.';
        this.data.pat_sex= 'M';
        this.data.pat_height= '167.64';
        this.data.pat_weight= "86.1826";

        this.RightPaneHandle = this.RightPaneHandle.bind(this)

    }

    RightPaneHandle()
    {
        this.setState(
            {
                isPaneOpen: !this.state.isPaneOpen
            }
        )
    }


    GetSlidingPanel()
    {
        return(
            <SlidingPane
                style={{backgroundImage: {patient_Me}}}
                className={"panel-heading"}
                overlayClassName={"panel-heading"}
                isOpen={this.state.isPaneOpen}
                from={"left"}
                width={"320px"}
                onRequestClose={
                    () => {
                        this.setState({
                            isPaneOpen: false
                        })
                    }
                }

                title={ <div className={"TitleText"} >Patient Information</div> }
                subtitle={<div>Name: {this.data.pat_name}</div>}
            >

                <Image src = {patient_Me}
                       width={"auto"}
                       height={"270px"}
                       thumbnail
                       className={"img-border"}/>

                <Container>
                    <Row className={"RowVerticalSpacing"}>
                        Sex: {this.data.pat_sex}
                    </Row>
                    <Row  className={"RowVerticalSpacing"}>
                        Age: {this.data.pat_age}
                    </Row>
                    <Row  className={"RowVerticalSpacing"}>
                        Height: {this.data.pat_height} cm
                    </Row>
                    <Row  className={"RowVerticalSpacing"}>
                        Weight: {this.data.pat_weight} kg
                    </Row>
                    <Row  className={"RowVerticalSpacing"}>
                        Bio: {this.data.pat_bio}
                    </Row>

                </Container>
            </SlidingPane>



        );
    }

    render() {
        return (
            <div>
                <Button onClick={this.RightPaneHandle} >Show Patient Info</Button>

                {this.GetSlidingPanel()}
            </div>
        );
    }
}