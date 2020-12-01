import React, { useRef } from 'react';
import {MDBInput} from 'mdbreact';
import {Button, Form, Modal, Container, Row, Col} from 'react-bootstrap';
import {MultiBrowsePic} from '../multiBrowsePic';
import Cards from 'react-credit-cards';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-credit-cards/lib/styles.scss';
import major_credit_card_pics from './payment_pics/major_credit_cards_pic.png';



//Generates a payment form for the user to enter in their payment information via credit card
export class Payment_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            name_on_card: '',
            credit_card_num: '',
            exp_date: '',
            cv_code: '',
            focus: ''
        };

        this.subtotal = 150.00;
        this.taxRate = 0.08;
        this.total = this.subtotal + this.subtotal*this.taxRate;
    }
    async componentDidMount() {
        //Getting record_id from props from generateSortableTable.js
        let caseDetail = this.props.caseDetail;

        console.log(caseDetail);

        // Insert API into here
        // paymententry
        // fields
        // pat_id, number, month, year, csv, company, record_assessment_id, total, phy_id
        // fetch("http://52.247.220.137/paymententry",
        //     {
        //         method: 'PUT',
        //         headers: {'Content-Type': 'application/json'},
        //         body: {"record_assessment_id": caseDetail.record_assessment_id, month: this.state.exp_date.substring(2),
        //             year:20 + this.state.exp_date.substring(this.state.exp_date.length-2),
        //             number: this.state.credit_card_num, csc: this.state.cv_code, company: 'N/A', total: '150.00',
        //             phy_id: caseDetail.phy_id}
        //     });

        // let results = await fetch("http://52.247.220.137/get_payment_patid",
        //     {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({pat_id: "1"})
        //     }
        //     )
        // console.log("2020");
        // results = await results.json();
        // console.log(results);



    }

    handleInputChange = (event) =>
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            })

        console.log(this.state);



    }

    handleSubmitPayment()
    {
        let caseDetail = this.props.caseDetail;

        console.log("aaaaasss");

        fetch("http://52.247.220.137/paymententry",
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: {"record_assessment_id": caseDetail.record_assessment_id, month: this.state.exp_date.substring(2),
                    year:20 + this.state.exp_date.substring(this.state.exp_date.length-2),
                    number: this.state.credit_card_num, csc: this.state.cv_code, company: 'N/A', total: '150.00',
                    phy_id: caseDetail.phy_id}
            });

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

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
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
                                <Container style={{width: "100%", padding: "0px", margin: "0px", border:"1px", borderColor: "black", borderStyle: "solid"}}>
                                <Row>
                                    <img style={{height: "auto", width: "100-px", margin:"auto"}} src={major_credit_card_pics} />
                                </Row>
                                    <Form className={'paymentForm'} onSubmit={this.handleSubmit} style={{width: "50%", margin: "auto"}}>
                                        <Container style={{margin: "auto", width: "100%"}}>
                                            <Row style={{width: "100%", margin: "auto"}}>
                                                <Row>
                                                    <Col style={{paddingRight: "0px", margin:"auto", border:"0px"}}>
                                                    </Col>
                                                    <Cards
                                                        cvc={this.state.cv_code}
                                                        expiry={this.state.exp_date}
                                                        focused={this.state.focus}
                                                        name={this.state.name_on_card}
                                                        number={this.state.credit_card_num}
                                                    />
                                                    <Col>
                                                        <MDBInput as={"input"}s
                                                                  label={"Name on Card"}
                                                                  name="name_on_card"
                                                                  icon={"fas fa-user"}
                                                                  onChange={this.handleInputChange}
                                                                  onFocus={this.handleInputFocus}
                                                                  required/>

                                                        <MDBInput as={"input"}
                                                                  className="far fa-credit-card"
                                                                  label={"Card Number"}
                                                                  name="credit_card_num"
                                                                  icon = "far fa-credit-card"
                                                                  onChange={this.handleInputChange}
                                                                  onFocus={this.handleInputFocus}
                                                                  required/>

                                                        <MDBInput as={"input"}
                                                                  label={"Expiration Date"}
                                                                  name="exp_date"
                                                                  prepend = "credit-card"
                                                                  onChange={this.handleInputChange}
                                                                  onFocus={this.handleInputFocus}
                                                                  required/>

                                                        <MDBInput as={"input"}
                                                                  label={"CV Code"}
                                                                  name="cv_code"
                                                                  prepend = "credit-card"
                                                                  onChange={this.handleInputChange}
                                                                  onFocus={this.handleInputFocus}
                                                                  required/>
                                                    </Col>
                                                </Row>
                                            </Row>


                                            <Button name="submit" style={{display:"inline"}} onClick={()=>this.handleSubmitPayment()}>Submit</Button>
                                        </Container>


                                        </Form>
                                    </Container>
                                </Col>
                                <Col>
                                    <Container style={{padding: "0px", margin: "0px", border:"1px", width:"500px", borderColor: "black", borderStyle: "solid"}}>


                                        <h4 style={{paddingLeft: '10px'}}>Description:</h4>

                                        <Row style={{paddingRight:'0px', margin: 'auto', borderRight:'0px'}}>
                                            <Col>
                                                <h6 style={{paddingLeft: '30px'}}>Diagnosis Fee</h6>
                                            </Col>
                                            <Col>
                                                ${this.subtotal.toFixed(2)}
                                            </Col>
                                            <Col style={{paddingTop: "400px"}}>
                                                <h6>Subtotal: ${this.subtotal.toFixed(2)}</h6>
                                                <h6>Tax: ${(this.taxRate * this.subtotal).toFixed(2)}</h6>
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