import React from 'react';
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/carousel.css';

import pat_pic_1 from '../pictures/patient_avatar/pat_avatar_1.jpg';
import pat_pic_2 from '../pictures/patient_avatar/pat_avatar_2.jpg';
import pat_pic_3 from '../pictures/patient_avatar/pat_avatar_3.jpg';
import pat_pic_4 from '../pictures/patient_avatar/pat_avatar_4.jpg';
import pat_pic_5 from '../pictures/patient_avatar/pat_avatar_5.jpg';
import pat_pic_6 from '../pictures/patient_avatar/bearded_male.PNG';
import pat_pic_7 from '../pictures/patient_avatar/elder_woman_3.PNG';
import pat_pic_8 from '../pictures/patient_avatar/elderly_man.PNG';
import pat_pic_9 from '../pictures/patient_avatar/guy_glasses_2.PNG';
import pat_pic_10 from '../pictures/patient_avatar/guy_glasses.PNG';
import pat_pic_11 from '../pictures/patient_avatar/lady_1.PNG';
import pat_pic_12 from '../pictures/patient_avatar/male_tux.PNG';
import pat_pic_13 from '../pictures/patient_avatar/old_lady_1.PNG';
import pat_pic_14 from '../pictures/patient_avatar/old_lady_2.PNG';
import pat_pic_15 from '../pictures/patient_avatar/old_lady_4.PNG';
import pat_pic_16 from '../pictures/patient_avatar/old_lady_5.PNG';
import pat_pic_17 from '../pictures/patient_avatar/pat_avatar_6.png';


/*
    Img_links:
        https://i.ibb.co/wM6twyZ/bg-slide-1.png - https://ibb.co/72yhRvx
        https://i.ibb.co/Kb6swg6/bg-slide-2.png - https://ibb.co/ckJ8L9J
        https://i.ibb.co/9qJFqwf/bg-slide-3.jpg - https://ibb.co/wKT9KJb
        https://i.ibb.co/BKYZhjF/bg-slide-4.png - https://ibb.co/3YPNxWQ
        https://cdn.technadu.com/wp-content/uploads/2018/07/VPN-Encryption-Featured-1536x864.jpg
 */


