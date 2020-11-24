import React from 'react';
import {ContactUs_HomePage} from './homepage_sections/contact_us/contactus';
import { Parallax, Background } from 'react-parallax';
import {Container, Row, Col} from 'react-bootstrap';
import {Testimonial_Slider} from "./testimonial_slider";
import './homepage_sections/homepage_css/fixedBackgroundImg.css';

const Container_IntroTitle = () => (
    <Parallax
        blur={{ min: -15, max: 15 }}
        bgImageAlt="penn-1"
        strength={-200}
        style={{
            position: 'absolute',
            background: `rgba(0, 0, 0, 0)`,
        }}

    >


        <div style={{ height: '50px' }} />
        <div style={{ backgroundColor:`rgba(0, 0, 0, 0.65)`, display: "inline",
            paddingLeft:"30px",fontSize: 150, color:"white", fontWeight: 100, fontFamily:"Arial, Helvetica, sans-serif"}}>Second Chance. </div>

        <div style={{
            backgroundColor:`rgba(0, 0, 0, 0.65)`,
            width:"1000px",
            paddingLeft:"30px",fontSize: 75, color:"white",
            fontWeight: 100, fontFamily:"Arial, Helvetica, sans-serif"}}>Physicians at your fingertips.</div>

    </Parallax>

);

const Container_OurStory = () => (

    <Parallax
        blur={{ min: -15, max: 15 }}
        bgImageAlt="penn-1"
        strength={-200}
    >

        <div style={{
            backgroundColor:`rgba(0, 0, 0, .99)`,
            height: "550px", width: "1080",
            paddingLeft:"30px", fontSize: "25px", color:"white", fontWeight: 100,
            fontFamily:"Helvetica, sans-serif"}}>
            <div style={{height: "50px"}} />
            <div style={{fontWeight: "bold"}} className="RepositionTitle">Our Story</div>

            <div style={{height: "10px"}} />
            <div style={{marginLeft: "30px", marginRight: "30px", paddingLeft: "30px", paddingRight: "30px"}}>
                We started Second Chance as a small web-based service with just my brother and I and it is to say
                that the story behind this company’s formation is a sorrow one. We lost our grandfather at a very young age
                due to colon cancer. We come from a very small town in the Wyoming with only one medical doctor for miles
                around. Unfortunately, our grandfather was misdiagnosed until it was too late where he finally succumbed to
                his illness. We believed that if only he had a second diagnosis, he would have had a second chance to live
                a fuller life. Hence is why we started up this company. Now we serve patients with hundreds of specialized
                doctors nationwide from a mouse click away.
            </div>
            <br />
            <br />
            <div className={"RepositionCloser"}>Stay Safe,</div>
            <br />
            <div className={"RepositionName"}>The Lehmann Doctors</div>

        </div>

    </Parallax>



);

const Container_SelectDoctorTitle = () => (
    <Parallax
        blur={{ min: -15, max: 15 }}
        bgImageAlt="penn-1"
        strength={-200}
        style={{
            position: 'absolute',
            background: `rgba(0, 0, 0, 0)`,
        }}

    >


        <div style={{ height: '300px' }} />
        <div style={{ backgroundColor:`rgba(0, 0, 0, 0.65)`, display: "inline",
            paddingLeft:"30px",fontSize: 120, color:"white", fontWeight: 100, fontFamily:"Arial, Helvetica, sans-serif"}}>Pick from hundreds of doctors.</div>

        <div style={{
            backgroundColor:`rgba(0, 0, 0, 0.65)`,
            width:"1000px",
            paddingLeft:"30px",fontSize: 75, color:"white",
            fontWeight: 100, fontFamily:"Arial, Helvetica, sans-serif"}}>Nationwide.</div>

    </Parallax>

);




const Container_Testimonial = () => (
    <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={require('./homepage_sections/homepage_backgrounds/testimonial_slider_background_black-texture.jpg')}
        strength={-200}
        style={{
            position: 'absolute',
            background: `rgba(0, 0, 0, 0)`,
        }}

    >

        <div className={"TestimonySliderStretcher"} />
        <div className={"ResizeParallax"} />
        <Testimonial_Slider />
        <div style={{ height: '25px' }} />

    </Parallax>

);

const Container_QualificationTitle = () => (
    <Parallax
        blur={{ min: -15, max: 15 }}
        bgImageAlt="penn-1"
        strength={-200}
        style={{
            position: 'absolute',
            background: `rgba(0, 0, 0, 0)`,
        }}

    >
        <div className={"PushQualTitleDown"} />
        <div className={"SameQualTitle"}>Same qualifications  </div>

        <div className={"SafetyOfHomeMessage"}>from the safety of your home.</div>

    </Parallax>

);


const Container_Copyright = () => (
    <Parallax
        blur={{ min: -15, max: 15 }}

        bgImageAlt="penn-1"
        strength={-200}
    >
        <div style={{ height: '200px' }} />
        <Container style={{marginLeft:"50%", width:"50%"}}>
            <Row><ContactUs_HomePage /></Row>
            <Row style={{marginLeft:"-8%", width:"50%"}}>© 2020 Second Chance. All rights reserved.</Row>
        </Container>

    </Parallax>

);



export class Homepage extends React.Component
{

    render()
    {
        return(
            <div stle={{backgroundColor: "black"}}>
                <Container_IntroTitle />
                <div className={"FixedBackgroundImg"}></div>
                <Container_OurStory />
                <Container_SelectDoctorTitle />
                <div className={"FixedBackgroundImg3"} />
                <div style={{height: "400px", backgroundColor:"black"}}>
                    <Container_Testimonial />
                </div>

                <Container_QualificationTitle />
                <div className={"FixedBackgroundImg2"}></div>
                <Container_Copyright />
            </div>
        )
    }
}
