import React from 'react';
import PicOfDoc1 from '../images/dr_female/female_quality_1/female_doctor_1.jpg';
import PicOfDoc2 from '../images/dr_female/female_quality_1/female_doctor_2.jpg';
import PicOfDoc3 from '../images/dr_female/female_quality_1/female_doctor_3.jpg';
import PicOfDoc4 from '../images/dr_female/female_quality_1/female_doctor_4.jpg';
import PicOfDoc5 from '../images/dr_female/female_quality_1/female_doctor_5.jpg';
import PicOfDoc6 from '../images/dr_female/female_quality_1/female_doctor_6.jpg';
import PicOfDoc7 from '../images/dr_male/male_quality_1/male_doctor_1.jpg';
import PicOfDoc8 from '../images/dr_male/male_quality_1/male_doctor_2.jpg';
import PicOfDoc9 from '../images/dr_male/male_quality_1/male_doctor_3.jpg';


//export let people1 = [];





export function GrabDrCardInfo(props)
{

  //Calls to endpoint for every doctors' info
  //then push into people1 array
    console.log("Testing get_all_physician_records POST");
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"phy_id":1})
    };

    fetch("http://52.247.220.137:80/get_all_physician_records",requestOptions)
        .then(response => response.json())
        .then(
            (result) =>
            {

              let l = result.length;
              let peopleArray = [];
              for(let i = 0; i < l; i++)
              {
                peopleArray[i].name = result[i].name;
                peopleArray[i].age = Math.floor(Math.random(i)%30+30);
                peopleArray[i].location = result[i].addr;
                peopleArray[i].email = result[i].email;
                peopleArray[i].rating = "CONSULT BACKEND ABOUT A FLOAT RATING [0.0, 5.0]";
                peopleArray[i].npi = result[i].npi;
                peopleArray[i].specialty = result[i].qual;
                peopleArray[i].drId = result[i].phy_id;

              }
              this.props.processPeople(peopleArray);

            }
        );

}


