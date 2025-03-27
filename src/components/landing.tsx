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

function Landingpage() {
    return (
        <>
            <section className="hero max-sm:pt-15 sm:pt-15 lg:pt-17 lg:pl-4 lg:pr-4">
                <Carousel />
            </section>
            <Categories/>
            <Popular />
            <Pro />
            <Tour />
            <Happen />
            <Gallery />
            <Fingertips />
        </>
    )
}

export default Landingpage