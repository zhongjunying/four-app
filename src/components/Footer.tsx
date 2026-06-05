import Link from "next/link";
import { Separator } from "@/components/ui/separator"
import { NavList } from "@/lib/constant"
import React from "react";
export default function Footer() {
  return (
    <div className="border-t mt-6">
      <div className="container py-32 flex justify-between">
        <h2 className="text-2xl font-bold">
          <Link href="/">DUYI Store</Link>
        </h2>
        <div className="grid grid-cols-3">
          {NavList.map((item, i) => (
            <div key={item.title} className="flex justify-end space-x-8">
              {i === 0 ? null : <Separator orientation="vertical" />}
              <div>
                <span>{item.title}</span>
                <ul className="m-4 space-y-3">
                  {item.list.map((list) => (
                    <li key={list}>{list}</li>
                  ))}
                </ul>
              </div>
            </div >
          ))}
        </div>
      </div>
    </div>
  );
}