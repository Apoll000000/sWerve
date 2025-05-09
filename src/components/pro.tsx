import { BadgeCheck } from "lucide-react"


function Pro() {
    return (
        <>
            <section className="pro p-5 xl:pl-50 xl:pr-50 mt-10">
                <div className="lg:flex md:flex md:items-center bg-[#acf3e5] w-full p-8 lg:pl-15 lg:pr-15 rounded-3xl">
                    <div className="pro-writings w-full md:w-[60%]">
                        <img src="./sWerve Temp Logo.png" alt="LOGO" className="logo w-[100px] h-[100px]" />
                        <h1 className="text-4xl lg:text-[3vw] leading-none font-[700]">The <span className="text-green-800">premium service</span> solution for hiring freelancers and bagging clients</h1>
                        <div className="adv p-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div className="con pt-2">
                                <BadgeCheck />
                                <h3 className="text-xl font-bold leading-none pt-1">Being Top Priority Among Others</h3>
                                <p className="leading-none pt-1 font-[600] ">Whether you are looking for clients or want to avail a service, pro sWervers are always on the VIP</p>
                            </div>

                            <div className="con pt-2">
                                <BadgeCheck />
                                <h3 className="text-xl font-bold leading-none pt-1">Being Top Priority Among Others</h3>
                                <p className="leading-none pt-1 font-[600] ">Whether you are looking for clients or want to avail a service, pro sWervers are always on the VIP</p>
                            </div>

                            <div className="con pt-2">
                                <BadgeCheck />
                                <h3 className="text-xl font-bold leading-none pt-1">Being Top Priority Among Others</h3>
                                <p className="leading-none pt-1 font-[600] ">Whether you are looking for clients or want to avail a service, pro sWervers are always on the VIP</p>
                            </div>

                            <div className="con pt-2">
                                <BadgeCheck />
                                <h3 className="text-xl font-bold leading-none pt-1">Being Top Priority Among Others</h3>
                                <p className="leading-none pt-1 font-[600] ">Whether you are looking for clients or want to avail a service, pro sWervers are always on the VIP</p>
                            </div>
                        </div>
                    </div>
                    <img className="w-full md:w-[40%]" src="./sales.png" alt="sWerve image" />
                </div>
            </section>
        </>
    )
}

export default Pro