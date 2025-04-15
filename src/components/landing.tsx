import * as React from "react"
import '../styles/Landing.css'
import Carousel from "./ui/carouselCustom"
import Categories from "./categories"
import Popular from "./popular"
import Pro from "./pro"
import Tour from "./tour"
import Happen from "./happen"
import Gallery from "./gallery"
import Fingertips from "./fingertips"
import { Separator } from "@/components/ui/separator"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  GithubIcon
} from "lucide-react"

function Landingpage() {
    return (
        <>
            <section className="hero max-sm:pt-15 sm:pt-15 lg:pt-17 lg:pl-4 lg:pr-4">
                <Carousel />
            </section>
            <Categories />
            <Popular />
            <Pro />
            <Tour />
            <Happen />
            <Gallery />
            <Fingertips />
            <footer className="bg-white w-full px-8">
                <Separator />
                <div className="w-full flex flex-col items-center gap-4 md:flex-row md:justify-between py-8 text-[#8c8c8c] text-lg">
                    <p className="">Ⓒ sWerve Philippines. 2025</p>
                    <div className="socials flex gap-5">
                        <FacebookIcon className='cursor-pointer' color="#8c8c8c" />
                        <InstagramIcon className='cursor-pointer' color="#8c8c8c" />
                        <XIcon className='cursor-pointer' color="#8c8c8c" />
                        <LinkedinIcon className='cursor-pointer' color="#8c8c8c" />
                        <GithubIcon className='cursor-pointer' color="#8c8c8c" />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Landingpage