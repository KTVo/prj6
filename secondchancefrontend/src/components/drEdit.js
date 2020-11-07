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
                bio: this.data.oldBio,
                email: 'KM@gg.com',
                password: '',
                repassword: '',
                firstName: 'Kent',
                lastName: 'Moore',
                npi: '6161',
                picture: '',
                speciality: 'Lungs',
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
                assignJSON: []
            };





    }

    componentDidMount() {
        console.log("Testing physician_<id> GET");

        //Concatinates client_ID to URL for backend
        let urlConcat = "http://52.247.220.137:80/physician/" + this.props.userInfo.userID;
        console.log(urlConcat);
        fetch(urlConcat)
            .then(response => response.json())
            .then(json => { this.setState({assignJSON: json})})
            .then(json=>console.log(this.state.assignJSON))
            .then(()=>{
                this.data.oldBio = this.state.assignJSON.bio;
                this.setState(
                    {
                        bio: this.data.oldBio,
                        email: this.state.assignJSON.email,
                        name: this.state.assignJSON.name,
                        npi: this.state.assignJSON.npi,
                        speciality: this.state.assignJSON.qual,
                        hospitalNameArr: [
                            {label:"Cleveland Clinic", value:"Cleveland Clinic"},
                            {label: "Johns Hopkins Hospital", value: "Johns Hopkins Hospital"},
                            {label: "Mayo Clinic", value: "Mayo Clinic"},
                            {label: "UCLA Medical Center", value: "UCLA Medical Center"}
                        ],
                        currentHospital: 'Johns Hopkins Hospital',

                    }
                )
            });
        console.log("Testing physician_<id> GETlllllllllllllllllllll");
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

                <Form.Control as={"select"} name = "selectedHospitalName" value={this.state.value}
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

    handleSubmit = async (event) => {
        event.preventDefault();


    }


    render() {
        console.log("from edit modeID = " + this.props.userInfo.modeID);
        console.log("from edit userID = " + this.props.userInfo.userID);
        return (
            <div>
            <Container>
                {console.log("kill me")}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Edit Personal Info
                    </Form.Label>
                    <br />
                    <Form.Label>
                        Email:
                        <Form.Control as={"input"}
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                                      placeholder={this.state.email}


                        />
                    </Form.Label>

                    <br />

                    <Form.Label>
                        Change Password:
                        <Form.Control as={"input"}
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            placeholder={'******'}
                            />
                    </Form.Label>

                    <br />

                    <Form.Label>
                        Repeat Password:
                        <Form.Label as={"input"}
                            name="repassword"
                            type="password"
                            value={this.state.repassword}
                            onChange={this.handleInputChange}
                            placeholder={'******'}
                            />
                    </Form.Label>

                    <br />
                    <Form.Label>
                        First Name:
                        <Form.Control as={"input"}
                            name="firstName"
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}

                            />
                    </Form.Label>

                    <br />

                    <Form.Label>
                        Last Name:
                        <Form.Control as={"input"}
                            name="lastName"
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}

                            />
                    </Form.Label>

                    <br />


                    <Form.Label>
                        Speciality:
                        <Form.Control as={"input"}
                            name="speciality"
                            type="text"
                            value={this.state.speciality}
                            onChange={this.handleInputChange}

                            />
                    </Form.Label>

                    <br />


                    {this.setDefaultHospital()}


                    <br />

                    <Form.Label>Bio:</Form.Label>
                        <br /><br />


                        <Button onClick={()=> this.handleShowOldBio(this.state.showOldBio)}
                                aria-controls={"oldBioCollapse"}
                                aria-expanded={this.state.showOldBio}>Show Old Bio</Button>

                        <Collapse in={this.state.showOldBio}>
                            <div id={"oldBioCollapse"} style={{border: "2px solid",
                                padding: "20px",
                                margin: "30px",
                                width: "300px",
                                resize: "horizontal",
                                overflow: "auto"}}>
                                <p><u>Old Bio:</u></p>
                                <p><i>{this.data.oldBio}</i></p>
                            </div>
                        </Collapse>

                        <br />
                        <br />
                        <Form.Control as="textarea" name="bio" value={this.state.bio} ref="newText"
                                  style={{ rows:"10", cols:"10"}} onChange={this.handleInputChange} ></Form.Control>


                    <br />
                    <Form.Label>
                        <MDBInput as={"input"}
                            name="passwordAuthorization"
                                  label={"Enter Password to submit changes:"}
                            type="password"
                            value={this.state.passwordAuthorization}
                            onChange={this.handleInputChange}
                            style={{width:"100%", padding: "12px 40px",
                                margin: "auto"}}

                            required/>
                    </Form.Label>
                    <br />
                    <Button type="submit" value={this.state.value}>Submit</Button>
                </Form>
                </Container>
            </div>
        );
    }
}