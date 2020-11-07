import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {ClientCaseManagement} from '../components/clientCaseManagement';

import {DrCaseManagement} from "../components/drCaseManagement";

import {Contact} from '../components/contact';
import {Login} from '../components/login';
import {DrEdit} from "../components/drEdit";
import '../css/navbar_design.css';
import {Homepage} from "./homepage";
import {Pricing} from './pricingPage';
import {OpenDrPatientSelect} from "./openDrPatientSelect";
import {CaseCreation} from './caseCreation';

import {DoctorPatientSelect} from './doctorPatientSelect'
import {DrWritesSecondOpinion} from "./drWritesSecondOpinion";


export default class NavbarClass extends React.Component
{

    constructor(props) {
        super(props);
        this.data={};


        this.data.modeID = 'doctor';

        this.data.userID = '1';
        this.record_id = 1;




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
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data}/>}></Route>
                            <Route exact path={'/loginSelect'} component={DoctorPatientSelect}></Route>
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

                            <Link to={"/DrWritesSecondOpinion"}>DrWritesSecondOpinion</Link>

                        </nav>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.data}/>}></Route>
                            <Route exact path={'/edit'} component={() => <DrEdit userInfo = {this.data}/>}></Route>
                            <Route exact path={'/pricing'} component={Pricing}></Route>
                            <Route exact path={'/doctorCaseMgmt'} component={() => <DrCaseManagement userInfo = {this.data}/>}></Route>
                            <Route exact path={'/DrWritesSecondOpinion'} component={()=><DrWritesSecondOpinion passRecordId = {this.record_id}/>} ></Route>

                        </Switch>
                    </div>
                </Router>
                <br />

            </div>
        );
    }

    NavbarModes()
    {
        console.log(this.data.modeID);
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



    render() {

        return(
          <div>
              {this.NavbarModes()}
              <br />

          </div>
        );
    }
}