"use client";

import { useState } from "react";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe,
    Save,
} from "lucide-react";

export default function SettingsPage() {

    const [settings, setSettings] = useState({
        businessName: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        instagram: "",
    });

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(settings);

        alert("Settings saved.");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Website Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your business information.
                    </p>
                </div>

                {/* Card */}

                <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">

                    <div className="border-b p-6">

                        <h2 className="text-xl font-semibold">
                            Business Information
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Update company details used across your website.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="p-6 grid md:grid-cols-2 gap-6"
                    >

                        {/* Business Name */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Business Name
                            </label>

                            <div className="relative">

                                <Building2
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
                                    name="businessName"
                                    value={settings.businessName}
                                    onChange={handleChange}
                                    placeholder="Luxury Events"
                                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                                />

                            </div>

                        </div>

                        {/* Email */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Contact Email
                            </label>

                            <div className="relative">

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
                                    value={settings.email}
                                    onChange={handleChange}
                                    placeholder="hello@events.com"
                                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                                />

                            </div>

                        </div>

                        {/* Phone */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Phone Number
                            </label>

                            <div className="relative">

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
                                    value={settings.phone}
                                    onChange={handleChange}
                                    placeholder="+234 800 000 0000"
                                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                                />

                            </div>

                        </div>

                        {/* Website */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Website
                            </label>

                            <div className="relative">

                                <Globe
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
                                    name="website"
                                    value={settings.website}
                                    onChange={handleChange}
                                    placeholder="www.events.com"
                                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                                />

                            </div>

                        </div>

                        {/* Address */}

                        <div className="md:col-span-2">

                            <label className="block mb-2 text-sm font-medium">
                                Address
                            </label>

                            <div className="relative">

                                <MapPin
                                    size={18}
                                    className="
                    absolute
                    left-4
                    top-5
                    text-gray-400
                  "
                                />

                                <textarea
                                    rows="4"
                                    name="address"
                                    value={settings.address}
                                    onChange={handleChange}
                                    placeholder="Business address..."
                                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    focus:ring-2
                    focus:ring-black
                    outline-none
                    resize-none
                  "
                                />

                            </div>

                        </div>

                        {/* Instagram */}

                        <div className="md:col-span-2">

                            <label className="block mb-2 text-sm font-medium">
                                Instagram Link
                            </label>

                            <div className="relative">

                                <Globe
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
                                    name="instagram"
                                    value={settings.instagram}
                                    onChange={handleChange}
                                    placeholder="instagram.com/yourbrand"
                                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                                />

                            </div>

                        </div>

                        {/* Save */}

                        <div className="md:col-span-2 flex justify-end">

                            <button
                                type="submit"
                                className="
                  flex
                  items-center
                  gap-2
                  bg-black
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  hover:bg-gray-800
                  transition
                "
                            >
                                <Save size={18} />
                                Save Settings
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}