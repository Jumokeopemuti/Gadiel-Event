"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";






const categories = [
  "All",
  "Weddings",
  "Birthday",
  "Burials & Memorial",
  "Corporate Events",
];



const galleryEvents = [
  {
    id: 1,
    category: "Birthday",
    title: "Mrs Victoria Abosede Oloruntegbe",
    coverImage: "/birth1.jpg",

    images: [
      "/birth1.jpg",
      "/bigHero.jpg",
      "/gal1.jpg",
      "/gal2.jpg",
      "/hero6.jpg",
      "/hero7.jpg",
      "/hero8.jpg",
    ],
  },

  {
    id: 2,
    category: "Burials & Memorial",
    title: "Mrs Akisanya Burial",
    coverImage: "/gpic1.jpg",

    images: [
      "/gpic1.jpg",
      "/gpic2.jpg",
      "/akin1.jpg",
      "/akin2.jpg",
      "/akin3.jpg",

    ],
  },

  {
    id: 3,
    category: "Weddings",
    title: "Luxury Wedding",
    coverImage: "/show7.jpg",

    images: [
      "/show7.jpg",
      "/show10.webp",
      "/show5.jpg",
      "/show6.jpg",
    ],
  },

  {
    id: 4,
    category: "Corporate Events",
    title: "Cecelia's Tehillah",
    coverImage: "/birthday.jpg",

    images: [
      "/cel8.jpg",
      "/cel1.jpg",
      "/cel2.jpg",
      "/cel3.jpg",
      "/cel4.jpg",
      "/cel5.jpg",
      "/cel6.jpg",

    ],
  },
];

