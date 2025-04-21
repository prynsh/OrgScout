import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-screen bg-[#050107] text-[#e3c7b6] px-4 py-5 border-b">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-0">
        <Link href="/" className="text-3xl font-semibold">
          OrgScout
        </Link>

        <div className="flex gap-6 text-lg sm:text-xl font-medium">
          <Link
            href="/starred"
            className="hover:underline underline-offset-4 transition"
          >
            Starred
          </Link>
          <Link
            href="/orgs"
            className="hover:underline underline-offset-4 transition"
          >
            All Orgs
          </Link>
        </div>
      </div>
    </nav>
  );
}
