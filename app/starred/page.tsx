"use client";

import { useEffect, useState, useCallback } from "react";
import { OrgCard } from "../components/OrgCard";
import { Organization } from "../types/types";


export default function Starred() {
  const [bookmarkedOrgs, setBookmarkedOrgs] = useState<Organization[]>([]);

  const handleBookmarks = useCallback(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      try {
        setBookmarkedOrgs(JSON.parse(storedBookmarks));
      } catch (error) {
        console.error("Error parsing bookmarks from localStorage:", error);
        setBookmarkedOrgs([]);
      }
    }
  }, []);

  useEffect(() => {
    handleBookmarks();
  }, [handleBookmarks]);

  return (
    <div className="p-6 bg-[#050107] text-[#e3c7b6] font-bungee min-h-screen">
      <h1 className="text-4xl md:text-7xl font-extrabold mb-6">Starred</h1>

      {bookmarkedOrgs.length === 0 ? (
        <p className="text-lg text-gray-400 mt-10">
          No organizations starred yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedOrgs.map((org, idx) => (
            <OrgCard key={idx} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}
