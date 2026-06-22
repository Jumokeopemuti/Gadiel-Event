"use client";

import { useEffect, useState } from "react";

import {
    User,
    Mail,
    Phone,
    Shield,
    Camera,
    Save,
} from "lucide-react";

export default function AdminProfilePage() {

    const [profile, setProfile] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // LOAD PROFILE
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/admin/profile");

            if (!res.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await res.json();

            localStorage.setItem(
                "adminProfile",
                JSON.stringify(data)
            );

            setProfile(data);

        } catch (error) {
            console.error(
                "Fetch Profile Error:",
                error
            );
        }
    };



    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        setProfile((prev) => ({
            ...prev,
            image: URL.createObjectURL(file),
        }));
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();

            formData.append("name", profile.name);
            formData.append("email", profile.email);
            formData.append("phone", profile.phone);
            formData.append("role", profile.role);
            formData.append("bio", profile.bio);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await fetch(
                "/api/admin/profile",
                {
                    method: "PUT",
                    body: formData,
                }
            );

            if (res.ok) {
                const updatedAdmin = await res.json();

                localStorage.setItem(
                    "adminProfile",
                    JSON.stringify(updatedAdmin)
                );

                window.dispatchEvent(
                    new Event("profileUpdated")
                );

                alert("Profile updated successfully");
            }

            const updatedAdmin =
                await res.json();

            localStorage.setItem(
                "adminProfile",
                JSON.stringify(updatedAdmin)
            );

            setProfile(updatedAdmin);

            alert(
                "Profile updated successfully"
            );

        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };


    if (!profile) return <p>Loading...</p>;

    return (

        <div className="
      max-w-7xl
      mx-auto
      space-y-8
    ">

            {/* HEADER */}

            <div>

                <h1 className="
          text-3xl
          font-bold
          text-gray-900
        ">
                    My Profile
                </h1>

                <p className="
          text-gray-500
          mt-2
        ">
                    Manage your admin account.
                </p>

            </div>

            {/* CARD */}

            <div className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        overflow-hidden
      ">

                {/* TOP */}

                <div className="
          h-40
          bg-gradient-to-r
          from-[#572649]
          to-[#7b3f68]
        " />

                <div className="
          px-8
          pb-8
        ">

                    {/* AVATAR */}

                    <div className="
            -mt-16
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-6
          ">

                        <div className="
              flex
              items-center
              gap-5
            ">

                            <div className="relative">

                                <img
                                    src={profile?.image || "/avatar1.png"}
                                    alt="profile"
                                    className="w-32 h-32 rounded-full border-[6px] border-white object-cover shadow-lg"
                                />

                                {/* IMAGE UPLOAD */}
                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImage}
                                />

                                <label
                                    htmlFor="profile-image"
                                    className="
      absolute
      bottom-2
      right-2
      bg-[#572649]
      text-white
      p-2
      rounded-full
      cursor-pointer
    "
                                >
                                    <Camera size={16} />
                                </label>


                            </div>

                            <div className="-mt-6">

                                <h2 className="
                  text-2xl
                  font-bold
                  text-white
                  mb-3
                ">
                                    {profile.name}
                                </h2>

                                <p className="
                  text-gray-500
                ">
                                    {profile.email}
                                </p>

                            </div>

                        </div>

                        <button

                            onClick={handleSave}

                            className="
                flex
                items-center
                gap-2
                bg-[#572649]
                text-white
                px-6
                py-3
                rounded-xl
                hover:opacity-90
              "
                        >

                            <Save size={18} />

                            Save Changes

                        </button>

                    </div>

                    {/* FORM */}

                    <div className="
            grid
            md:grid-cols-2
            gap-6
            mt-10
          ">

                        {/* NAME */}

                        <div>

                            <label className="
                text-sm
                font-medium
                text-gray-600
              ">
                                Full Name
                            </label>

                            <div className="
                relative
                mt-2
              ">

                                <User
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
                                    name="name"
                                    value={profile.name}
                                    onChange={
                                        handleChange
                                    }
                                    className="
                    w-full
                    border
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#572649]
                  "
                                />

                            </div>

                        </div>

                        {/* EMAIL */}

                        <div>

                            <label className="
                text-sm
                font-medium
                text-gray-600
              ">
                                Email Address
                            </label>

                            <div className="
                relative
                mt-2
              ">

                                <Mail
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
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={
                                        handleChange
                                    }
                                    className="
                    w-full
                    border
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#572649]
                  "
                                />

                            </div>

                        </div>

                        {/* PHONE */}

                        <div>

                            <label className="
                text-sm
                font-medium
                text-gray-600
              ">
                                Phone Number
                            </label>

                            <div className="
                relative
                mt-2
              ">

                                <Phone
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
                                    name="phone"
                                    value={profile.phone}
                                    onChange={
                                        handleChange
                                    }
                                    className="
                    w-full
                    border
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#572649]
                  "
                                />

                            </div>

                        </div>

                        {/* ROLE */}

                        <div>

                            <label className="
                text-sm
                font-medium
                text-gray-600
              ">
                                Role
                            </label>

                            <div className="
                relative
                mt-2
              ">

                                <Shield
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
                                    name="role"
                                    value={profile.role}
                                    onChange={
                                        handleChange
                                    }
                                    className="
                    w-full
                    border
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#572649]
                  "
                                />

                            </div>

                        </div>

                    </div>

                    {/* BIO */}

                    <div className="mt-8">

                        <label className="
              text-sm
              font-medium
              text-gray-600
            ">
                            About / Bio
                        </label>

                        <textarea
                            rows="5"
                            name="bio"
                            value={profile.bio}
                            onChange={
                                handleChange
                            }
                            className="
                w-full
                mt-2
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-[#572649]
              "
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}