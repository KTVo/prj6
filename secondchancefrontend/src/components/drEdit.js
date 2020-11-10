import React from 'react';
import {Button, Form, Col, Row, Container, Collapse} from 'react-bootstrap';
import '../css/hoverForText.css';
import {MDBInput} from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.css';
export class DrEdit extends React.Component
{
    constructor(props) {
        super(props);

        this.data = {};
        this.data.oldBio = 'I am bio.';


        this.state =
            {
                bio: '',
                email: '',
                password: '',
                repassword: '',
                firstName: '',
                lastName: '',
                npi: '',
                picture: '',
                speciality: '',
                copiedText:'',
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
                isLoading: true
            };





    }

    componentDidMount() {

            this.setState(
                {
                    isLoading: false
                }
            )

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
            <Form.Label>
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

    /*
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username": this.props.userInfo.username,
                    "name": this.props.userInfo.pat_name,
                    "age": this.props.userInfo.pat_age,
                    "sex": this.props.userInfo.pat_sex,
                    "medical_history": this.props.userInfo.medical_history,
                    "email": this.props.userInfo.email,
                    "password": this.props.userInfo.password,
                    "pat_id": this.props.userInfo.pat_id})
            };

            fetch("http://52.247.220.137:80/client", requestOptions)
                .then(response => console.log(response));
            */

    handleSubmit = async (event) => {
        event.preventDefault();

        if(this.state.passwordAuthorization == this.props.userInfo.password)
        {


            //Run endpoint for submitting changes to backend





            console.log("Look for state");
            console.log(this);
            alert("Changes have been submitted. Note for testing purposes, changes made to Password has been blocked at this time.");
        }
        else
        {
            alert("Confirmation password does not match. Test Mode: Try " + this.props.userInfo.password);
        }


    }


    render() {

        return (
            <div>
                {
                    !this.state.isLoading &&
                <Container>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Label>
                            Edit Personal Info
                        </Form.Label>
                        <br/>
                        <Form.Label>
                            Email:
                            <Form.Control as={"input"}
                                          name="email"
                                          type="text"
                                          onChange={this.handleInputChange}
                                          placeholder={this.props.userInfo.email}


                            />
                        </Form.Label>

                        <br/>

                        <Form.Label>
                            Change Password:
                            <Form.Control as={"input"}
                                          name="password"
                                          type="password"
                                          onChange={this.handleInputChange}
                                          placeholder={'******'}
                            />
                        </Form.Label>

                        <br/>

                        <Form.Label>
                            Repeat Password:
                            <Form.Label as={"input"}
                                        name="repassword"
                                        type="password"
                                        onChange={this.handleInputChange}
                                        placeholder={'******'}
                            />
                        </Form.Label>

                        <br/>
                        <Form.Label>
                            First Name:
                            <Form.Control as={"input"}
                                          name="firstName"
                                          type="text"
                                          placeholder={this.props.userInfo.pat_name}
                                          onChange={this.handleInputChange}

                            />
                        </Form.Label>


                        <br/>


                        {this.setDefaultHospital()}


                        <br/>

                        <Form.Label>Bio:</Form.Label>
                        <br/><br/>


                        <Button onClick={() => this.handleShowOldBio(this.props.pat_medical_history)}
                                aria-controls={"oldBioCollapse"}
                                aria-expanded={this.props.pat_medical_history}>Show Old Bio</Button>

                        <Collapse in={this.props.pat_medical_history}>
                            <div id={"oldBioCollapse"} style={{
                                border: "2px solid",
                                padding: "20px",
                                margin: "30px",
                                width: "300px",
                                resize: "horizontal",
                                overflow: "auto"
                            }}>
                                <p><u>Old Bio:</u></p>
                                <p><i>{this.props.pat_medical_history}</i></p>
                            </div>
                        </Collapse>

                        <br/>
                        <br/>
                        <Form.Control as="textarea" name="bio" value={this.state.bio} ref="newText"
                                      style={{rows: "10", cols: "10"}} onChange={this.handleInputChange}></Form.Control>


                        <br/>
                        <Form.Label>
                            <MDBInput as={"input"}
                                      name="passwordAuthorization"
                                      label={"Enter Password to submit changes:"}
                                      type="password"
                                      value={this.state.passwordAuthorization}
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
        );
    }
}