import { Button } from "./ui/button"
import { Link } from "react-router-dom"

function Fingertips() {
    return (
        <section className="fingertips p-5 xl:pl-50 xl:pr-50 w-full">
            <div className="flex h-[50vw] md:h-[300px] flex-col justify-center items-center bg-[#106378] w-full p-8 lg:pl-15 lg:pr-15 rounded-3xl">
                <h1 className="text-center text-3xl sm:text-5xl lg:text-6xl leading-none font-[600] text-white">Everything you need are all within your
                    <span className="text-[#7EFE34]"> fingertips</span>
                </h1>
                <Link to='/general'>
                    <Button className="text-black font-[700] mt-5 bg-[#28FECC] hover:bg-[#1FCAA2] cursor-pointer">Explore sWerve</Button>
                </Link>

            </div>

        </section>
    )
}

export default Fingertips