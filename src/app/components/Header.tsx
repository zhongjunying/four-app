import Link from "next/link";
export default function Header() {
  return (
    <div className="h-16 px-10 border-b bg-white">
      <div className="container flex items-center justify-between h-full">
        <h1 className="text-2xl">
            <Link href="/">DUYI Store</Link>
        </h1>
        <div className="flex justify-end space-x-4 text-sm">
            <Link href="/search">Search</Link>
            <Link href="/account">Account</Link>
            <Link href="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
} 