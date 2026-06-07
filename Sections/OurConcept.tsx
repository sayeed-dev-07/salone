import RevealAnimationWrapper from '@/components/RevealAnimationWrapper';
import { conceptData } from '@/public/data/conceptData';
import Image from 'next/image';
import React from 'react';

const OurConcept = () => {
    const data = conceptData;
    return (
        <div className='py-[5%] px-2 gap-x-4 w-full 2xl:flex-row flex-col gap-y-12 flex items-center'>

            {/* left img container  */}

            <RevealAnimationWrapper className='flex-2 w-full'>
                <div className='w-full'>
                    <div className='xl:h-[60vh] h-[60vh] 2xl:h-[90vh] relative max-w-[550px] lg:max-w-[45vw] 2xl:max-w-[30vw]  w-full'>
                        <Image alt='conceptLeftImg' loading='lazy' fill className='object-cover' src={data.images.img1} />
                    </div>
                </div>
            </RevealAnimationWrapper>
            <RevealAnimationWrapper className='flex-2 flex items-center justify-center'>
                <div className=' max-w-[800px] w-full '>
                    <div className='space-y-6'>
                        <h3 className='text-5xl font-bold tracking-wider'>{data.title}</h3>
                        <div className='space-y-4 text-xl font-semibold capitalize'>
                            {data.des.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </RevealAnimationWrapper>
            <RevealAnimationWrapper className='flex-1 flex justify-end w-full'>
                <div className='w-full flex gap-y-12 flex-col items-end justify-between '>
                    <div className='relative max-w-[400px] w-full aspect-5/4'>
                        <Image alt='topImg' loading='lazy' fill src={data.images.img2} />
                    </div>
                    <div className='flex 2xl:mt-[10vh]'>
                        <div className='relative h-[30vh] sm:h-[40vh] aspect-4/5'>
                            <Image alt='topImg' loading='lazy' fill src={data.images.img3} />
                        </div>
                        <div className='relative mt-[10vh] ml-[-5vw] h-[20vh] sm:h-[35vh] aspect-4/5'>
                            <Image alt='topImg' loading='lazy' fill src={data.images.img4} />
                        </div>
                    </div>
                </div>
            </RevealAnimationWrapper>
        </div>
    );
};

export default OurConcept;