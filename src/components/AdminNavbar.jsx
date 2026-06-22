"use client";

import { useEffect, useState } from "react";

import {
    Bell,
    ChevronDown,
    Search,
    CheckCircle,
    User,
    Settings,
    LifeBuoy,
    LogOut,
} from "lucide-react";
import Link from "next/link";

export default function AdminNavbar() {

    const [admin, setAdmin] = useState(null);

    const [user, setUser] = useState(null);

    const [open, setOpen] = useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const [notifications, setNotifications] =
        useState([]);





    useEffect(() => {
        fetchNotifications();

        const savedProfile =
            localStorage.getItem("adminProfile");

        if (savedProfile) {
            setAdmin(JSON.parse(savedProfile));
        }

        fetchAdminProfile();

        const adminAuth = JSON.parse(
            localStorage.getItem("adminAuth")
        );

        setUser(adminAuth);

        const interval = setInterval(
            fetchNotifications,
            10000
        );

        return () => clearInterval(interval);
    }, []);



    useEffect(() => {
        const updateProfile = () => {
            const profile = JSON.parse(
                localStorage.getItem("adminProfile")
            );

            if (profile) {
                setAdmin(profile);
            }
        };

        window.addEventListener(
            "profileUpdated",
            updateProfile
        );

        return () =>
            window.removeEventListener(
                "profileUpdated",
                updateProfile
            );
    }, []);


    useEffect(() => {
        fetchAdminProfile();

        const interval = setInterval(() => {
            fetchAdminProfile();
        }, 3000);

        return () => clearInterval(interval);
    }, []);



    const fetchAdminProfile = async () => {
        try {
            const res = await fetch(
                "/api/admin/profile"
            );

            const data = await res.json();

            setAdmin(data);

            localStorage.setItem(
                "adminProfile",
                JSON.stringify(data)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            const data = await res.json();

            //  FORCE ARRAY SAFETY
            const safeData = Array.isArray(data)
                ? data
                : data?.notifications || data?.data || [];

            setNotifications(safeData);
        } catch (err) {
            console.error(err);
            setNotifications([]); // fallback
        }
    };

    const unreadCount = Array.isArray(notifications)
        ? notifications.filter((n) => !n.read).length
        : 0;

    const markAsRead = async (id) => {
        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === id ? { ...n, read: true } : n
                )
            );
        } catch (err) {
            console.error(err);
        }
    };



    const markAllRead = async () => {
        try {
            await fetch(
                "/api/notifications/read-all",
                {
                    method: "PATCH",
                }
            );

            setNotifications((prev) =>
                prev.map((n) => ({
                    ...n,
                    read: true,
                }))
            );
        } catch (err) {
            console.error(err);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem(
            "adminAuth"
        );

        localStorage.removeItem(
            "adminToken"
        );

        localStorage.removeItem(
            "adminProfile"
        );

        window.location.href =
            "/admin/login";
    };








    return (

        <header
            className="
        relative
        bg-white
        border-b
        border-gray-200
        h-[75px]
        px-8
        flex
        items-center
        justify-between
      "
        >

            {/* LEFT */}

            <h2 className="
        text-lg
        font-medium
        text-gray-700
      ">

                Welcome

                <span className="
          ml-1
          font-bold
          text-black
        ">
                    {admin?.name || "Admin"}
                </span>

                👋

            </h2>

            {/* RIGHT */}

            <div className="
        flex
        items-center
        gap-5
      ">

                {/* SEARCH */}

                <div className="
          relative
          hidden
          md:block
        ">

                    <Search
                        size={18}
                        className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
              w-[260px]
              bg-gray-50
              border
              rounded-full
              pl-11
              pr-4
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-[#572649]
            "
                    />

                </div>

                {/* NOTIFICATIONS */}

                <div className="relative">

                    <button
                        onClick={() => {
                            setOpen(!open);
                            setProfileOpen(false);
                        }}
                        className="
              relative
              w-10
              h-10
              rounded-full
              border
              flex
              items-center
              justify-center
              hover:bg-gray-100
            "
                    >

                        <Bell size={18} />

                        {unreadCount > 0 && (

                            <span className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-[10px]
                px-1.5
                py-[2px]
                rounded-full
              ">

                                {unreadCount}

                            </span>

                        )}

                    </button>

                    {open && (

                        <div className="
              absolute
              right-0
              mt-4
              w-[360px]
              bg-white
              rounded-2xl
              shadow-2xl
              border
              border-gray-200
              overflow-hidden
              z-50
            ">

                            <div
                                className="
    p-5
    border-b
    border-gray-200
    flex
    justify-between
    items-center
  "
                            >
                                <div>
                                    <h3 className="font-bold text-lg">
                                        Notifications
                                    </h3>

                                    <span className="text-sm text-gray-500">
                                        {unreadCount} unread
                                    </span>
                                </div>

                                <button
                                    onClick={markAllRead}
                                    className="
      text-sm
      text-[#572649]
      hover:underline
    "
                                >
                                    Mark all read
                                </button>
                            </div>

                            <div className="
                max-h-[400px]
                overflow-y-auto
              ">

                                {notifications.length === 0 ? (
                                    <div className="p-5 text-center text-gray-500">
                                        No notifications
                                    </div>
                                ) : (
                                    notifications.map((item) => (

                                        <div
                                            key={item._id}
                                            className={`
                      p-5
                      border-b
                      border-gray-200
                      transition

                      ${!item.read
                                                    ? "bg-purple-50"
                                                    : "bg-white"
                                                }
                    `}
                                        >

                                            <div className="
                      flex
                      justify-between
                    ">

                                                <div>

                                                    <h4 className="
                          font-semibold
                        ">
                                                        {item.title}
                                                    </h4>

                                                    <p className="
                          text-sm
                          text-gray-500
                          mt-1
                        ">
                                                        {item.message}
                                                    </p>

                                                </div>

                                                {!item.read && (

                                                    <button
                                                        onClick={() =>
                                                            markAsRead(
                                                                item._id
                                                            )
                                                        }
                                                    >

                                                        <CheckCircle
                                                            size={18}
                                                            className="
                              text-green-600
                            "
                                                        />

                                                    </button>

                                                )}

                                            </div>

                                        </div>

                                    ))
                                )}

                            </div>

                        </div>

                    )}

                </div>

                {/* PROFILE */}

                <div className="relative">

                    <button
                        onClick={() => {
                            setProfileOpen(
                                !profileOpen
                            );
                            setOpen(false);
                        }}
                        className="
              flex
              items-center
              gap-3
              cursor-pointer
            "
                    >

                        <img
                            src={admin?.image || "/avatar1.png"}
                            alt={admin?.name || "Admin"}
                            className="
    w-10
    h-10
    rounded-full
    border
    border-gray-200
    object-cover
  "
                        />
                        <div className="
              hidden
              md:flex
              items-center
              gap-2
            ">

                            <span className="
  font-semibold
  text-gray-700
">
                                {admin?.name || "Admin"}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`
                  transition
                  ${profileOpen
                                        ? "rotate-180"
                                        : ""
                                    }
                `}
                            />

                        </div>

                    </button>

                    {/* PROFILE DROPDOWN */}

                    {profileOpen && (

                        <div className="
              absolute
              right-0
              mt-4
              w-[260px]
              bg-white
              rounded-2xl
              border
              border-gray-200
              shadow-2xl
              overflow-hidden
              z-50
            ">

                            <div className="
                p-5
                border-b
                border-gray-200
              ">

                                <h3 className="font-bold">
                                    {admin?.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {admin?.email}
                                </p>

                            </div>

                            <div className="py-2">
                                <Link href="/admin/profile">
                                    <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
                                        <User size={18} />
                                        My Profile
                                    </button>
                                </Link>

                                <Link href="/admin/clients">
                                    <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
                                        <User size={18} />
                                        Clients
                                    </button>
                                </Link>

                                {admin?.email === "jumoke.fwa@gmail.com" && (
                                    <>
                                        

                                        <Link href="/admin/login-logs">
                                            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
                                                <User size={18} />
                                                Login Captures
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="
                border-t
                border-gray-200
                p-2
              ">

                                <button
                                    onClick={handleLogout}
                                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-red-600
                    hover:bg-red-50
                  "
                                >

                                    <LogOut size={18} />

                                    Logout

                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}