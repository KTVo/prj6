import React from 'react';
import Body from '../views/body';
import '../css/animatedBackground.scss';

export class Caller_SwipeCardAnimation extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
            {
                people1:[],
                isLoading: true,
                cnt: 0
            };


    }

    async componentDidMount() {


        //Calls to endpoint for every doctors' info
        //then push into people1 array
        console.log("Testing get_all_physician_records POST");

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id": 1})
        };



        await fetch("http://52.247.220.137:80/physician/all")
            .then(response => response.json())
            .then(
                (result) => {
                    console.log("I am in fetch.....")
                    console.log(result);
                    let l = result.length;
                    let peopleArray = [];
                    for (let i = 0; i < l; i++) {
                        peopleArray.push({});
                        peopleArray[i].doctorName = result[i].phy_name;
                        peopleArray[i].age = Math.floor(Math.random()*30+30);
                        peopleArray[i].location = result[i].phy_addr;
                        peopleArray[i].email = result[i].email;
                        peopleArray[i].rating = "CONSULT BACKEND ABOUT A FLOAT RATING [0.0, 5.0]";
                        peopleArray[i].npi = result[i].npi;
                        peopleArray[i].specialty = result[i].phy_qual;
                        peopleArray[i].drId = result[i].phy_id;

                    }
                    this.loading = true;
                    this.setState(
                        {
                            people1: peopleArray,
                            isLoading: false
                        }
                    )
                    this.p = peopleArray;
                    return peopleArray;
                }
            )

    }

    FromList = (list, index) => {
        return list[index];
    };

    fetchUserData = () => {
        const user_data = this.randomlyOneOfList(this.state.people1);
        user_data.avatar = this.state.people1;


        return user_data;
    };

    createDataList = (list = []) => {
        while(list.length < 1) {
            list.push(this.fetchUserData());
        }
        return list;
    };

    randomlyOneOfList = (list) => {
        return list[Math.floor(Math.random() * Math.floor(list.length))];
    }


    render() {
        return(
            <div>

                {!this.state.isLoading && (
                    <Body drInfo = {this.state.people1}  createDataList = {(drList) => this.createDataList(drList)}/>
                )}
            </div>
        );
    }
}

