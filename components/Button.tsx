import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react';

const Button = ({text, link}:{text: string, link: string}) => {
    return (
        <Link href={link} className='w-fit px-6 hover:text-accent hover:bg-[#29241d]/70 font-semibold flex items-center justify-center gap-x-3 border border-[#aba59c] rounded-4xl transition-all duration-200 py-2.5 text-foreground text-lg capitalize'>
            {text} <ArrowRightIcon/>
        </Link>
    );
};

export default Button;