import Link from "next/link";

export default function NavBar() {
  return (
    <div className=" p-5 font-semibold">
      <div className="flex justify-between">
        <Link href="/" className=" text-3xl">OrgScout</Link>
        <div className="space-x-5 text-xl ">
          <Link href="/starred" className="hover:underline underline-offset-4" >Starred</Link>
          <Link href="/orgs"  className="hover:underline underline-offset-4">All Orgs</Link>
        </div>
      </div>
    </div>
  );
}
