import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import '../../css/animatedBackground.scss';
import {GenerateSortableTable} from '../generateSortableTable';

//Animates a chosen case management table when pages loads
//parameter is the case management that will be animated
export function SlidePageTransitionAnimation(tableSettings) {

    const [index, set] = useState(0)
    const onClick = useCallback(() => set(state => (state + 1) % 2), [])
    const transitions = useTransition(index, p => p, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })

    let pages = [
        ({ style }) => <animated.div style={{ ...style}}><GenerateSortableTable userInfo = {tableSettings.userInfo} incomingData={tableSettings.incomingData} /></animated.div>,
        ({ style }) => <animated.div style={{ ...style}}><GenerateSortableTable  userInfo = {tableSettings.userInfo} incomingData={tableSettings.incomingData} /></animated.div>,

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

