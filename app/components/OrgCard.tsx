import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { Organization } from "../types/types";


export const OrgCard: React.FC<{ org: Organization }> = ({ org }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      setIsBookmarked(
        parsedBookmarks.some(
          (bookmark: Organization) => bookmark.name === org.name
        )
      );
    }
  }, [org.name]);

  const handleBookmarks = () => {
    const bookmarks = localStorage.getItem("bookmarks");
    let parsedBookmarks: Organization[] = [];
    if (bookmarks) {
      parsedBookmarks = JSON.parse(bookmarks);
    }

    if (isBookmarked) {
      const filteredBookmarks = parsedBookmarks.filter(
        (bookmark) => bookmark.name !== org.name
      );
      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
      setIsBookmarked(false);
    } else {
      parsedBookmarks.push(org);
      localStorage.setItem("bookmarks", JSON.stringify(parsedBookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <div className="min-h-32 bg-zinc-900 shadow-md rounded-2xl p-6 space-y-4 border border-zinc-600 hover:shadow-orange-600 ">
      <div className="flex justify-between">
        <Link
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-[#cfddd2] text-2xl mb-1 underline hover:no-underline transition-all"
        >
          {org.name}
        </Link>
        <div
          onClick={handleBookmarks}
          className="rounded-md cursor-pointer  border-zinc-800 p-1 duration-300"
        >
          {isBookmarked ? (
            <TiStarFullOutline
              size={28}
              className="hover:scale-125 transition-all"
            />
          ) : (
            <CiStar size={28} className="hover:scale-125 transition-all" />
          )}
        </div>
      </div>

      <p className="text-sm text-[#a37f4f] mb-5">{org.description}</p>

      <div>
        <strong className="text-sm  text-[#cdc7bd]">Technologies:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {org.technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs border border-[#cdc7bd]  px-2 py-0.5 rounded-2xl"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <strong className="text-sm text-[#cdc7bd]">Years Participated:</strong>
        <div className="flex flex-wrap gap-1">
          {org.years.map((year, index) => (
            <span
              key={index}
              className="text-[#cdc7bd] text-xs font-medium py-0.5 rounded-full"
            >
              {year.year}
              {index < org.years.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
