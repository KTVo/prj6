import React from "react";
import {SlidePageTransitionAnimation} from './animations/ani_slideIn';
import './pricingPage.css';
import majorCreditCardImg from "./payment/payment_pics/major_credit_cards_pic.png";

//generates price page to inform users/potential users of our prices
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
            <div style={{height:"40%"}} />
            <img style={{marginLeft:"40%", height: "25%", width: "20%", objectFit: "fill"}} src={majorCreditCardImg}/>


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
