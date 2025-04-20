import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
export default function Home() {
  return (
    <div className=" w-screen min-h-screen bg-[#050107] text-[#e3c7b6] relative overflow-hidden">
      <div className="flex justify-center">
        <div className="w-2/3">
          {/* <NavBar /> */}
        </div>
      </div>
      <div className="">
        <HeroSection/>
      </div>
    </div>
  );
}
