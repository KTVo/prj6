import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import {ClientCaseManagement} from './case_related/clientCaseManagement';

import {DrCaseManagement} from "./case_related/drCaseManagement";

import {Contact} from '../components/contact';

import {DrEdit} from "./user_related/drEdit";
import '../css/navbar_design.css';
import {Homepage} from "./homepage";
import {Pricing} from './pricingPage';

import {Patient_CaseCreation} from './case_related/patient_CaseCreation';
import{Dr_CaseCreation} from './case_related/dr_CaseCreation';
import {DoctorPatientSelect} from './user_related/doctorPatientSelect'
import {Payment_Form} from "./payment/payment_form";



export default class NavbarClass extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
            modeID: "",
            userID: "",
            userData: ""
        }

        this.handleUserLoginFromNavBar = this.handleUserLoginFromNavBar.bind(this);

    }


    NewUserNavBar()
    {


        return(
            <div>
                <Router>
                    <div>

                        <nav className={'navbarDesign'}>

                            <Link to="/">Home</Link>

                            <Link to="/contact">Contact Us</Link>

                            <Link to="/pricing">Pricing</Link>

                            <Link to="/loginSelect">Login</Link>

                            <Link to={"/payment"}>Payment</Link>

                        </nav>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data} handleUserLoginFromNavBar = {this.handleUserLoginFromNavBar}/>}></Route>
                            <Route exact path={'/loginSelect'} component={() => <DoctorPatientSelect handleUserLoginFromNavBar = {this.handleUserLoginFromNavBar}/>}></Route>
                            <Route exact path={'/contact'} component={() => <Contact userInfo = {this.data}/>}></Route>
                            <Route exact path={'/pricing'} component={() => <Pricing/>}></Route>
                            <Route exact path={'/payment'} component={()=> <Payment_Form/>}></Route>
                        </Switch>
                    </div>
                </Router>

                <br />

            </div>
        );
    }
    PatientNavBar()
    {
        console.log("ERICS CONSOLE LOG");
        console.log(this.state.userData);
        return(
            <div>
                <Router>
                    <div>

                        <nav className={'navbarDesign'}>

                            <Link to="/">Home</Link>

                            <Link to="/contact">Contact Us</Link>

                            <Link to="/edit">Edit</Link>

                            <Link to="/pricing">Pricing</Link>

                            <Link to={"/caseCreate"}>Case Submission</Link>

                            <Link to={"/clientCaseMgmt"}>Client Case Management</Link>


                        </nav>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.state.userData}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/edit'} component ={() => <DrEdit userMode = {"patient"} userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/pricing'} component={() => <Pricing/>}></Route>
                            <Route exact path={'/clientCaseMgmt'} component={() => <ClientCaseManagement userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/caseCreate'} component={() => <Patient_CaseCreation userInfo = {this.state.userData}/>}></Route>
                            <Redirect to={'/'} />
                        </Switch>
                    </div>
                </Router>
                <br />

            </div>
        );

    }

    DoctorNavBar()
    {
        console.log(this);
        //user personalID and pass as props into all the other pages to display that user's info for tables
        return(
            <div>
                <Router>
                    <div>

                        <nav className={'navbarDesign'}>

                            <Link to="/">Home</Link>

                            <Link to="/contact">Contact Us</Link>

                            <Link to="/edit">Edit</Link>

                            <Link to={"/caseCreate"}>Case Submission</Link>

                            <Link to="/pricing">Pricing</Link>

                            <Link to={"/doctorCaseMgmt"}>Doctor Case Management</Link>


                        </nav>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.state.userData}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/edit'} component={() => <DrEdit userMode = {"doctor"} userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/pricing'} component={Pricing}></Route>
                            <Route exact path={'/caseCreate'} component={() => <Dr_CaseCreation userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/doctorCaseMgmt'} component={() => <DrCaseManagement modeID = {this.state.modeID} userInfo = {this.state.userData}/>}></Route>
                            <Redirect to={'/'} />

                        </Switch>
                    </div>
                </Router>
                <br />

            </div>
        );
    }

    NavbarModes()
    {

        if(this.state.modeID === 'patient')
        {

            return( this.PatientNavBar() )
        }
        else if(this.state.modeID === 'physician')
        {

            return(this.DoctorNavBar())
        }
        else    //If not logged in
        {


            return(this.NewUserNavBar())

        }

    }
    handleUserLoginFromNavBar = (props) =>
    {

        this.setState({
            modeID: props.modeID,
            userID: props.userID,
            userData: props.userData
        })

       sessionStorage.setItem('userInfoFromSessionStorage', props)
    }


    render() {

        return(
          <div>
              {this.NavbarModes()}
              <br />

          </div>
        );
    }
}