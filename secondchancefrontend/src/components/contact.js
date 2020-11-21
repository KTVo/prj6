import React from 'react';
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
export class Contact extends React.Component
{
    constructor(props) {
        super(props);

        this.state ={
            physician_email: 'foolycooly288622@yahoo.com'
        };
    }

    displayLoginForm = () =>
    {
        return(
          <div>
              <h1  className="h1-responsive font-weight-bold text-center my-4" style={{textAlign: 'center'}}>Contact Us</h1>
              <Container className="col-md-9 mb-md-0 mb-5"  style={{width:"500px", margin:"auto"}}>

                  <Form action = { `mailto:${this.state.physician_email}`} method={ "post"}
                        encType={ "text/plain" } className={ "form-control" } style ={{border:"0px"}}>
                      <Row>
                        <Form.Group controlId={"nameContact"} style={{paddingLeft:"10%"}}>
                          <Form.Label>Name</Form.Label>
                          <Form.Control as={"input"} type={ "text" } name={ "From "} className={ "form-control"}
                                        placeholder={"Your fullname"} style={{width:"150%"}}/>
                        </Form.Group>
                      </Row>
                      <Row>
                          <Form.Group controlId={"emailContact"} style={{paddingLeft:"10%"}}>
                              <Form.Label>Email</Form.Label>
                              <Form.Control as={"input"} name={  "Recipient's Email " }
                                     className={  "form-control" } placeholder={"name@example.com"} style={{width:"150%"}}/>
                          </Form.Group>
                      </Row>


                      <Row>
                          <Form.Group controlId={"messageContact"} style={{paddingLeft:"10%"}}>
                              <Form.Label>Message</Form.Label>

                              <Form.Control name={"Message"} as={"textarea"} rows={5} cols={100}
                                            placeholder={"Your message..."}/>
                          </Form.Group>

                      </Row>


                      <Button style={{borderLeft:"10%", marginLeft:"9%", paddingLeft:"-10%"}} as={"input"} type={  "submit"} name = { "" } />

                  </Form>


              </Container>
          </div>
        );
    }

    render() {

        return(
            <div>
                {this.displayLoginForm()}
            </div>
        );
    }
};

//<Modal_It nameOfFunction={this.displayLoginForm()} modalTitle={"Contact"} />