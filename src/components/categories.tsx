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

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";



function Categories() {
    const [isScrolled, setIsScrolled] = useState(false);
    const targetRef = useRef(null);
    // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget.querySelector("p");
        
        if (target) {
            const category = target.textContent;
            // Skip setSelectedCategory if you're not using it elsewhere
            navigate("/category-page", { state: { category } });
        }
    };
    
    

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
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Professional Consultation</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Handyworks</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Automotives & Mechanical</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Writing & Translation</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Programming & Web Dev</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Computer & Tech Repair</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Architectural & Designs</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Engineering & Construction</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Photography & Multimedia Services</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Music Production & Others</p>
                    </div>
                    <div className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white hover:cursor-pointer" onClick={handleCardClick}>
                        <p>Business & Marketing</p>
                    </div>

                    {/* <Link className="w-auto flex-shrink-0 hover:border-b-1 hover:border-white" to="/"><p onClick={handleCardClick}></p></Link> */}
                   
                </div>
            </div>
            <section ref={targetRef} className={`categories w-full xl:pr-40 xl:pl-40 sm:pr-4 sm:pl-4${isScrolled ? "hidden" : "block"}`}>
                <div ref={scrollRef} className="flex cursor-grab active:cursor-grabbing select-none gap-3 overflow-x-auto scrollbar-hide overflow-hidden p-10 w-full hover:cursor-pointer"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    onMouseUp={handleMouseUp} >

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <ContactIcon />
                            <p className="text-gray-800 pt-5 font-bold">Professional Consultation (Medical, Law & Others)</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <DrillIcon />
                            <p className="text-gray-800 pt-5 font-bold">Handyworks (Plumbing, Electrical, Carpentry, etc.)</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <WrenchIcon />
                            <p className="text-gray-800 pt-5 font-bold">Automotives Repair, Maintenance & Other Mechanical Services</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <LanguagesIcon />
                            <p className="text-gray-800 pt-5 font-bold">Writing, Proofreading, Translation, etc.</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <AppWindow />
                            <p className="text-gray-800 pt-5 font-bold">Programming & Web Development Services</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <LaptopMinimal />
                            <p className="text-gray-800 pt-5 font-bold">Computer & Other Tech Repairs</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <DraftingCompassIcon />
                            <p className="text-gray-800 pt-5 font-bold">Architectural Services, Building Design, Interior Designs, etc.</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <Building2 />
                            <p className="text-gray-800 pt-5 font-bold">Engineering & Other Construction Services</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <ApertureIcon />
                            <p className="text-gray-800 pt-5 font-bold">Photography, Filming, Editing & Other Multimedia Services</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <MusicIcon />
                            <p className="text-gray-800 pt-5 font-bold">Music Production, Band Performance, Studio Rentals, etc.</p>
                        </div>
                    </Tilt>

                    <Tilt className="bg-white p-6 rounded-lg shadow-xl w-45 h-53 flex-shrink-0">
                        <div onClick={handleCardClick}>
                            <HandshakeIcon />
                            <p className="text-gray-800 pt-5 font-bold">Business Consultation, Marketing & Others</p>
                        </div>
                    </Tilt>

                </div>
            </section>
        </>
    )
}

export default Categories