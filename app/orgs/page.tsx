"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

  const fetchOrgs = async () => {
    const res = await axios.get("/api/orgs", {
      params: { page, year, technology },
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
  }, [page, year, technology]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-6 bg-[#050107] text-[#e3c7b6] font-bungee">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded"
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
          onChange={(e) => setTechnology(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Technologies</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 text-white min-h-screen">
        {orgs.slice(0, 16).map((org: any, idx: number) => (
          <div
            key={org.id}
            className="p-4 bg-[#050107]  border border-white rounded shadow min-h-64"
          >
            <h2 className="text-xl font-semibold text-white">{org.name}</h2>
            <p className="text-sm mt-2 mb-2">{org.description}</p>
            {/* <div className="text-xs text-[#cdc7bd] mb-1">
              <strong>Technologies:</strong> {org.technologies.join(', ')}
            </div> */}
            <div className="text-xs text-[#cdc7bd] mb-1">
              <strong>Technologies:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {org.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="border border-[#cdc7bd] px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs mt-2 text-[#cdc7bd]">
              <strong className="underline underline-offset-2">Years:</strong>{" "}
              {org.years.map((y: any) => y.year).join(", ")}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
