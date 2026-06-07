/* eslint-disable react-hooks/refs */
'use client'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { ReactNode, useRef } from 'react';


gsap.registerPlugin(useGSAP)

const Navlink = ({ children, lineClassName = 'bg-accent' }: { children: ReactNode; lineClassName?: string }) => {

    const mainContainer = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const tl = useRef<GSAPTimeline>(null)

    const { contextSafe } = useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })

        tl.current.to(lineRef.current, {
            x: 0,
            duration: 0.4,
            ease: 'power4.out',
            overwrite: true
        })

    }, { scope: mainContainer })

    const hoverIn = contextSafe(() => {
        if (!tl.current) return

        tl.current?.play()
    })
    const hoverOut = contextSafe(() => {
        if (!tl.current) return
        tl.current?.reverse()
    })

    return (
        <div ref={mainContainer}>
            <div onMouseEnter={hoverIn} onMouseLeave={hoverOut} className='w-fit overflow-hidden '>

                {children}
                <div ref={lineRef} className={`w-full -mt-0.5 h-[1.5px] translate-x-[-105%] ${lineClassName}`} />
            </div>
        </div>
    );
};

export default Navlink;
