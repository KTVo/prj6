import React from 'react';
import {MDBInput, MDBIcon} from 'mdbreact';
import {Button, Form, Modal, Container, Row, Col} from 'react-bootstrap';
import {MultiBrowsePic} from '../multiBrowsePic';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/style.css';

import major_credit_card_pics from './payment_pics/major_credit_cards_pic.png';

export class Payment_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            name_on_card: '',
            credit_card_num: '',
            exp_date: '',
            cv_code: ''
        };

        this.subtotal = 150.00;
        this.subtotal.toFixed(2);
        this.total = this.subtotal + this.subtotal*0.08;
        this.total.toFixed(2);
    }
    componentDidMount() {
        //Insert API into here

    }

    handleInputChange = (event) =>
    {
        this.setState(
            {

                [event.target.name]: event.target.value
            })

        console.log(this.state);

    }

    showModalHandle()
    {
        this.setState(
            {
                isShown: !this.state.isShown
            }
        )
        console.log("aaa "+ this.state.isShown);
    }



    render()
    {
        return(
            <div>
                <Button onClick={()=>{this.showModalHandle()}}>
                    Payment
                </Button>

                <Modal show = {this.state.isShown}
                       size = {'xl'}
                >
                    <Modal.Header>
                        <h4>Enter Payment Info</h4>
                    </Modal.Header>
                    <Modal.Body>


                            <Row>
                                <Col>
                                    <Container style={{padding: "0px", margin: "0px", border:"1px", borderColor: "black", borderStyle: "solid"}}>
                                    <Row>
                                        <img  style={{height: "auto", width: "100-px", margin:"auto"}} src={major_credit_card_pics} />
                                    </Row>

                                    <Form className={'paymentForm'} onSubmit={this.handleSubmit} style={{width: "50%", margin: "auto"}}>
                                        <Container style={{margin: "auto"}}>
                                            <Row style={{width: "50%", margin: "auto"}}>

                                                    <MDBInput as={"input"}
                                                              style={{width: "50%", margin: "auto"}}
                                                                  label={"Name on Card"}
                                                                  name="name_on_card"
                                                                  icon = "user"
                                                                  onChange={this.handleInputChange}
                                                                  required/>

                                            </Row>
                                            <Row style={{width: "50%", margin: "auto"}}>

                                                    <MDBInput as={"input"}
                                                              label={"Card Number"}
                                                              name="name_on_card"
                                                              icon = "user"
                                                              onChange={this.handleInputChange}
                                                              required/>
                                                <MDBIcon far icon="credit-card" />
                                            </Row>
                                            <Row>
                                                <Row style={{width: "50%", margin: "auto"}}>

                                                    <MDBInput as={"input"}
                                                              label={"Expiration Date"}
                                                              name="exp_date"
                                                              prepend = "credit-card"
                                                              onChange={this.handleInputChange}
                                                              required/>

                                                </Row>
                                                <Row style={{paddingLeft:"50px"}}>

                                                    <MDBInput as={"input"}
                                                              label={"CV Code"}
                                                              name="cv_code"
                                                              prepend = "credit-card"
                                                              onChange={this.handleInputChange}
                                                              required/>

                                                </Row>
                                            </Row>
                                            <Button name="submit" style={{display:"inline"}} onClick={this.handleInputChange}>Submit</Button>
                                        </Container>


                                    </Form>
                                    </Container>
                                </Col>
                                <Col>
                                    <Container style={{padding: "0px", margin: "0px", border:"1px", width:"500px", borderColor: "black", borderStyle: "solid"}}>


                                        <h4 style={{paddingLeft: '10px'}}>Description:</h4>

                                        <Row style={{paddingRight:'0px', margin: 'auto', borderRight:'0px'}}>
                                            <Col>
                                                <h5 style={{paddingLeft: '30px'}}>Diagnosis</h5>
                                            </Col>
                                            <Col>
                                                ${this.subtotal.toFixed(2)}
                                            </Col>
                                            <Col style={{paddingTop: "500px"}}>
                                                <h6>Subtotal: ${this.subtotal.toFixed(2)}</h6>
                                                <h5>Total: ${this.total.toFixed(2)}</h5>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{this.showModalHandle()}}>
                            Cancel Payment
                        </Button>
                    </Modal.Footer>
                </Modal>

                <MultiBrowsePic />
            </div>
        )
    }
}