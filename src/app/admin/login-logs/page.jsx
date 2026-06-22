"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const role =
      localStorage.getItem("adminRole");

    if (role !== "owner") {
      router.replace("/admin");
      return;
    }

    fetchLogs();
  }, [router]);

  const fetchLogs = async () => {
    try {
      const res = await fetch(
        "/api/login-logs"
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch logs:",
        err
      );
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Login Captures
      </h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <div
            className="
              w-10
              h-10
              border-4
              border-gray-200
              border-t-[#572649]
              rounded-full
              animate-spin
            "
          />
        </div>
      ) : logs.length === 0 ? (
        <p>No login captures found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {logs.map((log) => (
            <div
              key={log._id}
              className="
                bg-white
                rounded-xl
                shadow
                p-4
              "
            >
              <img
                src={log.imageUrl}
                alt="login capture"
                className="
                  w-full
                  h-60
                  object-cover
                  rounded-lg
                "
              />

              <h3 className="font-bold mt-3">
                {log.email}
              </h3>

              <p className="text-sm text-gray-500">
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}