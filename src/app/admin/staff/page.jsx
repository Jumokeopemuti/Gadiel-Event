"use client";

import { useEffect, useState } from "react";
import StaffTable from "@/components/admin/StaffTable";

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/staff");
      const data = await res.json();

      setStaffList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setStaffList([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/staff/${id}`, {
        method: "DELETE",
      });

      setStaffList((prev) =>
        prev.filter((s) => s._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <StaffTable
        staffList={staffList}
        onDelete={handleDelete}
      />
    </div>
  );
}