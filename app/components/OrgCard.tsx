import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectYear {
  year: string;
}

interface Organization {
  name: string;
  description: string;
  topics: string[];
  technologies: string[];
  years: ProjectYear[];
  imageURL: string;
  githubURL?: string;
  url: string;
}

export const OrgCard: React.FC<{ org: Organization }> = ({ org }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      setIsBookmarked(parsedBookmarks.some((bookmark: Organization) => bookmark.name === org.name));
    }
  }, [org.name]);

  const handleBookmarks = () => {
    const bookmarks = localStorage.getItem('bookmarks');
    let parsedBookmarks: Organization[] = [];
    if (bookmarks) {
      parsedBookmarks = JSON.parse(bookmarks);
    }

    if (isBookmarked) {
      const filteredBookmarks = parsedBookmarks.filter(
        (bookmark) => bookmark.name !== org.name
      );
      localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
      setIsBookmarked(false);
    } else {
      parsedBookmarks.push(org);
      localStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <div className="bg-[#152423] text-[#cfddd2] min-h-32 dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-4 border border-white dark:border-zinc-800">
      <div className="flex justify-between items-start">
        <div className="w-14 h-12 rounded-md mb-3">
          <Image
            src={org.imageURL}
            width={150}
            height={150}
            alt="organization logo"
            className="rounded-md"
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <div
          onClick={handleBookmarks}
          className="rounded-md cursor-pointer bg-[#FEE8C2] p-1 duration-300"
        >
          {isBookmarked ? (
            <TiStarFullOutline size={28} className="hover:scale-125 transition-all" />
          ) : (
            <CiStar size={28} className="hover:scale-125 transition-all" />
          )}
        </div>
      </div>

      <Link
        href={`/organizations/${encodeURIComponent(org.name)}`}
        className="font-extrabold text-2xl mb-1 underline hover:no-underline transition-all"
      >
        {org.name}
      </Link>

      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-5">{org.description}</p>

      <div>
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Technologies:</h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {org.technologies.map((tech, index) => (
            <span key={index} className="text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Years Participated:</h4>
        <div className="flex flex-wrap gap-2 ">
          {org.years.map((year, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {year.year}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {org.githubURL && org.githubURL !== "Not Found" && (
          <Link href={org.githubURL} target="_blank" className="rounded-md bg-[#FEE8C2] p-2 hover:bg-[#dec9a5] transition-colors duration-300">
            <FaGithub size={25} />
          </Link>
        )}
        <Link href={org.url} target="_blank" className="rounded-md bg-[#FEE8C2] p-2 hover:bg-[#dec9a5] transition-colors duration-300">
          <IoIosLink size={25} />
        </Link>
      </div>
    </div>
  );
};
