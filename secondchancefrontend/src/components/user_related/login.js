import React from 'react';
import {Button, Form, Container} from 'react-bootstrap';
import '../../css/login.css';


export class Login extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
            {
                email: '',
                password: '',
                loginInfoFromBackend: []

            };

    }

    handleInputChange = (event) =>
    {
        this.setState(
            {

                [event.target.name]: event.target.value
            })

    }

    SelectTitle()
    {
        if(this.props.data.userMode === 'Doctor')
        {
            return(<Form.Label><u className={"display-4"}>Physician Login</u></Form.Label>);
        }
        else
        {
            return(<Form.Label><u className={"display-4"}>Patient Login</u></Form.Label>);
        }
    }


    showLogin = () =>
    {
        return(
            <Container style={{width:"50%", margin:"auto"}}>
                <Form className={'loginForm'} onSubmit={this.handleSubmit}>
                    {this.SelectTitle()}
                    <br />
                    <Form.Label>
                        Email:
                        <Form.Control as={"input"}
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required/>
                    </Form.Label>



                    <br />
                    <Form.Label>
                        Password:
                        <Form.Control as={"input"}
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required/>
                    </Form.Label>

                    <br />


                    <Button type="button" onClick={() => this.handleLoginSubmit()}>Submit</Button>
                </Form>
            </Container>
        );
    }


    handleLoginSubmit()
    {
        let userDataBackend = [];
        if(this.props.data.userMode == 'Doctor') {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"username": this.state.email, "password": this.state.password})
            };

            fetch("http://52.247.220.137:80/physician/login", requestOptions)
                .then(response => response.json())
                .then(response => {
                    userDataBackend = {};
                    userDataBackend.modeID = "physician";
                    userDataBackend.userID = response.phy_id;
                    userDataBackend.userData = response;

                    this.props.handleUserLoginFromNavBar(userDataBackend);
        })
                //.catch(r => r.text()).then(r => console.log(r));

        }
        else
        {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"username": this.state.email, "password": this.state.password})
            };

            fetch("http://52.247.220.137:80/client/login", requestOptions)
                .then(response => response.json())
                .then(response => {
                    userDataBackend = {};
                    userDataBackend.modeID = "patient";
                    userDataBackend.userID = response.pat_id;
                    userDataBackend.userData = response;

                    this.props.handleUserLoginFromNavBar(userDataBackend);
                });
        }

    }



    render() {

        return(
            <div>
                {this.showLogin()}
            </div>


        );
    }

}