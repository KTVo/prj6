import React, { Component } from "react";
import HammerArea from "../../hammer";
import "../assets/body.scss";
import {Button, Modal} from "react-bootstrap";
import Header from "./header";

export default class Body extends Component {
  constructor(props) {
    super(props);

    let dataList = this.props.drInfo;
    console.log(dataList)

    this.state = {
      user_data: [...dataList],
      is_moving: false,
      show_status: 0,
      scroll: "",
        show: false

    };
    this.data ={}
    this.data.cntIndexCard = 0;
    this.data.numElements = dataList.length;
    this.data.hadChosen = false;
  }



    handleModal()
    {
        this.setState({show:!this.state.show})
    }

    ShowContentsOfBody()
    {

        return(
            <div>
                <div id="main-container">
                    <HammerArea
                        card_data={this.state}
                        func_like={(is_like) => this.isLike(is_like)}
                        func_show_info={() => this.isShowBackToggle()}
                    />
                    <div className="button-area">
                        <button
                            onClick={this.isLike.bind(this, false)}
                            disabled={this.state.is_moving}
                        >
                            <Button href="#">Next</Button>
                        </button>
                        <button
                            onClick={this.isShowBackToggle.bind(this)}
                            disabled={this.state.is_moving}
                        >
                            <Button href="#">Info</Button>
                        </button>
                        <button
                            onClick={this.isLike.bind(this, true)}
                            disabled={this.state.is_moving}
                        >
                            <Button href="#">Select</Button>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    RunModalPhysician()
    {

        return(
            <div>
                <Button onClick={()=>{this.handleModal()}}>
                    Select Physician
                </Button>


                <Modal show = {this.state.show}
                       size = {'xl'}
                >
                    <Modal.Header>
                        Select Secondary Physician
                        <Button onClick={()=>{this.handleModal()}}>
                            Cancel
                        </Button>
                    </Modal.Header>
                    <Modal.Body>

                        <Header />
                        {this.ShowContentsOfBody()}
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>


            </div>
        )
    }


  isLike = (ans) => {
      this.data.cntIndexCard = this.data.cntIndexCard + 1;
      console.log("indxNum " + this.data.cntIndexCard);

      if(ans === true)
      {

          //Fixes underbound
          if(this.data.cntIndexCard >= this.data.numElements | this.data.cntIndexCard < 0)
          {
              this.data.cntIndexCard = 1;
          }

          else if(this.data.cntIndexCard < 0)
          {
              this.data.cntIndexCard = this.data.cntIndexCard-1;
          }
          else if(this.data.hadChosen === false)
          {
              this.data.cntIndexCard = this.data.cntIndexCard - 1;
          }

          this.data.hadChosen = true;


          //call function that takes in the index or card information to be shoved to the backend
          //This just stores the doctor's information until submit button is pushed
          //console.log("indxNum " + this.data.cntIndexCard);

          //console.log(people1);
          //console.log(people1[this.data.cntIndexCard]);
            let selectDr = JSON.stringify(this.state.user_data[this.data.cntIndexCard]);
            console.log(selectDr);
          sessionStorage.setItem('selectedDoctorIndx', selectDr);
          this.handleModal();   //Closes the doctor selection modal


      }

    this.setState(() => {
      return {
        is_moving: true,
        scroll: ans ? "right-scroll" : "left-scroll"
      };
    });
    setTimeout(() => {
      let data = this.state.user_data;
      data.shift();
      this.setState(() => {
        return {
          user_data: this.props.createDataList(data),   //I changed this with Eric and Bernie
          is_moving: false,
          show_status: 0,
          scroll: ""
        };
      });
    }, 500);
  };

  isShowBackToggle = () => {
    this.setState(() => {
      return {
        show_status: this.state.show_status === 2 ? 1 : 2
      };
    });
  };


  render() {

    return (
        <div>
            {this.RunModalPhysician()}
        </div>
  );
  }
  }
