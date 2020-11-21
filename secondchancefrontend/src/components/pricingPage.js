import React from "react";
import pricedoctor from '../pictures/docwithclipboard.jpg';


export function Pricing() {


    return (

        <div>
            <div className="pricing-logo">
                <img src={pricedoctor} alt="Doctor Clip Image" />
            </div>
            <h1>Pricing</h1>
            <p>
                Here is a list of our prices!
                <li>
                    <a Our prices go here />
                </li>


            </p>
        </div>

    );

}
