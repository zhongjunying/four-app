import Link from "next/link";
import { Separator } from "@/components/ui/separator"
export default function Header() {
  return (
    <div className="h-16 px-10 border-b bg-white">
      <div className="container flex items-center justify-between h-full">
        <h1 className="text-2xl">
            <Link href="/">DUYI Store</Link>
        </h1>
        <div className="flex justify-end space-x-4 text-sm h-1/3">
            <Link href="/search">Search</Link>
            <Separator orientation="vertical" />
            <Link href="/account">Account</Link>
            <Separator orientation="vertical" />
            <Link href="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
} 