import React from 'react';
import { Carousel, Button,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Pelvis pic https://post.healthline.com/wp-content/uploads/2020/08/pelvis-x-ray_thumb-1-732x549.jpg
export class PicCarousel extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
            {
                show: false,

                pic:[
                    {
                        label: 'pic_1',
                        valueTitle: 'X-Ray Pevis',
                        valueURL: 'https://post.healthline.com/wp-content/uploads/2020/08/pelvis-x-ray_thumb-1-732x549.jpg',
                        valueFileName: 'pelvis-x-ray_thumb-1-732x549.jpg',
                        valueDescription:'Patient has fracture, joint dislocation and effusion, and several pediatric pathologies involving the pelvic girdle'
                    },
                    {
                        label: 'pic_2',
                        valueTitle: 'X-Ray Chest',
                        valueURL: 'https://4rai.com/images/easyblog_articles/155/chest-xray.jpg',
                        valueFileName: 'chest-xray.jpg',
                        valueDescription: 'It\'s evident patient has conditions such as pneumonia, heart failure, lung cancer, tuberculosis, sarcoidosis, and lung tissue scarring.'
                    },
                    {
                        label: 'pic_3',
                        valueTitle: 'X-Ray Hands',
                        valueURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJCJwq-te73EiuwrkdMiohyK60YY3ofiP7rw&usqp=CAU',
                        valueFileName: 'hand-xray.jpg',
                        valueDescription: 'Examined the radiocarpal and distal radioulnar joints, the carpals, metacarpals, and phalanges.'
                    }
                ]



            };
    }

    loopCarouselItem = () =>
    {

        return(
            this.state.pic.map(function(selectedPic,index) {
                return (

                    <Carousel.Item>
                        <div style={{width: "70%", margin: "auto"}}>
                        <img
                            style={{maxHeight:"1080px", maxWidth:"1920px"}}
                            key={index}
                            className="d-block w-100"
                            src={selectedPic.valueURL}
                            alt={selectedPic.valueFileName}
                        />
                        </div>
                        <Carousel.Caption>
                            <table style={{backgroundColor: 'rgba(23,32,42, 0.55)'}}>
                                <h3>{selectedPic.valueTitle}</h3>
                                <p style={{color: '#58D68D', fontSize: '30px', fontWeight: 'bold'}}>{selectedPic.valueDescription}</p>
                            </table>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })
        );
    }
    handleModal()
    {
        this.setState({show:!this.state.show})
    }

    render() {
        return(
            <div>

                <Button onClick={()=>{this.handleModal()}}>Show Pictures</Button>

                <Modal show = {this.state.show}
                       size = {'xl'}
                >
                    <Modal.Header>
                        Case Pictures
                        <Button onClick={()=>{this.handleModal()}}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>

                        <Carousel>
                            {this.loopCarouselItem()}
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>

                <br />
            </div>
        );
    }
}