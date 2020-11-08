import React from 'react';


class ClientRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state =
            {
                username: '',
                email: '',
                password: '',
                repassword: '',
                firstName: '',
                lastName: '',
                picture: '',
                bio: ''
            };


    }


    handleInputChange = (event) =>
    {
        this.setState(
            {

                [event.target.name]: event.target.value
            })
    }


    handleSubmit = (event) =>
    {

        const data = this.state;
        console.log(data);
        console.log("CLIENT PAGE")
            //this.props.data.userMode = "Client";
            if(this.props.data.userMode === 'Patient') {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"username": data.email,pat_age: data.age, "pat_sex": data.sex,
                        "pat_medical_history":data.bio, "pat_name":data.name, "email": data.email, "password": data.password})
                    /*
                    username
                    pat_age
                    pat_sex
                    pat_medical_history - bio
                    pat_name
                    email
                    password
                    */


                };

                fetch("http://52.247.220.137:80/client", requestOptions)
                    .then(response => console.log(response.text()))
            }
            /*
            else
            {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"username": this.state.email, "password": this.state.password})
                };

                fetch("http://52.247.220.137:80/client/login", requestOptions)
                    .then(response => console.log(response.text()))
            }
            */




        event.preventDefault();

    }
    render() {
        //fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then( resp => resp.json).then(result => console.log(result));
        return (
            <form>
                <label>
                    <u>Registration for Physicians</u>
                    <br />
                </label>
                <br />


                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required/>
                </label>
                <label>
                    Username:
                    <input
                        name="address"
                        type="text"
                        value={this.state.addr}
                        onChange={this.handleInputChange}
                        required/>
                </label>
                <label>
                    Email:
                    <input
                        Email="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required/>
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required/>
                </label>

                <br />
                <label>
                    Password:
                    <input
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required/>
                </label>

                <br />
                <label>
                    Repeat Password:
                    <input
                        name="repassword"
                        type="text"
                        value={this.state.repassword}
                        onChange={this.handleInputChange}
                        required/>
                </label>

                <br />
                <label>
                    First Name:
                    <input
                        name="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        required/>
                </label>

                <br />

                <label>
                    Last Name:
                    <input
                        name="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        required/>
                </label>


                <br />
                <label>
                    Upload Profile Picture:
                    <br />
                    <input type="file" value={this.state.picture} onChange={this.handlePictureChange}/>
                </label>

                <br />
                <label>
                    Bio:
                    <br />
                    <textarea  name="bio" rows="20" cols="100" value={this.state.bio} onChange={this.handleInputChange}/>
                </label>
                <br />
                <br />
                <button type="button" onClick = {this.handleSubmit}>Register</button>
            </form>
        );
    }
};

export default ClientRegister;