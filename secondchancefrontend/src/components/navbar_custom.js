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
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.state.userData}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/edit'} component ={() => <DrEdit userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/pricing'} component={() => <Pricing/>}></Route>
                            <Route exact path={'/clientCaseMgmt'} component={() => <ClientCaseManagement userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/caseCreate'} component={() => <CaseCreation userInfo = {this.state.userData}/>}></Route>
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
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.state.userData}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/edit'} component={() => <DrEdit userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/pricing'} component={Pricing}></Route>
                            <Route exact path={'/doctorCaseMgmt'} component={() => <DrCaseManagement userInfo = {this.state.userData}/>}></Route>


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

            return(this.PatientNavBar())
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