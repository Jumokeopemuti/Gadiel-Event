"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


const categories = [
  "All",
  "Weddings",
  "Birthday",
  "Burials & Memorial",
  "Corporate Events",
];



const hardcodedImages  = [
    { id: 1, category: "Weddings", image: "/show7.jpg", title: "Luxury Wedding" },
    { id: 2, category: "Corporate Events", image: "/retreat.jpg", title: "Corporate Connect Event" },
    { id: 3, category: "Burials & Memorial", image: "/gpic1.jpg", title: "Mrs Akisanya burial" },
    { id: 4, category: "Weddings", image: "/show10.webp", title: "Wedding Styling" },
    { id: 5, category: "Burials & Memorial", image: "/gpic2.jpg", title: "Mrs Akisanya burial" },
    { id: 6, category: "Birthday", image: "/birth1.jpg", title: "Mrs Oloruntgbe Birthday Celebration" },
    { id: 7, category: "Corporate Events", image: "/conf.jpg", title: "Corporate Gala" },
    { id: 8, category: "Birthday", image: "/gal1.jpg", title: "Mrs Oloruntgbe Birthday Celebration" },
    { id: 9, category: "Birthday", image: "/gal2.jpg", title: "Mrs Oloruntgbe Birthday Celebration" },
    { id: 10, category: "Burials & Memorial", image: "/memo1.jpg", title: "Mrs Akisanya burial" },
];

export default function GalleryPage() {


  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const [dbImages, setDbImages] = useState([]);

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




const databaseImages = dbImages.map((item) => ({
  id: item._id,
  category: item.category,
  image: item.imageUrl,
  title: item.title,
}));


const allImages = [
  ...hardcodedImages,
  ...databaseImages,
];

 const filtered =
  active === "All"
    ? allImages
    : allImages.filter(
        (item) => item.category === active
      );


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


{categories.map((cat)=>(


<button

key={cat}

onClick={()=>setActive(cat)}

className={`

px-7
py-3
rounded-full
transition-all
duration-500


${
active === cat

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

onClick={()=>setSelected(filtered[0])}

className="
relative
h-[700px]
overflow-hidden
rounded-2xl
cursor-pointer
group
"


>


<Image

src={filtered[0].image}

alt={filtered[0].title}

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


{filtered.slice(1,5).map((item)=>(


<GalleryCard

key={item.id}

item={item}

setSelected={setSelected}

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


{filtered.slice(5).map((item,index)=>(


<div

key={item.id}

onClick={()=>setSelected(item)}

className={`

relative
overflow-hidden
cursor-pointer
group
rounded-2xl


${
index % 4 === 0
? "row-span-3"
: index % 3 === 0
? "row-span-2"
: "row-span-1"

}

`}

>


<Image

src={item.image}

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


{selected && (


<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

exit={{opacity:0}}

className="
fixed
inset-0
z-50
bg-black/90
flex
items-center
justify-center
p-8
"


>


<button

onClick={()=>setSelected(null)}

className="
absolute
top-8
right-8
text-white
"

>

<X size={40}/>

</button>



<div className="
relative
w-full
max-w-[1200px]
h-[85vh]
">


<Image

src={selected.image}

alt={selected.title}

fill

className="
object-contain
"

/>


</div>


</motion.div>


)}


</AnimatePresence>



</section>

);

}







function GalleryCard({ item, setSelected }) {


return (


<div

onClick={()=>setSelected(item)}

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


<Image

src={item.image}

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

