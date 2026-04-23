"use client";

import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthRedirectGuard } from "./auth-redirect-guard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (user) return null;

  return (
    <>
      <Suspense fallback={null}>
        <AuthRedirectGuard />
      </Suspense>
      {children}
    </>
  );
};

export default Layout;