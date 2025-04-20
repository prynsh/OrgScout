// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { OrgCard } from "../components/OrgCard";
// const PAGE_SIZE = 12;
// const START_YEAR = 2016;
// const CURRENT_YEAR = new Date().getFullYear();

// export default function Organizations() {
//   const [orgs, setOrgs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [year, setYear] = useState("");
//   const [technology, setTechnology] = useState("");
//   const [technologies, setTechnologies] = useState<string[]>([]);

//   const fetchOrgs = async () => {
//     const res = await axios.get("/api/orgs", {
//       params: { page, year, technology },
//     });
//     setOrgs(res.data.organizations);
//     setTotal(res.data.total);
//   };

//   const fetchTechnologies = async () => {
//     const res = await axios.get("/api/orgs");
//     const allOrgs = res.data.organizations;
//     const techSet = new Set<string>();
//     allOrgs.forEach((org: any) => {
//       org.technologies.forEach((tech: string) => techSet.add(tech));
//     });
//     setTechnologies(Array.from(techSet).sort());
//   };

//   useEffect(() => {
//     fetchOrgs();
//   }, [page, year, technology]);

//   useEffect(() => {
//     fetchTechnologies();
//   }, []);

//   const totalPages = Math.ceil(total / PAGE_SIZE);

//   return (
//     <div className="p-6 bg-[#050107] text-[#e3c7b6] font-bungee">
//       <div className="justify-between flex gap-4 mb-6">
//         <input className="border p-2" placeholder="Search..."></input>
//         <div className="space-x-3">
//           <select
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="p-2 bg-zinc-900 border rounded"
//           >
//             <option value="">All Years</option>
//             {Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => (
//               <option key={i} value={START_YEAR + i}>
//                 {START_YEAR + i}
//               </option>
//             ))}
//           </select>

//           <select
//             value={technology}
//             onChange={(e) => setTechnology(e.target.value)}
//             className="p-2 border bg-zinc-900 rounded"
//           >
//             <option value="">All Technologies</option>
//             {technologies.map((tech) => (
//               <option key={tech} value={tech}>
//                 {tech}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-screen">
//         {orgs.slice(0, 16).map((org: any) => (
//           <OrgCard
//             key={org.id || org.name}
//             org={{
//               ...org,
//               imageURL: org.imageURL || "/placeholder-logo.png",
//               url: org.url || "#",
//             }}
//           />
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-4">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-2 text-sm text-[#e3c7b6]">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//           className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { OrgCard } from "../components/OrgCard";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 12;
const START_YEAR = 2016;
const CURRENT_YEAR = new Date().getFullYear();

export default function Organizations() {
  const [orgs, setOrgs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [year, setYear] = useState("");
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const fetchOrgs = async () => {
    const res = await axios.get("/api/orgs", {
      params: { page, year, technology, search },
    });
    setOrgs(res.data.organizations);
    setTotal(res.data.total);
  };

  const fetchTechnologies = async () => {
    const res = await axios.get("/api/orgs");
    const allOrgs = res.data.organizations;
    const techSet = new Set<string>();
    allOrgs.forEach((org: any) => {
      org.technologies.forEach((tech: string) => techSet.add(tech));
    });
    setTechnologies(Array.from(techSet).sort());
  };

  useEffect(() => {
    fetchOrgs();
  }, [page, year, technology, search]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-6 bg-[#050107] text-[#e3c7b6] font-bungee">
      <div className="flex flex-col sm:flex-row sm:items-center  sm:justify-between gap-4 mb-6">
        <input
          className="border p-2 px-4 bg-black text-white w-full sm:w-60 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="flex flex-col sm:flex-row gap-3  ">
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="p-2 bg-zinc-900 border rounded sm:w-full md:w-fit "
          >
            <option value="">All Years</option>
            {Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => (
              <option key={i} value={START_YEAR + i}>
                {START_YEAR + i}
              </option>
            ))}
          </select>

          <select
            value={technology}
            onChange={(e) => {
              setTechnology(e.target.value);
              setPage(1);
            }}
            className="p-2 bg-zinc-900 border rounded sm:w-full md:w-fit"
          >
            <option value="">All Technologies</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-screen">
        {orgs.map((org: any) => (
          <OrgCard
            key={org.id || org.name}
            org={{
              ...org,
              imageURL: org.imageURL || "/placeholder-logo.png",
              url: org.url || "#",
            }}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
