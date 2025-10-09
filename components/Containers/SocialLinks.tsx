"use client";
import { Facebook, Instagram } from "lucide-react";
import React from "react";
import { LinktreeIcon, TelegramIcon, TikTokIcon } from "../UI/Icons/Social";
import { clubInfo } from "@/lib/data/club-info";

type IconProps = React.SVGAttributes<SVGSVGElement>;

export const SocialLinks: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const socialItems: { href: string; Icon: React.FC<IconProps> }[] = [
    { href: clubInfo.socialMedia.instagram, Icon: Instagram },
    { href: clubInfo.socialMedia.facebook, Icon: Facebook },
    { href: clubInfo.socialMedia.tiktok, Icon: TikTokIcon },
    { href: clubInfo.socialMedia.telegram, Icon: TelegramIcon },
    { href: clubInfo.socialMedia.linktree, Icon: LinktreeIcon },
  ];

  return (
    <ul className="flex gap-3">
      {socialItems.map((item, index) => (
        <li key={index}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            <item.Icon width={size} height={size} />
          </a>
        </li>
      ))}
    </ul>
  );
};