export default function GalleryPage() {


  const [active, setActive] = useState("All");
  const [currentImage, setCurrentImage] = useState(0);


  const [dbImages, setDbImages] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const closeEvent = () => setSelectedEvent(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);




  const groupedDbEvents = useMemo(() => {
    return Object.values(
      dbImages.reduce((acc, item) => {
        const key = item.title;

        if (!acc[key]) {
          acc[key] = {
            id: item._id || key,
            title: item.title,
            category: item.category,
            coverImage: item.imageUrl,
            images: [],
          };
        }

        acc[key].images.push(item.imageUrl || "/fallback.jpg");

        return acc;
      }, {})
    );
  }, [dbImages]);


  const allEvents = useMemo(() => {
    return [...galleryEvents, ...groupedDbEvents];
  }, [groupedDbEvents]);;


  useEffect(() => {
    fetchGallery();
  }, []);


  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();

      setDbImages(data);
    } catch (error) {
      console.error(error);
    }
  };


  const nextImage = () => {
    if (!selectedEvent) return;

    setCurrentImage((prev) =>
      prev === selectedEvent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedEvent) return;

    setCurrentImage((prev) =>
      prev === 0 ? selectedEvent.images.length - 1 : prev - 1
    );
  };




  const filtered =
    active === "All"
      ? allEvents
      : allEvents.filter((event) => event.category === active);

  // SAFE COVER IMAGE
  const getCover = (event) =>
    event.coverImage || event.images?.[0] || "/fallback.jpg";

  const openEvent = (event) => {
    if (!event?.images?.length) return;

    setCurrentImage(0);
    setSelectedEvent(event);
  };
  return (

    <section className="bg-[#f7f4f1] min-h-screen py-24">


      <div className="max-w-[1450px] mx-auto px-6">


        {/* HEADER */}

        <div className="text-center mb-20">


          <p className="
uppercase
tracking-[4px]
text-xs
text-[#8b6c58]
mb-6
">

            Portfolio Gallery

          </p>


          <h1 className="
font-serif
text-[#231b1c]
text-5xl
md:text-7xl
mb-12
">

            Captured Event Moments

          </h1>



          <div className="
flex
flex-wrap
justify-center
gap-4
">


            {categories.map((cat) => (


              <button

                key={cat}

                onClick={() => setActive(cat)}

                className={`

px-7
py-3
rounded-full
transition-all
duration-500


${active === cat

                    ? "bg-[#231b1c] text-white"

                    : "bg-[#ece4dc] text-[#231b1c] hover:bg-[#231b1c] hover:text-white"

                  }

`}

              >

                {cat}

              </button>


            ))}


          </div>


        </div>





        {/* FEATURE IMAGE */}

        {filtered.length > 0 && (


          <div className="
grid
lg:grid-cols-2
gap-8
mb-16
">


            <motion.div
              onClick={() => openEvent(filtered[0])}
              className="relative h-[700px] overflow-hidden rounded-2xl cursor-pointer group"
            >
              <Image
                src={getCover(filtered[0])}
                alt={filtered[0].title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />



              <div className="
absolute
inset-0
bg-black/30
"/>


              <div className="
absolute
bottom-8
left-8
z-10
">


                <p className="
text-white/70
uppercase
tracking-[3px]
text-xs
mb-2
">

                  {filtered[0].category}

                </p>



                <h2 className="
text-white
font-serif
text-4xl
">

                  {filtered[0].title}

                </h2>


              </div>


            </motion.div>





            <div className="
grid
grid-cols-2
gap-8
h-[700px]
">


              {filtered.slice(1, 5).map((item) => (


                <GalleryCard
                  key={item.id}
                  item={item}
                  setSelectedEvent={openEvent}
                />

              ))}


            </div>



          </div>


        )}







        {/* MASONRY */}

        <div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
auto-rows-[250px]
">


          {filtered.slice(5).map((item, index) => (


            <div
              key={item.id}
              onClick={() => openEvent(item)}
              className={`relative overflow-hidden cursor-pointer group rounded-2xl ${index % 4 === 0
                ? "row-span-3"
                : index % 3 === 0
                  ? "row-span-2"
                  : "row-span-1"
                }`}
            >

              <Image
                src={getCover(item)}

                alt={item.title}

                fill

                className="
object-cover
transition duration-700
group-hover:scale-110
"

              />



              <div className="
absolute
inset-0
bg-black/25
"/>



              <div className="
absolute
bottom-8
left-8
z-10
">


                <p className="
text-white/70
uppercase
tracking-[3px]
text-xs
mb-2
">

                  {item.category}

                </p>



                <h3 className="
text-white
font-serif
text-3xl
">

                  {item.title}

                </h3>


              </div>


            </div>


          ))}


        </div>



      </div>







      {/* LIGHTBOX */}

      <AnimatePresence>


        {selectedEvent && (


          <div
            onClick={closeEvent}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          >

            <button
              onClick={closeEvent}
              className="absolute top-8 right-8 text-white z-50"
            >
              <X size={40} />
            </button>
            <div className="absolute top-8 left-8 z-20">
              <p className="text-white/60 text-sm uppercase tracking-[4px]">
                {selectedEvent.category}
              </p>

              <h2 className="text-white text-3xl md:text-5xl font-serif mt-2">
                {selectedEvent.title}
              </h2>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="
    flex-1
    flex
    items-center
    justify-center
    px-10
  "
            >
              <div
  className="
    relative
    w-[95vw]
    max-w-[1500px]
    aspect-[16/9]
    mx-auto
    overflow-hidden
    rounded-2xl
    bg-black
  "
>
  <Image
    src={selectedEvent.images[currentImage]}
    alt={selectedEvent.title}
    fill
    className="object-cover"
  />

                {/* LEFT BUTTON */}
                <button
                  onClick={prevImage}
                  className="
    absolute
    -left-1
    top-1/2
    -translate-y-1/2
    z-30
    w-16
    h-16
    rounded-full
    bg-white/10
    backdrop-blur-md
    text-white
    flex
    items-center
    justify-center
  "
                >
                  <ChevronLeft size={36} />
                </button>

                <button
                  onClick={nextImage}
                  className="
    absolute
    -right-1
    top-1/2
    -translate-y-1/2
    z-30
    w-16
    h-16
    rounded-full
    bg-white/10
    backdrop-blur-md
    text-white
    flex
    items-center
    justify-center
  "
                >
                  <ChevronRight size={36} />
                </button>

                {/* COUNTER */}
                <div className="absolute bottom-6 right-6 z-20">
                  <span className="bg-black/60 text-white px-4 py-2 rounded-full">
                    {currentImage + 1} / {selectedEvent.images.length}
                  </span>
                </div>
              </div>
            </div>


          </div>


        )}


      </AnimatePresence>



    </section>

  );

}







function GalleryCard({ item, setSelectedEvent }) {


  return (


    <div

      onClick={() => setSelectedEvent(item)}

      className="
relative
w-full
h-full
overflow-hidden
rounded-2xl
cursor-pointer
group
"


    >

      <div className="absolute top-4 right-4 z-10">
        <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">
          {item.images?.length || 1} Photos
        </span>
      </div>


      <Image
        src={item.coverImage}

        alt={item.title}

        fill

        className="
object-cover
transition duration-700
group-hover:scale-110
"

      />



      <div className="
absolute
inset-0
bg-black/30
"/>



      <div className="
absolute
bottom-6
left-6
z-10
">


        <p className="
text-white/70
uppercase
tracking-[3px]
text-xs
">

          {item.category}

        </p>



        <h3 className="
text-white
font-serif
text-2xl
">

          {item.title}

        </h3>


      </div>


    </div>


  );

}

