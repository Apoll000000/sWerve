

function Tour() {


    return (
        <section className="tour p-5 xl:pl-50 xl:pr-50">
            <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[600] leading-none">Take a quick tour on how sWerve operates</h1>
            <p className="text-gray-500 pt-1 font-[500] text-lg">Know how to play the game and get on that success ladder!</p>
            <iframe
                className="w-full h-[50vw] lg:h-[35vw] rounded-lg shadow-lg mt-3"
                src="https://www.youtube.com/embed/H79HitjAB2k"
                title="How To Create A Freelancing Profile - Full Guide!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </section>
    )
}

export default Tour