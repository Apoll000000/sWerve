import Tilt from "react-parallax-tilt";
import '../styles/Categories.css'
import {
    AppWindow,
    LaptopMinimal,
    LanguagesIcon,
    ApertureIcon,
    MusicIcon,
    DrillIcon,
    WrenchIcon,
    ContactIcon,
    HandshakeIcon,
    DraftingCompassIcon,
    Building2,

} from "lucide-react"

import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Categories() {
    const [isScrolled, setIsScrolled] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <>
            <div className={`secondary-nav w-full flex items-center h-[50px] bg-gray-800 max-sm:p-3 sm:p-3 fixed top-15 left-0 xl:pl-50 xl:pr-50 transition-all duration-500 ${isScrolled ? "block" : "hidden"}`}>
                <div className="overflow-x-auto scrollbar-hide overflow-hidden flex items-center gap-8 w-full">
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Professional Consultation</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Handyworks</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Automotives & Mechanical</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Writing & Translation</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Programming & Web Dev</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Computer & Tech Repair</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Architectural & Designs</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Engineering & Construction</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Photography & Multimedia Services</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Music Production & Others</Link>
                    <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/">Business & Marketing</Link>
                </div>
            </div>
            <section ref={targetRef} className={`categories w-full xl:pr-40 xl:pl-40 sm:pr-4 sm:pl-4${isScrolled ? "hidden" : "block"}`}>
                <div ref={scrollRef} className="flex cursor-grab active:cursor-grabbing select-none gap-3 overflow-x-auto scrollbar-hide overflow-hidden p-10 w-full hover:cursor-pointer"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    onMouseUp={handleMouseUp} >
                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <ContactIcon />
                        <p className="text-gray-800 pt-5 font-bold">Professional Consultation (Medical, Law & Others)</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <DrillIcon />
                        <p className="text-gray-800 pt-5 font-bold">Handyworks (Plumbing, Electrical, Carpentry, etc.)</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <WrenchIcon />
                        <p className="text-gray-800 pt-5 font-bold">Automotives Repair, Maintenance & Other Mechanical Services</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <LanguagesIcon />
                        <p className="text-gray-800 pt-5 font-bold">Writing, Proofreading, Translation, etc.</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <AppWindow />
                        <p className="text-gray-800 pt-5 font-bold">Programming & Web Development Services</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <LaptopMinimal />
                        <p className="text-gray-800 pt-5 font-bold">Computer & Other Tech Repairs</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <DraftingCompassIcon />
                        <p className="text-gray-800 pt-5 font-bold">Architectural Services, Building Design, Interior Designs, etc.</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <Building2 />
                        <p className="text-gray-800 pt-5 font-bold">Engineering & Other Construction Services</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <ApertureIcon />
                        <p className="text-gray-800 pt-5 font-bold">Photography, Filming, Editing & Other Multimedia Services</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <MusicIcon />
                        <p className="text-gray-800 pt-5 font-bold">Music Production, Band Performance, Studio Rentals, etc.</p>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <HandshakeIcon />
                        <p className="text-gray-800 pt-5 font-bold">Business Consultation, Marketing & Others</p>
                    </Tilt>

                </div>
            </section>
        </>
    )
}

export default Categories