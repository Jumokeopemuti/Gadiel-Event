"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Camera,
    CheckCircle2,
    X,
} from "lucide-react";
import * as faceapi from "face-api.js";

export default function AdminLoginPage() {

    const router = useRouter();

    const webcamRef = useRef(null);
    const [modelsLoaded, setModelsLoaded] =
        useState(false);
    const [showPassword, setShowPassword] =
        useState(false);

    const [showCamera, setShowCamera] =
        useState(false);

    const [selfie, setSelfie] =
        useState(null);

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    /* INPUT CHANGE */

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const openCamera = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            setShowCamera(true);

            setTimeout(() => {
                console.log("Camera fully loaded");
            }, 1500);

        } catch (err) {
            alert("Camera access denied.");
        }
    };

    /* CAPTURE SELFIE */

    const captureSelfie = async () => {
        try {
            if (!modelsLoaded) {
                alert("Face detection models are still loading.");
                return;
            }

            const video = webcamRef.current?.video;

            if (!video) {
                alert("Camera not ready.");
                return;
            }

            // Wait for video to be loaded
            if (
                video.readyState !== 4 ||
                video.videoWidth === 0 ||
                video.videoHeight === 0
            ) {
                alert("Camera is still loading. Please wait.");
                return;
            }

            const detection = await faceapi.detectSingleFace(
                video,
                new faceapi.TinyFaceDetectorOptions()
            );

            if (!detection) {
                alert("No face detected.");
                return;
            }

            const image =
                webcamRef.current.getScreenshot();

            if (!image) {
                alert("Unable to capture selfie.");
                return;
            }

            setSelfie(image);
            setShowCamera(false);

            alert("Face captured successfully");

        } catch (err) {
            console.error("Face Detection Error:", err);
            alert("Unable to detect face.");
        }
    };

    /* LOGIN */

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selfie) {
        alert("You must take a selfie before login.");
        return;
    }

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                selfie,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem(
            "adminEmail",
            data.admin.email
        );

        localStorage.setItem(
            "adminRole",
            data.admin.role
        );

        router.push("/admin");

    } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong. Please try again.");
    }
};





    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            router.push("/admin");
        }

        loadModels();
    }, [router]);

    const loadModels = async () => {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri(
                "/models"
            );

            await faceapi.nets.faceLandmark68Net.loadFromUri(
                "/models"
            );

            setModelsLoaded(true);

            console.log("Face Models Loaded");
        } catch (err) {
            console.error("Model Load Error:", err);
        }
    };

    return (

        <div
            className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        p-6
        bg-cover
        bg-center
      "
            style={{
                backgroundImage:
                    "url('/show9.webp')",
            }}
        >

            {/* BLACK OVERLAY */}

            <div className="
        absolute
        inset-0
        bg-black/75
      " />

            {/* LOGIN CARD */}

            <div className="
        relative
        z-10
        w-full
        max-w-md
      ">

                <div className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          overflow-hidden
          text-white
        ">

                    {/* HEADER */}

                    <div className="
            p-8
            text-center
          ">

                        <h1 className="
              text-4xl
              font-bold
            ">
                            Gadiel Admin
                        </h1>

                        <p className="
              text-gray-300
              mt-3
            ">
                            Secure Dashboard Access
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="
              px-8
              pb-8
              space-y-5
            "
                    >

                        {/* EMAIL */}

                        <div>

                            <label className="
                block
                mb-2
                text-sm
                text-gray-200
              ">
                                Email Address
                            </label>

                            <div className="
                relative
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
                                    required
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="
                    admin@gadiel.com
                  "
                                    className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    focus:ring-2
                    focus:ring-white
                  "
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label className="
                block
                mb-2
                text-sm
                text-gray-200
              ">
                                Password
                            </label>

                            <div className="
                relative
              ">

                                <Lock
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
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    required
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="
                    ••••••••
                  "
                                    className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    rounded-xl
                    pl-11
                    pr-12
                    py-3
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    focus:ring-2
                    focus:ring-white
                  "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                                >

                                    {
                                        showPassword
                                            ? <EyeOff size={18} />
                                            : <Eye size={18} />
                                    }

                                </button>

                            </div>

                        </div>

                        {/* SELFIE BUTTON */}

                        <button
                            type="button"
                            onClick={openCamera}
                            className={`
                w-full
                py-3
                rounded-xl
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition

                ${selfie
                                    ? `
                    bg-green-500
                    text-white
                  `
                                    : `
                    bg-yellow-400
                    text-black
                    hover:bg-yellow-300
                  `
                                }
              `}
                        >

                            {
                                !modelsLoaded
                                    ? "Loading Face Detector..."
                                    : selfie
                                        ? "Selfie Captured"
                                        : "Take Selfie"
                            }

                        </button>

                        {/* PREVIEW */}

                        {selfie && (

                            <div className="
                flex
                justify-center
              ">

                                <img
                                    src={selfie}
                                    alt="Selfie"
                                    className="
                    w-28
                    h-28
                    rounded-full
                    border-4
                    border-white/30
                    object-cover
                  "
                                />

                            </div>

                        )}

                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="
                w-full
                bg-white
                text-black
                py-3
                rounded-xl
                font-semibold
                hover:bg-gray-200
                transition
              "
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

            {/* CAMERA MODAL */}

            {showCamera && (

                <div className="
          fixed
          inset-0
          bg-black/85
          z-50
          flex
          items-center
          justify-center
          p-6
        ">

                    <div className="
            bg-white
            rounded-3xl
            p-6
            max-w-xl
            w-full
            shadow-2xl
          ">

                        {/* MODAL HEADER */}

                        <div className="
              flex
              justify-between
              items-center
              mb-5
            ">

                            <div>

                                <h2 className="
                  text-2xl
                  font-bold
                ">
                                    Identity Verification
                                </h2>

                                <p className="
                  text-gray-500
                  mt-1
                ">
                                    Take a selfie to continue login.
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setShowCamera(false)
                                }
                                className="
                  p-2
                  rounded-lg
                  hover:bg-gray-100
                "
                            >

                                <X size={20} />

                            </button>

                        </div>

                        {/* CAMERA */}

                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            mirrored
                            audio={false}
                            onUserMedia={() =>
                                console.log("Camera Ready")
                            }
                            videoConstraints={{
                                width: 640,
                                height: 480,
                                facingMode: "user",
                            }}
                            className="rounded-2xl w-full"
                        />

                        {/* ACTION */}

                        <button
                            onClick={
                                captureSelfie
                            }
                            className="
                w-full
                mt-5
                bg-black
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-gray-800
                transition
              "
                        >

                            Capture Selfie

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}