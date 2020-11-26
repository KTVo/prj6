import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import '../../css/animatedBackground.scss';


export function SlidePageTransitionAnimation(incomingFunction, angle) {

    const [index, set] = useState(0)
    const onClick = useCallback(() => set(state => (state + 1) % 1), []);
    let eA = "100%", eB = "0%", eC = "0";
    let fA = "0%", fB = "0", fC = "0";

    if(angle == "right")
    {

        eA = "-100%";
        eB = "0%";
        eC = "0";

        fA = "0%";
        fB = "0";
        fC = "0";

    }
    else if(angle == "up")
    {
        eA = "0%";
        eB = "100%";
        eC = "0";

        fA = "0%";
        fB = "0";
        fC = "0";

    }
    else if(angle == "down")
    {
        eA = "0%";
        eB = "-100%";
        eC = "0"

        fA = "0%";
        fB = "0";
        fC = "0";
    }

    let transitions = useTransition(index, p => p, {
        from: { opacity: 0, transform: `translate3d(${eA},${eB},${eC})` },
        enter: { opacity: 1, transform: `translate3d(${fA},${fB},${fC})` },
        leave: { opacity: 0, transform: 'translate3d(0%,0%,0)' },
    })

    let pages = [
        ({ style }) => <animated.div style={{ ...style,background: `rgba(0, 0, 0, 0)` }}>{incomingFunction()}</animated.div>

    ]

    return (
        <div className="simple-trans-main">
            {transitions.map(({ item, props, key }) => {
                const Page = pages[item]
                return <Page key={key} style={props} />
            })}

        </div>
    )
}

