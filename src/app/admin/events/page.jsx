"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Upload } from "lucide-react";
import imageCompression from "browser-image-compression";

export default function AdminEventsPage() {

  const [events, setEvents] = useState([]);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    endDate: "",
    description: "",
    image: "",
  });

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  // IMAGE PICKER

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    console.log(
      "File Size:",
      (file.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB");
      e.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setForm({
      ...form,
      image: imageUrl,
    });
  }





  async function addEvent(e) {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("category", form.category);
      data.append("location", form.location);
      data.append("date", form.date);
      data.append("endDate", form.endDate);
      data.append("description", form.description);

      if (image) {
        console.log(
          "Original:",
          (image.size / 1024 / 1024).toFixed(2),
          "MB"
        );

        const compressedFile =
          await imageCompression(image, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });

        console.log(
          "Compressed:",
          (
            compressedFile.size /
            1024 /
            1024
          ).toFixed(2),
          "MB"
        );

        data.append(
          "image",
          compressedFile
        );
      }

      const res = await fetch(
        "/api/event",
        {
          method: "POST",
          body: data,
        }
      );

      const text = await res.text();

      console.log("Response:", text);

      if (!res.ok) {
        alert(text);
        return;
      }

      const newEvent =
        JSON.parse(text);

      const savedEvent = {
        _id: newEvent._id,

        day: new Date(
          newEvent.date
        )
          .getDate()
          .toString()
          .padStart(2, "0"),

        month: new Date(
          newEvent.date
        ).toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        ),

        title: newEvent.title,
        location: newEvent.location,
        date: newEvent.date,
        endDate: newEvent.endDate,
        image: newEvent.imageUrl,
      };

      setEvents((prev) => [
        savedEvent,
        ...prev,
      ]);

      alert(
        "Event added successfully"
      );

      setForm({
        title: "",
        category: "",
        location: "",
        date: "",
        endDate: "",
        description: "",
      });

      setImage(null);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create event"
      );
    }
  }

  async function deleteEvent(id) {
    await fetch(`/api/event?id=${id}`, {
      method: "DELETE",
    });

    setEvents((prev) => prev.filter((e) => e._id !== id));
  }


  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/event");
      const data = await res.json();

      const formattedEvents = data.map((event) => ({
        _id: event._id,
        day: new Date(event.date)
          .getDate()
          .toString()
          .padStart(2, "0"),

        month: new Date(event.date).toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        ),

        title: event.title,
        category: event.category,
        location: event.location,
        description: event.description,
        date: event.date,
        endDate: event.endDate,
        image: event.imageUrl,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <main className="
      bg-[#f7f4f1]
      min-h-screen
      py-20
    ">

      <div className="
        max-w-[1500px]
        mx-auto
        px-6
      ">

        <h1 className="
          font-serif
          text-5xl
          mb-16
        ">
          Event Management
        </h1>

        <div className="
          grid
          lg:grid-cols-[500px_1fr]
          gap-16
        ">

          {/* FORM */}

          <div className="
            bg-white
            p-10
            shadow-sm
          ">

            <h2 className="
              font-serif
              text-3xl
              mb-10
            ">
              Add Event
            </h2>

            <form
              onSubmit={addEvent}
              className="space-y-6"
            >

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="inputAdmin border border-gray-200 py-4 pl-3"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="inputAdmin border border-gray-200 py-4 px-3 ml-2"
              >



                <option value="">
                  Select Category
                </option>

                <option>Wedding</option>
                <option>Birthday</option>
                <option>Coparate Event</option>
                <option>Memorial</option>

              </select>



              <input
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="inputAdmin border border-gray-200 py-4 px-3"
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="inputAdmin border border-gray-200 py-4 px-3"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="inputAdmin border border-gray-200 py-4 pl-3 ml-2"
              />

              {/* FILE UPLOAD */}

              <label className="
                border-2
                border-dashed
                border-[#ddd]
                p-8
                cursor-pointer
                block
                text-center
                hover:border-[#572649]
                transition
              ">

                <Upload
                  size={35}
                  className="
                    mx-auto
                    mb-4
                    text-[#572649]
                  "
                />

                <p>
                  Choose Image From Device
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files?.[0] || null);
                  }}
                />

              </label>

              {/* PREVIEW */}
              {image && (
                <div className="relative h-[220px] w-full">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    fill
                    unoptimized
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="
                  inputAdmin
                  resize-none
                  border border-gray-200 py-4 pl-3 w-full
                "
              />

              <button className="
                bg-[#232323]
                text-white
                w-full
                py-5

                flex
                items-center
                justify-center
                gap-4

                hover:bg-[#572649]
                transition
              ">

                <Plus size={18} />

                Add Event

              </button>

            </form>

          </div>

          {/* EVENTS */}

          <div>

            <h2 className="
              font-serif
              text-4xl
              mb-10
            ">
              Events
            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-8
            ">

              {events.map((event) => (
                <div
                  key={event._id}
                  className="
      bg-white
      shadow-sm
      overflow-hidden
    "
                >
                  <div className="relative h-[260px]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="font-serif text-3xl mb-4">
                      {event.title}
                    </h3>

                    <p className="font-medium">
                      {event.day} {event.month}
                    </p>

                    <p>{event.location}</p>

                    <p>
                      {new Date(
                        event.date
                      ).toLocaleString()}
                    </p>

                    <p>
                      Ends:{" "}
                      {new Date(
                        event.endDate
                      ).toLocaleString()}
                    </p>

                    <button
                      onClick={() =>
                        deleteEvent(event._id)
                      }
                      className="
          bg-red-500
          text-white
          px-6
          py-3
          flex
          items-center
          gap-3
          hover:bg-red-600
          transition
        "
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}