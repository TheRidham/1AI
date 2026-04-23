"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function HeaderAuthLink() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="hidden sm:inline-flex text-sm text-muted-foreground px-3 h-10 items-center">
        ...
      </span>
    );
  }

  return (
    <Link
      href={user ? "/dashboard" : "/login"}
      className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 h-10 items-center"
    >
      {user ? "Dashboard" : "Sign in"}
    </Link>
  );
}
