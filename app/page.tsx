import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
export default function Home() {
  return (
    <div className="bg-black w-full min-h-screen text-white font-serif relative overflow-hidden">
      <div className="flex justify-center">
        <div className="w-2/3">
          <NavBar />
        </div>
      </div>
      <div className="">
        <HeroSection/>
      </div>
    </div>
  );
}
