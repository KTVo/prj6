import React from 'react';
import { Spring, animated, config } from 'react-spring/renderprops';
import {ContactUs_HomePage} from './homepage_sections/contact_us/contactus';
//import '../css/style_homepage_background_scroll.css'


import {TestEndpoint} from "./testEndpoint";

const COLORS = [
    'black',
    'white',
    'orange'
]

function Contact_us_display()
{

        return(
            <div>
                <ContactUs_HomePage />
            </div>
        );

}

export class Homepage extends React.Component
{
    render()
    {
        return(
            <div>
                <TestEndpoint />
            </div>
        )
    }
}

/*
export class Homepage extends React.Component {
    state = { y: 0 }
    el = React.createRef()
    spring = React.createRef()
    setY = () => this.setState({ y: Math.round(Math.random() * 750) + 50 })
    // User interaction should stop animation in order to prevent scroll-hijacking
    // Doing this on onWheel isn't enough, but just to illustrate ...
    stop = () => this.spring.current.stop()
    render() {

        const y = this.el.current ? this.el.current.scrollTop : 0

        return (
            <>
                <div className="scrolltop-main">

                    <Spring
                        native
                        reset
                        from={{ y }}
                        to={{ y: this.state.y }}
                        ref={this.spring}
                        config={config.slow}>
                        {props => (
                            <animated.div
                                className="scrolltop-c"
                                ref={this.el}
                                onWheel={this.stop}
                                scrollTop={props.y}>
                                <Carousel_it />
                                <Contact_us_display />
                                {COLORS.map(c => (
                                    <div key={c} style={{ height: 1000, background: c }}>

                                    </div>
                                ))}
                            </animated.div>
                        )}
                    </Spring>

                </div>

            </>
        )


    }

}
*/
