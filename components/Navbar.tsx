import { navbarData } from '@/public/data/navData';
import Image from 'next/image';
import React from 'react';


const Navbar = () => {
    return (
        <div className='h-60'>
            {/* logo  */}
            <div>
                <Image alt='logo' src={navbarData.logo2} height={100} width={100} className='border-2' />
            </div>
        </div>
    );
};

export default Navbar;