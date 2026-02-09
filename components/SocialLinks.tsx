import { memo, ReactNode } from "react";
import Link from "next/link";
import SocialDiscord from "@/components/icons/SocialDiscord";
import SocialGithub from "@/components/icons/SocialGithub";
import SocialTelegram from "@/components/icons/SocialTelegram";
import SocialX from "@/components/icons/SocialX";
import { ISocialLink } from "@/lib/types";

function getSocialIcon(name: string): ReactNode {
  switch (name.toLowerCase()) {
    case "x":
      return <SocialX size={16} color="white" />;
    case "telegram":
      return <SocialTelegram size={16} color="white" />;
    case "discord":
      return <SocialDiscord size={16} color="white" />;
    case "github":
      return <SocialGithub size={16} color="white" />;
    default:
      return null;
  }
}

function getUrlPrefix(name: string): string {
  switch (name.toLowerCase()) {
    case "x":
      return "https://x.com/";
    case "telegram":
      return "https://t.me/";
    case "discord":
      return "https://discord.com/";
    case "github":
      return "https://github.com/";
    default:
      return "";
  }
}

function SocialLinks({ links }: { links: ISocialLink[] }) {
  return (
    <div className="mb-6">
      <div className="text-blue-400 text-sm font-semibold mb-3 text-center">
        Social Links
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((social, idx) => (
          <Link
            key={idx}
            href={`${getUrlPrefix(social.name)}${social.handle}`}
            target="_blank"
            className="text-left px-3 py-3 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <div className="flex items-center gap-2">
              {getSocialIcon(social.name)}
              <div className="flex-1 min-w-0">
                <div className="text-zinc-400 text-xs truncate">
                  {social.handle}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-px bg-zinc-800 my-6"></div>
    </div>
  );
}

export default memo(SocialLinks);
