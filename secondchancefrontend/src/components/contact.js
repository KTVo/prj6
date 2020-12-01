import React from 'react';
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import {SlidePageTransitionAnimation} from './animations/ani_slideIn';

import 'bootstrap/dist/css/bootstrap.css'
import './user_related/userRelatedCSS/contactus.css';

//A contact technical support page where you can email the techsupport
export function Contact()
{

    const techsupport_email = 'secondchance_secondchance@engineer.com';


    function ContactUsForm(){
        return(
            <div className={"ContactUs_Form"}>
                <div style={{height: "75px"}} />
                <h1  style={{textAlign: 'center'}}>Contact Us for Tech Support</h1>
                <Container className="col-md-9 mb-md-0 mb-5"  style={{width:"500px", margin:"auto"}}>

                    <Form action = { `mailto:${techsupport_email}`} method={ "post"}
                          encType={ "text/plain" } style ={{border:"0px"}}>
                        <div style={{height:"30px"}}/>

                        <Row>
                            <Form.Group controlId={"emailContact"} style={{paddingLeft:"10%"}}>
                                <Form.Label style={{color:"white"}}>Email</Form.Label>
                                <Form.Control as={"input"} name={  "Recipient's Email " }
                                              className={  "form-control" } placeholder={"name@example.com"} style={{width:"150%"}} required/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId={"nameContact"} style={{paddingLeft:"10%"}}>
                                <Form.Label style={{color:"white"}}>Name</Form.Label>
                                <Form.Control as={"input"} type={ "text" } name={ "From "} className={ "form-control"}
                                              placeholder={"Your fullname"} style={{width:"150%"}} required/>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId={"messageContact"} style={{paddingLeft:"10%"}}>
                                <Form.Label style={{color:"white"}}>Message</Form.Label>

                                <Form.Control name={"Message"} as={"textarea"} rows={5} cols={100}
                                              placeholder={"Your message..."} required/>
                            </Form.Group>

                        </Row>


                        <Button style={{borderLeft:"10%", marginLeft:"9%", paddingLeft:"-10%"}} as={"input"} type={  "submit"} name = { "" } />

                    </Form>


                </Container>
            </div>
        );
    }

    function showBackgroundImage()
    {
        return (<div className={"ContactUsFixedBackgroundImg"} />);
    }

    return(
        <div>

            {SlidePageTransitionAnimation(showBackgroundImage, "left")}
            {SlidePageTransitionAnimation(ContactUsForm, "right")}

        </div>
    );

};

