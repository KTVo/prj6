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



            if(this.props.data.userMode === 'Doctor') {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"npi": this.state.npi,"username": this.state.username,"phy_name":this.state.name,
                        "phy_bio":this.state.bio,"phy_addr":"0","phy_qual":this.state.qual,
                        "email":this.state.email,"password": this.state.password})
                    /*
                    npi -
                    username
                    name
                    bio
                    address
                    qualifications
                    review count
                    email
                    password
                    */


                };

                fetch("http://52.247.220.137:80/physician", requestOptions)
                    .then(response => console.log(response.text()))
            }
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



        alert(`Test Variables
               --------------
                  Email: ${this.state.email} 
               Password: ${this.state.password}
             Repassword: ${this.state.repassword}
              FirstName: ${this.state.firstName}
               LastName: ${this.state.lastName}
                Picture: ${this.state.picture}
                    Bio: ${this.state.bio}
                    
                    
                    xxxxxxxxxxxxxxxxxxxxxxxx
                    
                    
                  Email: ${data.email} 
               Password: ${data.password}
             Repassword: ${data.repassword}
              FirstName: ${data.firstName}
               LastName: ${data.lastName}
                Picture: ${data.picture}
                    Bio: ${data.bio}`


        );


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