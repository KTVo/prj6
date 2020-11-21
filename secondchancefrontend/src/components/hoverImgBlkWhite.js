import React from "react";
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';


export function HoverImgBlkWhite(props){




        return (

            <MDBContainer className="mt-4">
                <div style={{position: "relative",
                    textAlign: "center",
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "600"}}>Click Image below to {props.overlayText}</div>
                <MDBRow>
                    <MDBCol>

                        <MDBView hover>

                            <img
                                src={props.imgSource}
                                className="img-fluid"
                                alt=""
                                style ={{height: props.data.picHeight, width: props.data.picWidth}}


                            />

                            <MDBMask className="flex-center" overlay={props.data.overlayColor}>
                                <p className="white-text">{props.overlayText}</p>
                            </MDBMask>


                        </MDBView>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>

        );



}



