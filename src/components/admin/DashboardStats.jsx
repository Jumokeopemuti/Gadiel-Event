"use client";

export default function DashboardStats({
  stats = {
    bookings: 38,
    quotes: 85,
    blogs: 0,
    staffs: 0,
    client: 165,
    gallery: 0,
    events: 45,
  },
}) {
  const cards = [
    {
      title: "Bookings",
      value: stats.bookings,
    },
    {
      title: "Quotes",
      value: stats.quotes,
    },
   
  
    {
      title: "Client",
      value: stats.client,
    },
   
    {
      title: "Events",
      value: stats.events,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#572649] text-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-sm opacity-80">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}