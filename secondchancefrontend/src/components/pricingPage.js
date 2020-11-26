import React from "react";
import {SlidePageTransitionAnimation} from './animations/ani_slideIn';
import './pricingPage.css';

export function Pricing() {

    function ShowBackgroundPricingImg()
    {
        return(<div className={"PricingFixedBackgroundImg"}>
            <div className={"approvalSeal"} />
            <div className={"MoveOneSmallPriceDown"}/>
            <div className={"OneSmallPriceText"} style={{fontFamily:"Didot"}}>
                One small price that will keep your piggy bank healthy!</div>
        </div>);
    }

    function ShowBackgroundPricingInfo()
    {
        return(<div className={"PricingInfoLayer"}>
            <div className={"PriceText"} style={{fontFamily:"Didot"}}>Only $150 per Diagnosis! </div>

        </div>);
    }
    //Price that will keep your piggy bank healthy
    return (

        <div className={"pageSizer"}>

            {SlidePageTransitionAnimation(ShowBackgroundPricingImg,"down")}
            {SlidePageTransitionAnimation(ShowBackgroundPricingInfo,"up")}


        </div>

    );

}
