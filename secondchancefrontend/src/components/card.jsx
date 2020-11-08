import React from "react";
import "../assets/card.scss";
import '../css/makeImgUndraggable.css';

const FrontCard = (props) => {
  console.log("suckkkk " + props.user.phy_name);
  return (
    <article
      id="front-card"
      className={`card-container ${props.class}`}
      style={props.style}
    >
      <div className="img-item">        </div>
      <div className="text-item">

        <p>{props.user.doctorName}</p>
        <p>{props.user.location}</p>
        <p>{props.user.specialty}</p>
        <img className={'imgUndraggable'} align={"center"} height={180} width={180} src={props.user.image} alt={"docimg"} />
      </div>
    </article>
  );
};

const BackCard = (props) => {

  return (
    <section
      id="back-card"
      className={`card-container ${props.class}`}
      style={props.style}
    >
      <h1>{props.user.about} More info</h1>
      <div>{props.user.age} years old</div>
      <div>NPI: {props.user.npi}</div>
      <div>{props.user.location}</div>
      <div>{props.user.email}</div>
      <div>
        <i className="fas fa-map-marker-alt" />
        {props.user.from}
      </div>
    </section>
  );
};

const cardPosition = (order, isBack, position) => {
  if (order === 0 && (position.X || position.Y)) {
    return {
      display: order !== 0 && isBack ? "none" : "flex",
      top: (position.Y / window.innerHeight) * 100 + "%",
      left: (position.X / window.innerWidth) * 100 + "%",
      width: `calc(300px - ${order}%)`
    };
  }
  return {
    display: order !== 0 && isBack ? "none" : "flex",
    top: 50 + order + "%",
    width: `calc(300px - ${order}%)`
  };
};

const showCardClass = (index, status, isBack) => {
  if (index === 0) {
    switch (status) {
      case 1:
        return isBack ? "show-back-card" : "show-front-card";
      case 2:
        return isBack ? "show-front-card" : "show-back-card";
      default:
        return "";
    }
  }
};

const cardContainer = (props, position) => {
  let card_list = [];
  const maxNumberOfCards = 14;
  props.user_data.map((val, index) => {
  if(index < maxNumberOfCards) {
    let mainScroll = index === 0 ? props.scroll : "";
    card_list.push(
        <FrontCard
            user={val}
            key={index}
            class={
              mainScroll + " " + showCardClass(index, props.show_status, false)
            }
            style={cardPosition(index, false, position)}
        />,
        <BackCard
            user={val}
            key={index + props.user_data.length}
            class={mainScroll + " " + showCardClass(index, props.show_status, true)}
            style={cardPosition(index, true, position)}
        />
    );
  }
    return card_list;
  });
  return card_list;
};

export default cardContainer;
