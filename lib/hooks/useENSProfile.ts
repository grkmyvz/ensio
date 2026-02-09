"use client";

import { useEffect, useState } from "react";
import { ensResolver } from "@/lib/services/ens.service";
import { IENSProfile } from "@/lib/types";
import { appConfig } from "@/lib/config/app";

export function useENSProfile(slug: string) {
  const [profile, setProfile] = useState<IENSProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchENSProfile() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ensResolver(slug);

        if (!cancelled) {
          setProfile(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          if (appConfig.isDevelopment) {
            console.error("Error fetching ENS profile:", err);
          }
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setIsLoading(false);
        }
      }
    }

    fetchENSProfile();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { profile, isLoading, error };
}
