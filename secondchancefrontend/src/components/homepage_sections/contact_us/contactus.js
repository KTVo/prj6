import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';

import facebook_icon from './social_media_icons/facebook.PNG';
import twitter_icon from './social_media_icons/twitter.PNG';
import linkin_icon from './social_media_icons/linkin.PNG';

//A message alert of when you click on a social media icon within this component
function FakeMessage()
{
    return(alert("This is a FAKE company Silly!"));
}

//Generates a block of information of our fake company SecondChance for the homepage
export function ContactUs_HomePage()
{
    const widthHeightIcon = "55px";
    return(
      <Container>
          <h3>Contact Us</h3>
          <Row>


              <p>
                  55555 University Pkwy,
                  <br />
                  San Bernardino, CA 92407
                  <br />
                  (555) 555-5555
              </p>

          </Row>

          <Row style={{height: widthHeightIcon, width:200}}>

              <Col style={{paddingLeft: "0px", marginLeft: "-10px",height:widthHeightIcon, width:widthHeightIcon}}>
                  <img src={twitter_icon} style={{height:widthHeightIcon, width:widthHeightIcon}} onClick={()=>FakeMessage()}/>
              </Col>
              <Col style={{height:widthHeightIcon, width:widthHeightIcon}}>
                  <img src={facebook_icon} style={{height:widthHeightIcon, width:widthHeightIcon}} onClick={()=>FakeMessage()}/>
              </Col>
              <Col style={{height:widthHeightIcon, width:widthHeightIcon}}>
                  <img src={linkin_icon} style={{height:widthHeightIcon, width:widthHeightIcon}} onClick={()=>FakeMessage()}/>
              </Col>
          </Row>


      </Container>
    );

}