"use client";

import { useEffect, useState, useCallback } from "react";
import { OrgCard } from "../components/OrgCard";
import { Organization } from "../types/types";


export const Loader = () => {
  return (
    <div className="wheel-and-hamster relative w-[12em] h-[12em] text-[14px]">
      <div className="wheel z-20 rounded-full absolute top-0 left-0 w-full h-full" />
      <div className="spoke rounded-full absolute top-0 left-0 w-full h-full" />
      <div className="hamster absolute z-10 top-1/2 left-[calc(50%-3.5em)] w-[7em] h-[3.75em]">
        <div className="hamster__head absolute" />
        <div className="hamster__ear absolute" />
        <div className="hamster__eye absolute" />
        <div className="hamster__nose absolute" />
        <div className="hamster__body absolute">
          <div className="hamster__limb--fr absolute" />
          <div className="hamster__limb--fl absolute" />
          <div className="hamster__limb--br absolute" />
          <div className="hamster__limb--bl absolute" />
        </div>
        <div className="hamster__tail absolute" />
      </div>
    </div>
  );
};




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
