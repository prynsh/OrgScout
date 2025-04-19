import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative bg-black text-white flex items-center justify-center">
      <div className="py-20 space-y-5 relative z30">
        <div className="w-full flex justify-center">
          <Image src="/OrgScout.png" alt="Logo" height={300} width={300} />
        </div>

        <div className="w-full flex justify-center text-center text-6xl font-extrabold">
          Level Up Through <br /> Real Code
        </div>

        <div className="w-full flex justify-center">
          <p className="text-center text-xl font-semibold text-neutral-500">
            <span className="underline underline-offset-3 inline text-amber-300">
              Explore
            </span>{" "}
            real-world open-source projects.
            <br />
            <span className="underline-offset-3 underline inline text-amber-300">
              Learn
            </span>{" "}
            by contributing.{" "}
            <span className="text-amber-300 underline-offset-3 underline inline">
              Grow
            </span>{" "}
            by understanding.
          </p>
        </div>
        <div className="flex justify-center">
          <button className="border p-2 rounded-xl">Get Started</button>
        </div>
      </div>

      <div className="absolute left-4 top-32 flex flex-col items-start gap-12 z-0">
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
      <div className="absolute right-4 top-44 flex flex-col items-end gap-12 z-0">
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
