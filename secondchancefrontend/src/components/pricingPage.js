import React from "react";
import {SlidePageTransitionAnimation} from './animations/ani_slideIn';
import './pricingPage.css';

export function Pricing() {

    function ShowBackgroundPricingImg()
    {
        return(<div className={"PricingFixedBackgroundImg"} />);
    }

    function ShowBackgroundPricingInfo()
    {
        return(<div className={"PricingInfoLayer"}/>);
    }

    return (

        <div>

            {SlidePageTransitionAnimation(ShowBackgroundPricingImg,"down")}



        </div>

    );

}
//{SlidePageTransitionAnimation(ShowBackgroundPricingInfo,"up")}