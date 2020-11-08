import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {ClientCaseManagement} from '../components/clientCaseManagement';

import {DrCaseManagement} from "../components/drCaseManagement";

import {Contact} from '../components/contact';

import {DrEdit} from "../components/drEdit";
import '../css/navbar_design.css';
import {Homepage} from "./homepage";
import {Pricing} from './pricingPage';

import {CaseCreation} from './caseCreation';

import {DoctorPatientSelect} from './doctorPatientSelect'



export default class NavbarClass extends React.Component
{

    constructor(props) {
        super(props);
        this.data={};

        this.data.modeID = 'doctor2';

        this.data.userID = '1';
        this.record_id = 1;

        this.data.email = '';
        this.data.hospital_id = '';
        this.data.npi = '';
        this.data.phy_addr = '';
        this.data.phy_bio = '';
        this.data.phy_id = '';
        this.data.phy_name = '';
        this.data.phy_qual = '';
        this.data.reviewCnt = '';
        this.data.username = '';


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

                        </nav>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data} handleUserLoginFromNavBar = {this.handleUserLoginFromNavBar}/>}></Route>
                            <Route exact path={'/loginSelect'} component={() => <DoctorPatientSelect handleUserLoginFromNavBar = {this.handleUserLoginFromNavBar}/>}></Route>
                            <Route exact path={'/contact'} component={() => <Contact userInfo = {this.data}/>}></Route>
                            <Route exact path={'/pricing'} component={() => <Pricing/>}></Route>
                        </Switch>
                    </div>
                </Router>

                <br />

            </div>
        );
    }
    PatientNavBar()
    {
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
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.data}/>}></Route>
                            <Route exact path={'/edit'} component ={() => <DrEdit userInfo = {this.data}/>}></Route>
                            <Route exact path={'/pricing'} component={() => <Pricing/>}></Route>
                            <Route exact path={'/clientCaseMgmt'} component={() => <ClientCaseManagement userInfo = {this.data}/>}></Route>
                            <Route exact path={'/caseCreate'} component={() => <CaseCreation userInfo = {this.data}/>}></Route>
                        </Switch>
                    </div>
                </Router>
                <br />

            </div>
        );

    }

    DoctorNavBar()
    {
        //user personalID and pass as props into all the other pages to display that user's info for tables
        return(
            <div>
                <Router>
                    <div>

                        <nav className={'navbarDesign'}>

                            <Link to="/">Home</Link>

                            <Link to="/contact">Contact Us</Link>

                            <Link to="/edit">Edit</Link>

                            <Link to="/pricing">Pricing</Link>

                            <Link to={"/doctorCaseMgmt"}>Doctor Case Management</Link>


                        </nav>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.data}/>}></Route>
                            <Route exact path={'/edit'} component={() => <DrEdit userInfo = {this.data}/>}></Route>
                            <Route exact path={'/pricing'} component={Pricing}></Route>
                            <Route exact path={'/doctorCaseMgmt'} component={() => <DrCaseManagement userInfo = {this.data}/>}></Route>


                        </Switch>
                    </div>
                </Router>
                <br />

            </div>
        );
    }

    NavbarModes()
    {
        console.log("modeID in navbar_custom.js" + this.data.modeID);
        if(this.data.modeID === 'patient')
        {

            return(this.PatientNavBar())
        }
        else if(this.data.modeID === 'doctor')
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
        console.log(props + 1);
        /*
        if(props.modeID == 'doctor') {
            this.data.modeID = props.modeID;
            this.data.userID = props.id;
            this.data.email = props.email;
            this.data.hospital_id = props.hospital_id;
            this.data.npi = props.npi;
            this.data.phy_addr = props.addr;
            this.data.phy_bio = props.bio;
            this.data.phy_name = props.name;
            this.data.phy_qual = props.qual;
            this.data.reviewCnt = props.reviewCnt;
            this.data.username = props.username;
        }
        else if(props.modeID == 'doctor')
        {

        }
        else
        {
            console.log("Unable to confirm User Mode to Login.")
        }
*/
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