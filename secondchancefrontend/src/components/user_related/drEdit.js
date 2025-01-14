import React from 'react';
import {Button, Form, Col, Row, Container, Collapse, DropdownButton, ButtonGroup, Dropdown} from 'react-bootstrap';
import '../../css/hoverForText.css';
import {MDBInput} from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.css';
import './userRelatedCSS/edit.css';

//Generates an edit profile page for a user to change their private information
export class DrEdit extends React.Component
{
    constructor(props) {
        super(props);

        this.data = {};
        this.data.oldBio = this.props.pat_medical_history;


        this.state =
            {
                bio: '',
                email: '',
                password: '',
                repassword: '',
                age: '',
                name: '',
                npi: '',
                sex: '',
                picture: '',
                speciality: '',
                hospitalNameArr: [
                    {label:"Cleveland Clinic", value:"Cleveland Clinic"},
                    {label: "Johns Hopkins Hospital", value: "Johns Hopkins Hospital"},
                    {label: "Mayo Clinic", value: "Mayo Clinic"},
                    {label: "UCLA Medical Center", value: "UCLA Medical Center"}
                ],
                currentHospital: 'Johns Hopkins Hospital',
                passwordAuthorization: '',
                showOldBio: false,
                assignJSON: [],
                isLoading: false,
                isUploaded: false
            };





    }

    componentDidMount() {
        console.log("this from drEdit.js");
        console.log(this.props);

        if(this.props.userMode == "patient") {
            this.data.oldBio = this.props.pat_medical_history;

            this.setState(
                {
                    bio: this.props.userInfo.pat_medical_history,
                    email: this.props.userInfo.email,
                    password: this.props.userInfo.password,
                    repassword: this.props.userInfo.password,
                    name: this.props.userInfo.pat_name,

                    picture: '',

                    currentHospital: 'Johns Hopkins Hospital',
                    passwordAuthorization: '',
                    assignJSON: [],
                    isLoading: false,
                    sex: 'm'
                }
            )
        }
        //Handles multiple namings
        else if(this.props.userMode == "physician" || this.props.userMode == "doctor" )
        {

            this.data.oldBio = this.props.pat_medical_history;

            this.setState(
                {
                    bio: this.props.userInfo.phy_bio,
                    email: this.props.userInfo.email,
                    password: this.props.userInfo.password,
                    repassword: this.props.userInfo.password,
                    name: this.props.userInfo.phy_name,
                    npi: this.props.userInfo.npi,
                    picture: '',
                    speciality: this.props.userInfo.phy_qual,
                    currentHospital: 'Johns Hopkins Hospital',
                    passwordAuthorization: '',
                    assignJSON: [],
                    isLoading: false,
                    sex: 'm'
                }
            )


        }

        //Insert endpoint for gathering user info here in Phase II for updated information
    }



    iter_over_items(){
        let inputs = document.getElementById("myForm").elements;

        let to_send = {};

        for (var i = 0; i < inputs.length; i++) {
            let element = inputs[i];

            to_send[element.name] = element.value;


        }


        return to_send;
    }

    setDefaultHospital = (event) =>
    {
        let indxCurrentHospital = 0;
        const currHospitalName = this.state.currentHospital;

        //Checks for the index of current hospital for default value of select menu right below
        {this.state.hospitalNameArr.map(function(hospitalName, index){
            if(currHospitalName === hospitalName.value)
            {
                indxCurrentHospital = index;
            }
        })}

        return(
            <Form.Label style={{color: "white"}}>
                Select Clinic:

                <br/>

                <Form.Control as={"select"} name = "selectedHospitalName"
                              defaultValue={this.state.hospitalNameArr[indxCurrentHospital].value}
                              onChange={this.handleInputChange}>
                    {this.state.hospitalNameArr.map(function(hospitalName, index){
                        return <option key={index} value={hospitalName.value}>{hospitalName.value}</option>
                    })}


                </Form.Control>


            </Form.Label>
        );

    }

    handleShowOldBio(showOldBioNew)
    {
        console.log("Before "+ this.state.showOldBio)

        this.setState({
            showOldBio: !showOldBioNew
        });

        console.log("After "+ this.state.showOldBio)
    }

    handleInputChange = (event) => {

        this.setState(
            {

                [event.target.name]:event.target.value

            })
    }

    validate_data() {
        let username = this.props.userInfo.username
        let pat_name = this.state.name
        let pat_age = this.state.age
        let pat_sex = this.state.sex
        let pat_medical_history = this.state.bio
        let email = this.state.email
        let password = this.props.userInfo.password

        let re_name = /^[a-zA-Z]+$/;
        let re_fname = /^[a-zA-Z]+[\s][a-zA-Z]+$/;
        let re_alpha_num = /^[a-zA-Z0-9]+$/;
        if (!pat_name.match(re_fname)){
            console.log("Name")
            console.log(pat_name);
            return false;
        }
        if (isNaN(pat_age)){
            console.log("age")
            return false;
        }
        if (pat_sex != 'm' && pat_sex != 'f'){
            console.log(pat_sex);
            console.log("sex")
            return false;
        }

        return true;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.validate_data()){
            alert("Your fields are not valid! Please recheck your fields and try again");
            return;
        }
        if(this.state.age < 0)
        {
            alert("Age cannot be " + this.state.age);
        }
        else {
            console.log("I am in handleSubmit(event) for from here is " + this.props.userMode)

            if (this.state.passwordAuthorization == this.props.userInfo.password) {
                let reloadedData = null;
                if (this.props.userMode == "patient") {

                    //Run endpoint for submitting changes to backend
                    //"username", "age", "sex", "medical_history", "email", "password", "pat_id", "name"
                    console.log("DUUUUUE NOTGETTING PAT AGE!!");
                    console.log(this.state);
                    console.log("thiiiss props");
                    console.log(this.props);
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "username": this.props.userInfo.username,
                            "pat_name": this.state.name,
                            "pat_age": this.state.age,
                            "pat_sex": this.state.sex,
                            "pat_medical_history": this.state.bio,
                            "email": this.state.email,
                            "password": this.props.userInfo.password,
                            "pat_id": this.props.userInfo.pat_id
                        })
                    };

