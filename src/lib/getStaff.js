export async function getStaff() {
   const res = await fetch("http://localhost:3000/api/staff", {
      cache: "no-store",
    });

  if (!res.ok) return [];

  return res.json();
}