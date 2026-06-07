'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navbarData } from '@/public/data/navData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navlink from './Navbar/Navlink';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOverOtherSection, setIsOverOtherSection] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const tl = useRef<GSAPTimeline>(null);
    const lastScrollY = useRef(0);
    const isNavbarHidden = useRef(false);
    const navTextClass = isOverOtherSection ? 'text-foreground' : 'text-accent';
    const navLineClass = isOverOtherSection ? 'bg-foreground' : 'bg-accent';
    const buttonClass = isOverOtherSection
        ? 'border-foreground bg-foreground/5 text-foreground hover:bg-foreground hover:text-accent'
        : 'border-white bg-white/5 text-accent hover:bg-white hover:text-black';
    const hamburgerLineClass = isOverOtherSection ? 'bg-foreground' : 'bg-white';

    // Setup GSAP animations
    useGSAP(() => {
        // 1. Initial Desktop Load Animation
        gsap.to(containerRef.current, {

            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.2,
        });

        // 2. Mobile Menu Timeline Setup
        tl.current = gsap.timeline({ paused: true })
            .to(menuRef.current, {
                x: 0, // Slide in from right
                duration: 0.6,
                ease: 'power4.inOut',
            })
            .from('.mobile-nav-item', {
                y: 15,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
            }, '-=0.8'); // Start slightly before the menu finishes sliding in
    }, { scope: containerRef });

    // Trigger the mobile menu timeline based on state
    useGSAP(() => {
        if (isMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const showNavbar = () => {
            if (!containerRef.current || !isNavbarHidden.current) return;

            isNavbarHidden.current = false;
            gsap.to(containerRef.current, {
                yPercent: 0,
                duration: 0.45,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        };

        const hideNavbar = () => {
            if (!containerRef.current || isNavbarHidden.current) return;

            isNavbarHidden.current = true;
            gsap.to(containerRef.current, {
                yPercent: -110,
                duration: 0.45,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY.current;
            const otherSection = document.getElementById('other');

            if (otherSection) {
                const navHeight = containerRef.current?.offsetHeight ?? 0;
                const otherRect = otherSection.getBoundingClientRect();

                setIsOverOtherSection(otherRect.top <= navHeight && otherRect.bottom > 0);
            }

            if (isMenuOpen || currentScrollY < 24) {
                showNavbar();
            } else if (scrollDelta > 6) {
                hideNavbar();
            } else if (scrollDelta < -6) {
                showNavbar();
            }

            lastScrollY.current = currentScrollY;
        };

        lastScrollY.current = window.scrollY;
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMenuOpen]);

    return (
        <div ref={containerRef} className="fixed top-0 left-0 z-50 w-full opacity-0">
            {/* --- Desktop Navbar --- */}
            <nav className={`flex items-center justify-between sm:px-4 px-2 lg:px-8 ${isOverOtherSection ? 'bg-accent' : 'bg-transparent'}  py-3 transition-colors duration-300 ${navTextClass}`}>
                {/* Logo */}
                <div className='flex items-center justify-center gap-x-3'>
                    <div className={`nav-item z-50 transition-[filter] duration-300 ${isOverOtherSection ? '' : 'mix-blend-difference'}`}>
                        <Link href="/">
                            <div className='relative h-[60px] sm:h-[70px] aspect-square '>
                                <Image
                                    alt="logo"
                                    src={isOverOtherSection ? navbarData.logo2 : navbarData.logo1}
                                    fill
                                    className="bg-cover"
                                />
                            </div>
                        </Link>
                    </div>


                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center space-x-6 font-primary">
                        {navbarData.navlink.map((item) => (
                            <Navlink key={item.id} lineClassName={navLineClass}>
                                <Link

                                    href={`/${item.link}`}
                                    className={`nav-item text-lg font-bold capitalize transition-colors duration-300 ${navTextClass}`}
                                >
                                    {item.name}
                                </Link>
                            </Navlink>
                        ))}
                    </div>
                </div>



                {/* Desktop Reservation Button */}
                <div className="hidden lg:block nav-item z-50">
                    <Link href={`/${navbarData.button.link}`}>
                        <button className={`px-8 py-3 border rounded-full text-sm
                        font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer duration-300 ${buttonClass}`}>
                            {navbarData.button.name}
                        </button>
                    </Link>
                </div>

                {/* Mobile Hamburger Menu Toggle */}
                <button
                    className={`lg:hidden nav-item z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 ${isOverOtherSection ? '' : 'mix-blend-difference'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={`block w-6 h-[1px] transition-transform duration-300 ease-in-out ${hamburgerLineClass} ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                    <span className={`block w-6 h-[1px] transition-opacity duration-300 ease-in-out ${hamburgerLineClass} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`block w-6 h-[1px] transition-transform duration-300 ease-in-out ${hamburgerLineClass} ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                </button>
            </nav>

            {/* --- Mobile Sidebar Menu --- */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 w-full md:w-[400px] min-h-screen bg-[#FAF8F5] text-[#333333] translate-x-full shadow-2xl flex flex-col pt-28 px-10 overflow-y-scroll lg:hidden"
            >
                <div className="flex flex-col space-y-6">
                    {navbarData.navlink.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${item.link}`}
                            className="mobile-nav-item text-lg font-semibold uppercase  hover:text-[#b89f8a] transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-12 mobile-nav-item pb-10">
                    <Link href={`/${navbarData.button.link}`} onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full py-4 border border-[#b89f8a] text-[#b89f8a] font-semibold rounded-lg text-sm uppercase tracking-[0.2em] hover:bg-[#b89f8a] hover:text-white transition-colors duration-300">
                            {navbarData.button.name}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
