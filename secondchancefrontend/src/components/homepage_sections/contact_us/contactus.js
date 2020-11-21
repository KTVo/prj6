import React from 'react';
import facebook_icon from './social_media_icons/facebook.PNG';
import twitter_icon from './social_media_icons/twitter.PNG';
import linkin_icon from './social_media_icons/linkin.PNG';

export function ContactUs_HomePage()
{
    const widthHeightIcon = "30px";
    return(
      <div>

          <table>
              <tr>
                  <td>

                      <h3>Contact Us</h3>
                      <p>
                          55555 University Pkwy,
                          <br />
                          San Bernardino, CA 92407
                          <br />
                          (555) 555-5555
                      </p>
                      
                  </td>
                  <td>
                      <img src={twitter_icon} style={{height:widthHeightIcon, width:widthHeightIcon}}/>
                  </td>
                  <td>
                      <img src={facebook_icon} style={{height:widthHeightIcon, width:widthHeightIcon}}/>
                  </td>
                  <td>
                      <img src={linkin_icon} style={{height:widthHeightIcon, width:widthHeightIcon}}/>
                  </td>
              </tr>
          </table>
      </div>
    );

}