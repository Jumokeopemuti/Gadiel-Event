"use client";



import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaSearch,
    FaShoppingCart,
    FaUsers
} from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";



const serviceLinks = [
    {
        name: "Core Services",
        path: "/services/core",
        image: "/show6.jpg",
    },
    {
        name: "Social Events",
        path: "/services/social-events",
        image: "/show7.jpg",
    },
    {
        name: "Corporate Events",
        path: "/services/corporate-events",
        image: "/show2.jpg",
    },
    {
        name: "Memorial & Special Gatherings",
        path: "/services/memorial",
        image: "/show3.jpg",
    },
    {
        name: "Experiential & Luxury Events",
        path: "/services/luxury-events",
        image: "/show4.jpg",
    },
];


export default function Navbar() {
    const [aboutOpen, setAboutOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
    const [navLoaded, setNavLoaded] = useState(false);

    useEffect(() => {
        setNavLoaded(true);
    }, []);





    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const router = useRouter();


    const searchRef = useRef(null);

    const handleClose = () => {
        setResults([]);
        setSearch("");

        setIsClosing(true);

        setTimeout(() => {
            setSearchOpen(false);
            setIsClosing(false);
        }, 700);
    };


    const handleMobileNav = (path) => {
        setMenuOpen(false);

        // wait for slide-out animation to finish
     

        setTimeout(() => router.push(path), 500);
    };

    const [activeService, setActiveService] = useState(0);


    const handleSearch = async (value) => {
        if (!value.trim()) {
            setResults([]);
            return;
        }

        try {
            const res = await fetch(
                `/api/search?q=${encodeURIComponent(value)}`
            );

            const data = await res.json();

            setResults([
                ...(data.events || []),
                ...(data.services || []),
                ...(data.gallery || []),
            ]);
        } catch (error) {
            console.error("Search Error:", error);
            setResults([]);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setResults([]);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);




    // Sticky on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className="sticky top-0 z-50">

            {/* ================= SEARCH OVERLAY ================= */}
            <div
                className={`
    fixed top-0 left-0 w-full h-[420px]
    bg-[#420447] z-[10000]
    transition-transform duration-700 ease-in-out
    ${searchOpen && !isClosing
                        ? "translate-y-0"
                        : "-translate-y-full"
                    }
  `}
            >
                <button
                    onClick={handleClose}
                    className={`
    absolute top-8 right-8 text-white z-50 md:text-2xl
          text-lg
    transition-transform duration-700
    ${isClosing ? "rotate-180" : "rotate-0"}
  `}
                >
                    <X size={34} strokeWidth={1.5} />
                </button>


                <div className="max-w-5xl mx-auto pt-40 px-6">
                    <div
                        ref={searchRef}
                        className="relative mt-8"
                    >

                        <div className="relative border-b border-white/20">
                            <input
                                value={search}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setSearch(value);

                                    if (value.trim()) {
                                        handleSearch(value);
                                    } else {
                                        setResults([]);
                                    }
                                }}
                                type="text"
                                placeholder="Search events, gallery, services..."
                                className="
        w-full
        bg-transparent
        text-white
        md:text-4xl
        text-xl
        pb-6
        outline-none
        placeholder:text-white/70
      "
                            />

                            <FaSearch
                                className="
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        text-white
        md:text-2xl
        text-xl
      "
                            />
                        </div>

                        {/* SEARCH RESULTS */}

                        {search.trim() && (
                            <div
                                className="
      absolute
      left-0
      right-0
      mt-4
      bg-white
      rounded-2xl
      shadow-2xl
      overflow-hidden
      max-h-[400px]
      overflow-y-auto
      z-[9999]
    "
                            >
                                {results.length > 0 ? (
                                    results.map((item) => (
                                        <div
                                            key={item._id}
                                            onClick={() => {

                                                if (item.type === "event") {
                                                    router.push("/events");
                                                }

                                                if (item.type === "gallery") {
                                                    router.push("/gallery");
                                                }

                                                if (item.type === "blog") {
                                                    router.push("/blog");
                                                }

                                                setResults([]);
                                                setSearch("");
                                                setSearchOpen(false);
                                            }}
                                            className="
            p-4
            border-b
            hover:bg-gray-50
            cursor-pointer
            transition
          "
                                        >
                                            <h3 className="font-semibold text-gray-800">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm text-gray-500 capitalize">
                                                {item.type}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-5 text-center text-gray-500">
                                        No results found
                                    </div>
                                )}
                            </div>
                        )}


                    </div>
                </div>
            </div>
            {/* ================= MOBILE MENU ================= */}
            <div
                className={`fixed top-0 right-0  left-0 bg-white z-50 shadow-lg transform transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="text-3xl">×</button>
                </div>

                <ul className="flex flex-col gap-4 my-6 p-6 text-lg font-semibold">

                    <li onClick={() => handleMobileNav("/")} className="cursor-pointer">
                        Home
                    </li>

                    <li onClick={() => handleMobileNav("/about")} className="cursor-pointer">
                        About
                    </li>


                    {/* SERVICES */}
                    <li>
                        <div
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            Services
                            <span>{mobileServicesOpen ? "−" : "+"}</span>
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-60 mt-2" : "max-h-0"
                                }`}
                        >
                            <ul className="pl-4 text-gray-600 text-sm flex flex-col gap-2">
                                <li onClick={() => router.push('/services/core')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Core Services
                                </li>

                                <li onClick={() => router.push('/services/social-events')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Social Events
                                </li>

                                <li onClick={() => router.push('/services/corporate-events')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Corporate Events
                                </li>

                                <li onClick={() => router.push('/services/memorial')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Memorial & Special Gatherings
                                </li>

                                <li onClick={() => router.push('/services/luxury-events')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Experiential & Luxury Events
                                </li>


                            </ul>
                        </div>
                    </li>

                    <li onClick={() => handleMobileNav("/blog")} className="cursor-pointer">
                        Blog
                    </li>

                    <li onClick={() => handleMobileNav("/gallery")} className="hover:text-purple-400 cursor-pointer">
                        Gallery
                    </li>

                    <li onClick={() => handleMobileNav("/contact")} className="hover:text-purple-400 cursor-pointer">
                        Contact
                    </li>
                </ul>

                <div className="flex flex-col items-start pl-4 pb-4 gap-3">

                    <button
                        onClick={() => router.push("/get-a-quote")}
                        className="px-5 py-2 border-2 border-[#572649] cursor-pointer text-xm md:text-sm xl:text-lg text-[#572649] rounded-full hover:bg-[#572649] hover:text-white transition"
                    >
                        Get a Quote
                    </button>

                    <button
                        onClick={() => router.push("/check-availability")}
                        className="px-5 py-2 bg-[#85366e] text-white cursor-pointer text-xm md:text-sm xl:text-lg rounded-full hover:opacity-90 transition"
                    >
                        Check Availability
                    </button>

                </div>
            </div>

            {/* BACKDROP */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* ================= TOP BAR ================= */}
            <div className="bg-[#4d0739] text-gray-50 flex items-center justify-between">

                <div className="mx-12 flex gap-8 items-center py-3 text-lg lg:text-sm">

                    {/* Opening Hours */}
                    <span className="flex items-center gap-2">
                        <IoIosTimer />
                        <span className="hidden lg:block">
                            Monday to Friday - 9am to 5pm / Saturdays - 10am to 4pm
                        </span>
                    </span>

                    {/* Phone */}
                    <a
                        href="tel:+2348034352800"
                        className="flex items-center gap-2 hover:text-pink-300 transition"
                    >
                        <MdWifiCalling3 />
                        <span className="hidden lg:block">
                            +2348034352800
                        </span>
                    </a>

                    {/* Location */}
                    <a
                        href="https://maps.google.com/?q=Lekki,Lagos,Nigeria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-pink-300 transition"
                    >
                        <IoLocationOutline />
                        <span className="hidden lg:block">
                            Lekki, Lagos, Nigeria
                        </span>
                    </a>

                </div>

                {/* Social Media */}

                <div className="flex gap-6 items-center mr-12 py-3 text-sm lg:text-sm">



                    <a
                        href="https://www.linkedin.com/in/olajumoke-opemuti-24b73011/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition"
                    >
                        <FaLinkedin />
                    </a>

                    <a
                        href="https://www.instagram.com/gadielevents_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="https://facebook.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition"
                    >
                        <FaFacebookF />
                    </a>

                    <a
                        href="https://x.com/yourhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition"
                    >
                        <FaXTwitter />
                    </a>

                </div>

            </div>

            {/* ================= MAIN NAV ================= */}
            <nav
                className={`bg-white text-gray-600 py-3 flex justify-between items-center shadow-sm ${isSticky ? "fixed top-0 right-0 left-0 z-40" : ""
                    }`}
            >
                <div className={`w-full h-30 mx-auto flex items-center justify-between px-6 lg:px-10
                    
                     transition-all duration-1000 ease-out
    ${navLoaded
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-16 opacity-0"
                    }
                    
                    `}>

                    {/* LOGO */}
                    <img
                        onClick={() => router.push("/")}
                        className="w-42 md:w-48 cursor-pointer"
                        src="/logo.png"
                        alt="logo"
                    />

                    {/* DESKTOP NAV */}
                    <ul className="hidden lg:flex gap-10 font-serif items-center md:base xl:text-xl font-bold text-gray-700">

                        <li onClick={() => router.push("/")} className="hover:text-purple-400 cursor-pointer">
                            Home
                        </li>

                        <li onClick={() => router.push("/about")} className="hover:text-purple-400 cursor-pointer">
                            About
                        </li>

                        {/* SERVICES DROPDOWN (RESTORED) */}
                        <li
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer hover:text-[#572649]">
                                Services
                                <FiChevronDown
                                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* DROPDOWN */}
                            <div
                                className={`absolute top-full left-0 z-50 pt-6 transition-all duration-300 ${servicesOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-4 pointer-events-none"
                                    }`}
                            >
                                <div className="w-[760px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_25px_80px_rgba(0,0,0,0.12)] flex">

                                    {/* LEFT MENU */}
                                    <ul className="w-[58%] py-4">
                                        {serviceLinks.map((item, index) => (
                                            <li
                                                key={item.name}
                                                onMouseEnter={() => setActiveService(index)}
                                                onClick={() => {
                                                    router.push(item.path);
                                                    setServicesOpen(false);
                                                }}
                                                className={`px-7 py-5 cursor-pointer transition-all duration-300 border-b border-gray-100 last:border-none hover:bg-[#faf4f8] hover:text-[#572649] hover:pl-10 ${activeService === index
                                                    ? "bg-[#faf4f8] text-[#572649] pl-10"
                                                    : ""
                                                    }`}
                                            >
                                                <h4 className="font-medium">{item.name}</h4>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* RIGHT IMAGE */}
                                    <div className="relative w-[42%] min-h-[360px] overflow-hidden">
                                        <Image
                                            src={serviceLinks[activeService].image}
                                            alt={serviceLinks[activeService].name}
                                            fill
                                            className="object-cover transition-all duration-700"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        <div className="absolute bottom-6 left-6 text-white">
                                            <p className="text-xs uppercase tracking-[4px] mb-2">
                                                Premium Events
                                            </p>
                                            <h3 className="text-2xl font-semibold">
                                                {serviceLinks[activeService].name}
                                            </h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </li>

                        <li onClick={() => router.push("/blog")} className="hover:text-purple-400 cursor-pointer">
                            Blog
                        </li>

                        <li onClick={() => router.push("/gallery")} className="hover:text-purple-400 cursor-pointer">
                            Gallery
                        </li>

                        <li onClick={() => router.push("/contact")} className="hover:text-purple-400 cursor-pointer">
                            Contact
                        </li>

                    </ul>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4 lg:gap-6">

                        {/* SEARCH */}
                        <FaSearch
                            onClick={() => setSearchOpen(true)}
                            className="cursor-pointer text-lg md:text-xl"
                        />

                        {/* CTA BUTTONS */}
                        <div className="hidden md:flex items-center gap-3">

                            <button
                                onClick={() => router.push("/get-a-quote")}
                                className="px-5 py-2 border-2 border-[#572649] cursor-pointer text-xm md:text-sm xl:text-lg text-[#572649] rounded-full hover:bg-[#572649] hover:text-white transition"
                            >
                                Get a Quote
                            </button>

                            <button
                                onClick={() => router.push("/check-availability")}
                                className="px-5 py-2 bg-[#85366e] text-white cursor-pointer text-xm md:text-sm xl:text-lg rounded-full hover:opacity-90 transition"
                            >
                                Check Availability
                            </button>

                        </div>

                        {/* MOBILE MENU */}
                        <div
                            onClick={() => setMenuOpen(true)}
                            className="lg:hidden cursor-pointer text-2xl"
                        >
                            ☰
                        </div>

                    </div>

                </div>
            </nav>

        </header>
    )
}