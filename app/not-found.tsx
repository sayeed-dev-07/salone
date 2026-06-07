'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP)
gsap.config({ force3D: true })

const images = [
    {
        id: 1,
        name: 'img1',
        link: '/images/hero/01.webp'
    },
    {
        id: 2,
        name: 'img2',
        link: '/images/hero/02.webp'
    },
    {
        id: 3,
        name: 'img3',
        link: '/images/hero/03.webp'
    },
    {
        id: 4,
        name: 'img4',
        link: '/images/hero/04.webp'
    }
]

const Page = () => {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const slides = gsap.utils.toArray<HTMLElement>('.slide');


        gsap.set(slides, { autoAlpha: 0, zIndex: 0, scale: 1 });
        gsap.set(slides[0], { autoAlpha: 1, zIndex: 1 });

        let currentIndex = 0;


        gsap.to(slides[0], { scale: 1.05, duration: 6, ease: 'none' });

        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            const currentEl = slides[currentIndex];
            const nextEl = slides[nextIndex];


            gsap.set(nextEl, { autoAlpha: 0, zIndex: 2, scale: 1 });


            gsap.to(nextEl, {
                autoAlpha: 1,
                duration: 1.5,
                ease: 'power2.inOut',
                onComplete: () => {

                    gsap.set(currentEl, { autoAlpha: 0, zIndex: 0 });

                    gsap.set(nextEl, { zIndex: 1 });
                    currentIndex = nextIndex;


                    gsap.delayedCall(2, nextSlide);
                }
            });


            gsap.to(nextEl, {
                scale: 1.05,
                duration: 5,
                ease: 'none'
            });
        };


        const timer = gsap.delayedCall(5.5, nextSlide);


        return () => {
            timer.kill();
            gsap.killTweensOf(slides);
        };
    }, { scope: container });

    return (
        <div ref={container} className="relative h-screen w-full overflow-hidden bg-background">

            <div className="absolute inset-0 z-20 bg-black/20" />


            {images.map((img, index) => (
                <div
                    key={img.id}
                    className={`slide absolute inset-0 bg-cover bg-center will-change-transform ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    style={{ backgroundImage: `url(${img.link})` }}
                />
            ))}

            {/* Content Container */}
            <div className="relative z-30 flex h-full items-center justify-center text-5xl text-accent">
                <p>Not found page</p>
            </div>
        </div>
    );
};

export default Page;