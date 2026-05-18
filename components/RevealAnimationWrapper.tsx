'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { ReactNode, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.config({ force3D: true })

const RevealAnimationWrapper = ({ children }: { children: ReactNode }) => {

    const containerRef = useRef<HTMLDivElement | null>(null)
    const animatedDiv = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {

        gsap.to(animatedDiv.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'none'
        })

    }, { scope: containerRef })

    return (
        <div ref={containerRef}>
            <div className='opacity-0 translate-y-3' ref={animatedDiv}>
                {children}
            </div>
        </div>
    );
};

export default RevealAnimationWrapper;