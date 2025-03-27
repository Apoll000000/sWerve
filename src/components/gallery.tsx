import React, { useState } from "react";

const images = [
    "https://schoolforfreelancers.com/wp-content/uploads/2023/10/young-woman-freelancer-working-in-a-coffeehouse-u-2023-06-07-17-57-09-utc.jpg",
    "https://cdn.papershift.com/20220808070712/freelancing-work-and-its-statutory-laws-and-regulations-in-the-UK-explained-by-Papershift-min-910x500.jpeg",
    "https://img.freepik.com/free-vector/freelancer-concept-illustration_114360-7590.jpg",
    "https://smartblogger.com/wp-content/uploads/2020/07/freelance-writing-niches.jpg",
    "https://smallbiztechnology.com/wp-content/uploads/2019/01/freelancer.jpeg",
    "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,h_128,dpr_3/https://assets.app.engoo.com/images/1ejRYY8i2K7I3VAtaJKbWm.jpeg",
    "https://wethrive.net/wp-content/uploads/2021/03/Professional-Development-1-683x1024-1.jpeg",
    "https://www.designsociety.org/multimedia/183da8af15aa750dd678cfa481eac34c1556811489.jpg",
    "https://www.umassglobal.edu/-/media/images/17-blog-images/collegis-blog-images/workplace-professionalism_blog-thumb.jpg",
    "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/007/953/839/small/silhouettegrapher-woman-in-the-sunset-photo.jpg",
    "https://media.istockphoto.com/id/1058265804/photo/female-photographer.jpg?s=612x612&w=0&k=20&c=Ct4oCyf05He6jUxbU-Qvb2Sn9TKEGUaTsYmtTTjl-Nw=",
    "https://www.adorama.com/alc/wp-content/uploads/2018/08/shutterstock_442098151.jpg",
    "https://blog.bpmmusic.io/wp-content/uploads/2022/09/erwi-rt8nASaIQZA-unsplash-1024x683.jpg",
    "https://www.swipedon.com/hubfs/4%20Ways%20to%20Improve%20Construction%20Site%20Safety.jpeg",
    "https://hssphilippines.com/wp-content/uploads/2024/01/Construction-Site-Safety-1920p.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVby05P5ivSgfO9jB3PMQOGBMARooZXGf2A&s",
    "https://admin.12grids.com/uploads/blogs/original_cover_images/Webp/Top_11_Web_Development_Technologies_You_Must_Know_In_2024_12Grids-compressed.webp",
    "https://blog.openclassrooms.com/en/wp-content/uploads/sites/4/2018/03/web-develoment.jpg",
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="p-5 xl:pl-50 xl:pr-50">
            <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[600] leading-none">Made on sWerve</h1>
            {/* Masonry Grid Layout */}
            <div className="columns-3 md:columns-4 gap-4 pt-5">
                {images.map((src, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg mb-4 cursor-pointer">
                        <img
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                            onClick={() => setSelectedImage(src)}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Enlarged"
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
                    />
                </div>
            )}
        </section>
    );
};

export default Gallery;
