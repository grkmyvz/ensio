"use client";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
import TerminalHeader from "@/components/TerminalHeader";
import ProfileHeader from "./ProfileHeader";
import SocialLinks from "./SocialLinks";
import Donate from "./Donate";
import QuickDonate from "./QuickDonate";
import { useENSProfile } from "@/lib/hooks/useENSProfile";

export default function ProfileClient({ slug }: { slug: string }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { profile: ensProfile, isLoading, error } = useENSProfile(slug);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !ensProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <div className="max-w-md w-full">
          <Alert
            type="error"
            title="ENS Profile Not Found"
            message={
              error?.message ||
              `Unable to load profile for "${slug}". Please make sure the ENS name is correct and has a resolver configured.`
            }
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

  const isOwner =
    isConnected &&
    address &&
    ensProfile.profile.address &&
    address.toLowerCase() === ensProfile.profile.address.toLowerCase();

  return (
    <div className="bg-zinc-950">
      <div className="min-h-[calc(100vh-5rem)] bg-zinc-950 flex justify-center pt-8 px-4 pb-4">
        <div className="w-full max-w-2xl h-fit">
          <div className="bg-zinc-900 border border-zinc-800 shadow-2xl">
            <TerminalHeader title={ensProfile.profile.name}>
              {isOwner && (
                <Link
                  href={`https://app.ens.domains/${ensProfile.profile.name}`}
                  target="_blank"
                  className="ml-auto"
                >
                  <span className="text-blue-400 text-xs font-mono hover:text-blue-300 transition-colors">
                    Edit Profile
                  </span>
                </Link>
              )}
            </TerminalHeader>

            <div className="p-6 font-mono text-sm">
              <ProfileHeader profile={ensProfile.profile} />
              {ensProfile.socials && ensProfile.socials.length > 0 && (
                <SocialLinks links={ensProfile.socials} />
              )}

              {ensProfile.wallets && ensProfile.wallets.length > 0 && (
                <QuickDonate wallets={ensProfile.wallets} />
              )}

              {ensProfile.wallets && ensProfile.wallets.length > 0 && (
                <Donate wallets={ensProfile.wallets} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