                    fetch("http://52.247.220.137:80/client", requestOptions)
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);

                        })





                }
                //Handles multiple namings
                else if (this.props.userMode == "physician" || this.props.userMode == "doctor") {

                    console.log("Testing_physician PUT");

                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "npi": this.props.userInfo.npi,
                            "username": this.props.userInfo.username,
                            "phy_name": this.state.name,
                            "phy_bio": this.state.bio,
                            "phy_addr": this.props.userInfo.phy_addr,
                            "phy_qual": this.state.speciality,
                            "reviewCnt": 0,
                            "email": this.props.userInfo.email,
                            "password": this.props.userInfo.password,
                            "phy_id": this.props.userInfo.phy_id,
                            "hospital_id": this.props.userInfo.hospital_id
                        })
                    };

                    fetch("http://52.247.220.137:80/physician", requestOptions)
                        .then(response => console.log(response));


                }


                console.log("Look for state");
                console.log(this);
                alert("Changes have been submitted.");
            } else {
                alert("Confirmation password does not match. Test Mode: Try " + this.props.userInfo.password);
            }

        }
    }

    SelectSexHandle(selectedSex)
    {
        this.setState(
            {
                sex: selectedSex
            }
        )
        console.log(this.state.sex);
    }

    EditPageBody = () =>
    {
        return(
            <div>
                <div style={{zIndex:"-1"}} className={"FixedBackgroundImgEdit"} />
                <h2 style={{zIndex: "50", width:"100%", position: "fixed", marginBottom:"10%",
                    color: "white", textAlign: 'center',
                    background: `rgba(0,0,0,0.9)`}}><u>Edit Personal Info</u></h2>
                {
                    !this.state.isLoading &&
                    <Container style={{background: `rgba(0,0,0,0.8)`, paddingTop:"0%", paddingBottom:"5%",
                        paddingLeft:"5%", paddingRight:"5%"}}>

                        <Form onSubmit={this.handleSubmit} style={{fontSize:"30px", fontWeight:"bold"}}>
                            <br/>
                            <Form.Label style={{color: "white"}}>
                                Email:
                                <Form.Control as={"input"}
                                              name="email"
                                              type="text"
                                              onChange={this.handleInputChange}
                                              placeholder={this.state.email}


                                />
                            </Form.Label>


                            <br/>
                            <Form.Label style={{color: "white"}}>
                                Full Name:
                                <Form.Control as={"input"}
                                              name="name"
                                              type="text"
                                              placeholder={this.state.name}
                                              onChange={this.handleInputChange}

                                />
                            </Form.Label>

                            <br />

                            <Form.Label style={{color: "white"}}>
                                Age:
                                <Form.Control as={"input"}
                                              name="age"
                                              type="number"
                                              placeholder={this.state.age}
                                              onChange={this.handleInputChange}

                                />
                            </Form.Label>


                            <br/>


                            {this.setDefaultHospital()}




                            <div>
                                {
                                    <DropdownButton
                                        as={ButtonGroup}
                                        name={"selectSex"}
                                        title={"Choose Gender"}
                                    >
                                        <Dropdown.Item onClick={()=>this.SelectSexHandle("m")}>Male</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>this.SelectSexHandle("f")}>Female</Dropdown.Item>
                                    </DropdownButton>
                                }
                            </div>


                            { ( (this.props.userMode == 'physician') || (this.props.userMode == 'doctor') &&
                                <Form.Label  style={{color: "white"}}>
                                    Specialty:
                                    <Form.Control as={"input"}
                                                  name="speciality"
                                                  type="text"
                                                  placeholder={this.state.speciality}
                                                  onChange={this.handleInputChange}

                                    />
                                </Form.Label>
                            )}

                            <br/>
                            <Form.Label style={{color: "white"}}>Bio:</Form.Label>
                            <Form.Control as="textarea" name="bio" value={this.state.bio} ref="newText"
                                          style={{rows: "10", cols: "10"}} onChange={this.handleInputChange}></Form.Control>


                            <br/>
                            <Form.Label>
                                <MDBInput as={"input"}
                                          name="passwordAuthorization"
                                          label={"Enter Password to submit changes:"}
                                          type="password"
                                          placeholder={this.state.passwordAuthorization}
                                          onChange={this.handleInputChange}
                                          style={{
                                              width: "100%", padding: "12px 40px",
                                              margin: "auto"
                                          }}

                                          required/>
                            </Form.Label>
                            <br/>
                            <Button type="submit" value={this.state.value}>Submit</Button>
                        </Form>
                    </Container>

                }

            </div>
        )
    }


    render() {

        return (

            <div>
                {this.state.isUploaded && this.EditPageBody()}
                {!this.state.isUploaded && this.EditPageBody()}
            </div>

        );
    }
}