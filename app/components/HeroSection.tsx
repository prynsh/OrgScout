"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="relative bg-[#050107] text-white flex items-center justify-center px-4">
      <div className="py-20 space-y-6 relative z-30 text-center max-w-4xl">
        <div className="w-full flex justify-center">
          <Image
            src="/OrgScout.png"
            alt="OrgScout Logo"
            width={300}
            height={300}
            sizes="(max-width: 375px) 80vw, 300px"
            className="w-[300px] max-w-[80vw] h-auto"
          />
        </div>

        <h1 className="xl:text-6xl lg:text-4xl  text-4xl sm:text-6xl font-extrabold leading-tight">
          Level Up Through <br /> Real Code
        </h1>

        <p className="lg:text-lg sm:text-xl font-semibold text-neutral-500">
          <span className="underline underline-offset-3 text-amber-300">
            Explore
          </span>{" "}
          real-world open-source projects.
          <br />
          <span className="underline underline-offset-3 text-amber-300">
            Learn
          </span>{" "}
          by contributing.{" "}
          <span className="text-amber-300 underline underline-offset-3">
            Grow
          </span>{" "}
          by understanding.
        </p>

        <div className="flex justify-center">
          <button
            className="relative h-12 w-40 overflow-hidden border border-black bg-white px-4 py-2 text-sm sm:text-base rounded-full text-black shadow-2xl transition-all 
            before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 
            before:-rotate-90 before:bg-yellow-400 before:transition-all before:duration-300 before:z-0
            hover:text-white hover:shadow-yellow-500 hover:before:-rotate-180"
            onClick={() => router.push("/orgs")}
          >
            <span className="relative z-10">Get Started</span>
            
          </button>
        </div>
      </div>

      <div className="absolute left-4 top-32 flex-col items-start gap-12 z-0 hidden lg:flex">
        <Image
          src="/docker.png"
          alt="Docker"
          width={150}
          height={150}
          className="ml-30"
        />
        <Image
          src="/github.png"
          alt="GitHub"
          width={150}
          height={150}
          className="ml-50"
        />
        <Image
          src="/javascript.png"
          alt="JavaScript"
          width={150}
          height={150}
          className="ml-30"
        />
      </div>

      <div className="absolute right-4 top-44 flex-col items-end gap-12 z-0 hidden lg:flex">
        <Image
          src="/tailwind.png"
          alt="Tailwind"
          width={150}
          height={150}
          className="mr-30"
        />
        <Image
          src="/typescript.png"
          alt="TypeScript"
          width={150}
          height={150}
          className="mr-50"
        />
        <Image
          src="/golang.png"
          alt="Go"
          width={150}
          height={150}
          className="mr-30"
        />
      </div>
    </div>
  );
}
