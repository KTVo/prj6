import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import {Button, Nav, Navbar} from "react-bootstrap";
import {ClientCaseManagement} from './case_related/clientCaseManagement';

import {DrCaseManagement} from "./case_related/drCaseManagement";

import {Contact} from '../components/contact';

import {DrEdit} from "./user_related/drEdit";
import '../css/navbar_design.css';
import {Homepage} from "./homepage";
import {Pricing} from './pricingPage';

import{CaseCreation} from './case_related/caseCreation';
import {DoctorPatientSelect} from './user_related/doctorPatientSelect'
import {Payment_Form} from "./payment/payment_form";
import {FullViewCase} from '../components/case_related/fullViewCase';

import navbarLogo from './images/navbar_logo.png';

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
                        <Navbar className={'SizeNav'} sticky={"top"} style={{paddingTop:"0px", paddingBottom:"0px"}}>
                            <Nav>
                                <span style={{color:"white", fontSize:"25px"}}>
                                <img responsive src={navbarLogo} style={{height:"50px", width:"50px",marginBottom:"5px",borderTop:"-10px", paddingBottom:"15px"}}/>SecondChance
                                </span>
                                <div className={"MoveLinksRight"}></div>
                                <Link style={{hover:{backgroundColor: "orange"}}} to="/">Home</Link>

                                <Link to="/contact">Contact Us</Link>

                                <Link to="/pricing">Pricing</Link>

                                <Link to={"/payment"}>Payment</Link>

                                <Link to={"/gotofullCaseView"}>Full Case View</Link>

                                <Link to="/loginSelect">Login</Link>

                            </Nav>
                        </Navbar>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.data} handleUserLoginFromNavBar = {this.handleUserLoginFromNavBar}/>}></Route>
                            <Route exact path={'/loginSelect'} component={() => <DoctorPatientSelect handleUserLoginFromNavBar = {this.handleUserLoginFromNavBar}/>}></Route>
                            <Route exact path={'/contact'} component={() => <Contact userInfo = {this.data}/>}></Route>
                            <Route exact path={'/pricing'} component={() => <Pricing/>}></Route>
                            <Route exact path={'/payment'} component={()=> <Payment_Form/>}></Route>
                            <Route exact path={'/gotofullCaseView'} component={()=> <FullViewCase caseInfo={this.state.userData}/>}></Route>
                            <Redirect to={'/'} />
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
                        <Navbar className={'SizeNav'} sticky={"top"} style={{paddingTop:"0px", paddingBottom:"0px"}}>
                            <Nav>
                                <span style={{color:"white", fontSize:"25px"}}>
                                    <img responsive src={navbarLogo} style={{height:"50px", width:"50px",
                                        marginBottom:"5px",borderTop:"-10px", paddingBottom:"15px"}}/>SecondChance
                                </span>
                                <div className={"MovePatientLinksRight"}></div>

                                <Link to="/">Home</Link>

                                <Link to="/contact">Contact Us</Link>

                                <Link to="/edit">Edit</Link>

                                <Link to={"/caseCreate"}>Case Submission</Link>

                                <Link to={"/clientCaseMgmt"}>Client Case Management</Link>

                                <Button onClick={()=>window.location.reload()}>Logout</Button>
                            </Nav>
                        </Navbar>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.state.userData}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/edit'} component ={() => <DrEdit userMode = {"patient"} userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/clientCaseMgmt'} component={() => <ClientCaseManagement userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/caseCreate'} component={() => <CaseCreation userInfo = {this.state.userData}/>}></Route>
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
        //user personalID and pass as props into all the other pages to display that user's info for tables
        return(
            <div>
                <Router>
                    <div>
                        <Navbar className={'SizeNav'} sticky={"top"} style={{paddingTop:"0px", paddingBottom:"0px"}}>
                            <Nav>
                                <span style={{color:"white", fontSize:"25px"}}>
                                <img responsive src={navbarLogo} style={{height:"50px", width:"50px",marginBottom:"5px",
                                    borderTop:"-10px", paddingBottom:"15px"}}/>SecondChance
                                </span>
                                <div className={"MoveDoctorLinksRight"}></div>

                                <Link to="/">Home</Link>

                                <Link to="/contact">Contact Us</Link>

                                <Link to="/edit">Edit</Link>

                                <Link to={"/caseCreate"}>Case Submission</Link>

                                <Link to={"/doctorCaseMgmt"}>Doctor Case Management</Link>

                                <Button onClick={()=>window.location.reload()}>Logout</Button>

                            </Nav>
                        </Navbar>
                        <Switch>
                            <Route exact path={'/'} component={() => <Homepage userInfo = {this.state.userData}/>}></Route>
                            <Route exact path='/contact' component={() => <Contact userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/edit'} component={() => <DrEdit userMode = {"doctor"} userInfo = {this.state.userData}/>}></Route>
                            <Route exact path={'/caseCreate'} component={() => <CaseCreation userInfo = {this.state.userData}/>}></Route>
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
        console.log(window.innerWidth);
        return(
          <div>

              {this.NavbarModes()}
              <br />

          </div>
        );
    }
}