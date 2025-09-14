"use client";
import { Facebook, Instagram } from "lucide-react";
import React from "react";
import { LinktreeIcon, TelegramIcon, TikTokIcon } from "../UI/Icons/Social";

type IconProps = React.SVGAttributes<SVGSVGElement>;

export const SocialLinks: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const socialItems: { href: string; Icon: React.FC<IconProps> }[] = [
    { href: "https://instagram.com/yourclub", Icon: Instagram },
    { href: "https://facebook.com/yourclub", Icon: Facebook },
    { href: "https://tiktok.com/@yourclub", Icon: TikTokIcon },
    { href: "https://t.me/yourclub", Icon: TelegramIcon },
    { href: "https://linktr.ee/yourclub", Icon: LinktreeIcon },
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
