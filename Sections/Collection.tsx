'use client'
import RevealAnimationWrapper from '@/components/RevealAnimationWrapper';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React from 'react';
gsap.registerPlugin(useGSAP)

const Collection = () => {
    return (
        // 1. ADDED: [clip-path:inset(0)] to constrain the fixed image to this div's boundaries
        <div className='relative h-screen w-full [clip-path:inset(0)]'>


            <div className='fixed top-0 left-0 z-0 h-screen w-full'>
                <Image src={'/images/collection/bg.webp'} className='object-cover' fill alt='collectionBg' />
            </div>


            <div className='relative z-10 text-accent flex flex-col w-full h-full items-center justify-center gap-y-3'>
                <RevealAnimationWrapper>
                    <h3 className='text-5xl'>Collection</h3>
                </RevealAnimationWrapper>
                <RevealAnimationWrapper>
                    <p className='font-semibold text-xl max-w-[600px] w-full text-center'>
                        Whether it&apos;s Western or Japanese clothing, it&apos;s to bring out your true self.
                        A special piece from our diverse lineup.
                    </p>
                </RevealAnimationWrapper>
            </div>
        </div>
    );
};

export default Collection;