"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
import Hero from "@/components/Hero";
import { isValidENSName, sanitizeENSName } from "@/lib/utils/validation";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const profileParam = searchParams?.get("ens");

  if (profileParam) {
    const sanitizedProfile = sanitizeENSName(profileParam);

    if (!isValidENSName(sanitizedProfile)) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
          <div className="max-w-md w-full">
            <Alert
              type="error"
              title="Invalid ENS Address"
              message={`"${profileParam}" is not a valid ENS address. ENS names must end with .eth and contain only lowercase letters, numbers, and hyphens.`}
            />
            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }

    return <ProfileClient slug={sanitizedProfile} />;
  }

  return <Hero />;
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
