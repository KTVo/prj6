import React from 'react';
import {RegFunctionalComponent} from './registration_funct_comp';
import {ButtonGroup, Button} from 'react-bootstrap';
import {Login} from './login';
import {DoctorPatientSelect} from "./doctorPatientSelect";
import '../App.css';

export class LoginRegisterDisplay extends React.Component {
    state = {selectedFile: null}

    constructor(props) {
        super(props);
        fetch("http://52.247.220.137:80/hospitals")
            .then(response => response.json())
            .then(json => {

                this.state.hospitalNameArr = json
                this.state.isLoading = false;


            });
        this.state = {
            isLogin: true,
            choseReturn: false,
            isLoading: true,
            hospitalNameArr: []
        }

        this.data = {};

       //this.data.hospitalNameArr= ["Cleveland Clinic", "Johns Hopkins Hospital", "Mayo Clinic", "UCLA Medical Center"];

        this.data.date= {
            month: ["January", "February", "April", "May", "June", "July", "August", "September", "October",
                "November", "December"],

            day: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
                "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],

            year:[]
        };
        this.data.userMode = this.props.userMode;
    }

    setCurrentYear = () =>
    {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();

        for(let cntDay = 1900; cntDay <= currentYear; cntDay++)
        {
            this.data.date.year.push(cntDay);


        }
    }

    GetNumericalMonth(monthName)
    {
        switch(monthName)
        {
            case 'January': return 1; break;
            case 'February': return 2; break;
            case 'March': return 3; break;
            case 'April': return 4; break;
            case 'May': return 5; break;
            case 'June': return 6; break;
            case 'July': return 7; break;
            case 'August': return 8; break;
            case 'September': return 9; break;
            case 'October': return 10; break;
            case 'November': return 11; break;
            case 'December': return 12; break;
            default: return 1;
        }
    }

    GetAge(data)
    {
        const numericalBirthMonth = this.GetNumericalMonth(data.selectedBirthMonth);
        const convertedBirthdate = new Date(data.selectedBirthYear, numericalBirthMonth, data.selectedBirthDay,
            0,0,0,0);

        const currentDate = new Date();

        let calculatedAge = currentDate.getTime() - convertedBirthdate.getTime();

        calculatedAge = new Date(calculatedAge);

        calculatedAge = Math.abs(calculatedAge.getUTCFullYear()-1970);


        return calculatedAge;
    }

    handleSubmit = () => {
        const data = this.iter_over_items();
        console.log("registration data")
        console.log(data);

        const calculatedAge = this.GetAge(data);

        console.log(calculatedAge);

        /*
                if(this.props.data.userMode === 'Doctor') {
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({"npi":data.npi, "username":data.username, "name": data.firstname+data.lastname,
                        "bio":, "addr":, "qual":, "reviewCnt":, "email":, "password":, "age": calculatedAge})
                    };
                    fetch("http://52.247.220.137:80/physician", requestOptions)
                        .then(response => console.log(response.text()))
                }
                else
                {
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({"username":, "name":, "age":, "sex":, "medical_history":, "email":, "password":})
                    };
                    fetch("http://52.247.220.137:80/client", requestOptions)
                        .then(response => console.log(response.text()))
                }
        */

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


    LoginHandle()
    {
        console.log("I am logging in");
    }

    SelectLoginRegisterHandle = (status, switchUserType) =>
    {
        if(switchUserType === true){
            if(this.data.userMode === "Doctor")
            {
                this.data.userMode = "Patient";
            }
            else
            {
                this.data.userMode = "Doctor";
            }
            this.setState(
                {
                    isLogin: status,
                    choseReturn: true
                }
            );
        }
        else {
            this.setState(
                {
                    isLogin: status,
                    choseReturn: switchUserType
                }
            );
        }
    }
    render() {

        console.log(this.data)
        this.setCurrentYear();
        if (this.state.isLoading){
            console.log("im loading....");
            return(
                <ButtonGroup>
                    <Button onClick={()=>this.SelectLoginRegisterHandle(true, false)}>Login</Button>
                    <Button onClick={()=>this.SelectLoginRegisterHandle(false, false)}>Register</Button>
                    <Button onClick={()=>this.SelectLoginRegisterHandle(true, true)}>Switch User Type</Button>
                </ButtonGroup>
            )
        }
        return (
            <div>

                <ButtonGroup>
                    <Button onClick={()=>this.SelectLoginRegisterHandle(true, false)}>Login</Button>
                    <Button onClick={()=>this.SelectLoginRegisterHandle(false, false)}>Register</Button>
                    <Button onClick={()=>this.SelectLoginRegisterHandle(true, true)}>Switch User Type</Button>
                </ButtonGroup>








                {
                    this.state.choseReturn &&
                    <RegFunctionalComponent hospital = {this.state.hospitalNameArr} data={this.data} handleSubmit={(e) => this.handleSubmit(e)}/>
                }

                {!this.state.choseReturn && !this.state.isLogin &&
                <RegFunctionalComponent hospital = {this.state.hospitalNameArr} data={this.data} handleSubmit={(e) => this.handleSubmit(e)}/>}
                {!this.state.choseReturn &&
                this.state.isLogin && <Login data={this.data}/>}

            </div>
        );
    }
};

//                <DrRegFunctionalComponent data={this.data} funct={e => this.handleSubmit(e)}/>
