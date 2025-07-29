import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin - ARONA",
  description: "Admin Page",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}