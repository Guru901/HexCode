import Link from "next/link";
import Navbuttons from "./nav-buttons";

export default function NavBar({ isDashboard = false }) {
  return (
    <nav className="flex h-[10%] w-screen items-center justify-between px-7 py-4">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold">HexCode</h1>
      </Link>
      <div>
        <Navbuttons isDashboard={isDashboard} />
      </div>
    </nav>
  );
}
