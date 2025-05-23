"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { OrgCard } from "../components/OrgCard";
import Pagination from "../components/Pagination";
import { Organization } from "../types/types";
import Loader from "../components/Loader";

const START_YEAR = 2016;
const CURRENT_YEAR = new Date().getFullYear();
const DEBOUNCE_DELAY = 500; 

export default function Organizations() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("");
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrgs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orgs", {
        params: { page, year, technology, search: debouncedSearch },
      });
      setOrgs(res.data.organizations);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnologies = async () => {
    const res = await axios.get("/api/orgs");
    const allOrgs = res.data.organizations;
    const techSet = new Set<string>();
    allOrgs.forEach((org: Organization) => {
      org.technologies.forEach((tech: string) => techSet.add(tech));
    });
    setTechnologies(Array.from(techSet).sort());
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, DEBOUNCE_DELAY);
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  useEffect(() => {
    fetchOrgs();
  }, [page, year, technology, debouncedSearch]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return (
    <div className="p-6 bg-[#050107] text-[#e3c7b6] font-bungee">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          className="border p-2 px-4 bg-black text-white w-full sm:w-60 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="p-2 bg-zinc-900 border rounded sm:w-full md:w-fit"
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
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-[300px]">
            <Loader />
          </div>
        ) : (
          orgs.map((org) => (
            <OrgCard
              key={org.id || org.name}
              org={{
                ...org,
                url: org.url || "#",
              }}
            />
          ))
        )}
      </div>

      {!loading && <Pagination page={page} setPage={setPage} />}
    </div>
  );
}
