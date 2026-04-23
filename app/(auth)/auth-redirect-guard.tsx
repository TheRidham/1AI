"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function AuthRedirectGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = (() => {
    const next = searchParams.get("next");
    if (!next) return "/dashboard";

    try {
      const decoded = decodeURIComponent(next);
      return decoded.startsWith("/") ? decoded : "/dashboard";
    } catch {
      return "/dashboard";
    }
  })();

  useEffect(() => {
    if (!loading && user) {
      router.replace(nextPath);
    }
  }, [loading, user, router, nextPath]);

  return null;
}
