"use client";
import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Copy from "@/components/icons/Copy";
import Envelope from "@/components/icons/Envelope";
import Globe from "@/components/icons/Globe";
import Location from "@/components/icons/Location";
import { IProfile } from "@/lib/types";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { convertIpfsToHttp } from "@/lib/utils/ipfs";
import { appConfig } from "@/lib/config/app";

function ProfileHeader({ profile }: { profile: IProfile }) {
  const { name, address, bio, mail, website, location, avatar } = profile;
  const { copied, copy } = useCopyToClipboard();

  // Generate avatar URLs with primary and fallback gateways
  const avatarUrls = avatar
    ? [
        convertIpfsToHttp(avatar, appConfig.ipfs.gateway),
        ...appConfig.ipfs.fallbackGateways.map((gateway) =>
          convertIpfsToHttp(avatar, gateway),
        ),
      ]
    : [];

  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [avatarError, setAvatarError] = useState(false);

  const handleAvatarError = () => {
    // Try next gateway if available
    if (currentAvatarIndex < avatarUrls.length - 1) {
      setCurrentAvatarIndex(currentAvatarIndex + 1);
    } else {
      // All gateways failed
      setAvatarError(true);
    }
  };

  const currentAvatarUrl = avatarUrls[currentAvatarIndex];

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
        {currentAvatarUrl && !avatarError ? (
          <Image
            src={currentAvatarUrl}
            alt={`${name} avatar`}
            width={80}
            height={80}
            className="w-24 h-24 rounded-full border border-zinc-700"
            unoptimized
            onError={handleAvatarError}
          />
        ) : (
          <div className="w-24 h-24 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-2xl text-zinc-500">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </div>
        )}
        <div className="flex-1 text-center sm:text-left">
          <div className="text-emerald-400 text-2xl font-bold mb-2">{name}</div>
          <div
            className={`flex ${copied ? "text-emerald-500" : "text-zinc-500 hover:text-zinc-400"}  text-xs mb-3 font-mono gap-2 justify-center sm:justify-start cursor-pointer`}
            onClick={() => {
              if (!address) return;
              copy(address);
            }}
          >
            {address}{" "}
            <Copy size={12} color={copied ? "#00d492" : "currentColor"} />
          </div>

          {bio && <div className="text-zinc-400 text-sm mb-3">{bio}</div>}
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-4 justify-center items-center">
        {(mail || website || location) && (
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {mail && (
              <Link
                href={`mailto:${mail}`}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-400"
              >
                <Envelope size={16} color="white" />
                <span>{mail}</span>
              </Link>
            )}
            {website && (
              <Link
                href={
                  website.startsWith("http") ? website : `https://${website}`
                }
                target="_blank"
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-400"
              >
                <Globe size={16} color="white" />
                <span>{website}</span>
              </Link>
            )}
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Location size={16} color="white" />
                <span>{location}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-px bg-zinc-800 my-6"></div>
    </div>
  );
}

export default memo(ProfileHeader);
