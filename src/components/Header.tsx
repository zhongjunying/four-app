'use client'
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MenuList } from "@/lib/constant"
import { useCartStore } from "@/store/index"
export default function Header() {
  const { cartList } = useCartStore()
  return (
    <div className="h-16 px-10 border-b bg-white">
      <div className="container flex items-center justify-between h-full">
        <h1 className="text-2xl">
          <Link href="/">DUYI Store</Link>
        </h1>
        <div className="flex justify-end space-x-4 text-sm h-1/3">
          {MenuList.map((item, i) =>
            <React.Fragment key={item.href}>
              {i === 0 ? null : <Separator orientation="vertical" />}
              <Link href={item.href}>{item.title}</Link>
            </React.Fragment>
          )}
          {cartList.length ? <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            {cartList.length}
          </Badge> 
          : null}

        </div>
      </div>
    </div>
  );
} 