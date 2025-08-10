"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderController() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return <Header isHomePage={isHomePage} />;
}