export class Testimonial_Slider extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
            {
                show: false,





            };

        this.pic=[
            {
                label: 'pic_1',
                valueTitle: 'Machiavelli Dicaprio',
                valueURL: pat_pic_1,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'No one was able to pinpoint why I can\'t be a nice person so I had Dr. '
                    +'Fabien to have a look at my CTs. Turns out I\'m just an imbecile.'
            },
            {
                label: 'pic_2',
                valueTitle: 'Eva Campbell',
                valueURL: pat_pic_2,
                valueFileName: 'pelvis-x-ray_thumb-1-732x549.jpg',
                valueDescription:'Absolutely INCREDIBLE! Dr. Jacobs saw my PET scan and directed me to find the proper treatment!'
            },
            {
                label: 'pic_3',
                valueTitle: 'Marc Jacobs',
                valueURL: pat_pic_3,
                valueFileName: 'chest-xray.jpg',
                valueDescription: 'AMAZING! She was able to determine from my chest X-rays that I have lung cancer '
                    + ' from working in the mines and not cigarettes! Now I can retire happy smoking!'
            },
            {
                label: 'pic_4',
                valueTitle: 'Jim Jones',
                valueURL: pat_pic_4,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'This doc looked at my MRIs and clinically confirmed that I was a sociopath. '
                    + 'I am going to pay him a visit in-person to give him another review. Not sure '
                    + 'how he\'d feel about that.'
            },
            {
                label: 'pic_5',
                valueTitle: 'Katsumi Naomi',
                valueURL: pat_pic_5,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'I come from a small village. My doctor is also my mechanic and garbage collector '
                    +'he does the medical imagings and Second Chance does the diagnosing. It\'s just healthier for me '
                    +'this way.'
            },
            {
                label: 'pic_6',
                valueTitle: 'Jean Pierre',
                valueURL: pat_pic_6,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'I am very active and with that has come my share of mishaps. Dr. Loyd '
                    + 'explains exactly what is wrong and recommended what my physician should do. I sincerely trust him, '
                    + 'his medical knowledge and his judgment.'
            },
            {
                label: 'pic_7',
                valueTitle: 'Barbara Lee',
                valueURL: pat_pic_7,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'I absolutely love this Doctor! He is always friendly, Dr. Kim couldn\'t be more caring.'
            },
            {
                label: 'pic_8',
                valueTitle: 'Escobar Gustavo',
                valueURL: pat_pic_8,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'Doctor Jay had the speed of Hermes. My local doctor office is close so I '
                    + 'decided to use Second Chance and he replied back to be within minutes! Will be using this'
                    + ' service again.'
            },
            {
                label: 'pic_9',
                valueTitle: 'Henry Stein',
                valueURL: pat_pic_9,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'Second Chance was quick and easy to use. My doctor insisted that my toe was '
                    + 'not broken based on his diagnose of my X-rays. I showed it to Dr. Kent from Second Chance '
                    + 'and he immediately advised me to head to the ER so that I would not fractured it anymore.'
            },
            {
                label: 'pic_10',
                valueTitle: 'Hans Lichtenberg',
                valueURL: pat_pic_10,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'My English is not great. Second Chance allows me to find German speaking doctors easily.'
            },
            {
                label: 'pic_11',
                valueTitle: 'Marisol Espinoza',
                valueURL: pat_pic_11,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'I was able to find my previous doctor that moved out of state.'
            },
            {
                label: 'pic_12',
                valueTitle: 'Tyler Gomez',
                valueURL: pat_pic_12,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'Fantastic experience! Quick, easy to read diagnosis.'
            },
            {
                label: 'pic_13',
                valueTitle: 'Janet Meads',
                valueURL: pat_pic_13,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'Great for avoiding the long commute.'
            },
            {
                label: 'pic_13',
                valueTitle: 'Elizabeth Parker',
                valueURL: pat_pic_14,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'I was misdiagnosed twice by my doctors in town. Thanks to Dr. Jacobs I do not have '
                +'to go through chemo.'
            },
            {
                label: 'pic_13',
                valueTitle: 'Rosemarie Jenkins',
                valueURL: pat_pic_15,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'A fellow sister from my sorority recommended Second Chance! Dr. Bach was incredible!'
            },
            {
                label: 'pic_16',
                valueTitle: 'Maria Delarosa',
                valueURL: pat_pic_16,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'Due to my condition, it\'s very hard for me to commute. Gracias Second Chance!'
            },
            {
                label: 'pic_17',
                valueTitle: 'Terry Marcus',
                valueURL: pat_pic_17,
                valueFileName: 'hand-xray.jpg',
                valueDescription: 'It took me seven tries but I can finally find a doctor that I can tolerate.'
            },
        ]
    }

    LoopCarouselItem()
    {
        const widthSz  = '1920px';
        const heightSz = '350px';
        const imgWidth = '50px';
        const imgHeight = '200px';


        return(
            this.pic.map(function(selectedPic,index) {
                return (

                        <Carousel.Item>
                            <img
                                className ={"_carouselImgSize"}
                                key={index}
                                src={selectedPic.valueURL}
                                alt={selectedPic.valueFileName}
                            />

                            <Carousel.Caption className={"_carouselCaption"} style={{alignContent: 'left' }}>

                                <table style={{width: '400px', backgroundColor: 'rgba(255,255,255, 0.50)', alignContent: 'center'}}>
                                    <h3 style={{color:"black", textAlign:"center"}}>{selectedPic.valueTitle}</h3>
                                    <p style={{color:"black", textAlign:"center"}}>{selectedPic.valueDescription}</p>
                                </table>
                            </Carousel.Caption>
                        </Carousel.Item>

                );
            })
        );
    }

    render() {
        return(
            <div >
                <table>
                    <tr>
                        <td className={"_outsideLayer"} >
                            <Carousel className={"_carouselSize"} className={"_carouselBackgroundColor"}>
                                {this.LoopCarouselItem()}
                            </Carousel>
                        </td>
                    </tr>
                </table>

                <br />
            </div>
        );
    }
}

