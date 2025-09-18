import { Facebook, Instagram } from "lucide-react";
import SocialIcon from "./SocialIcon";
import { useLanguage } from "@/components/Providers/LanguageProvider";

const SocialLinks = () => {
  const { dict } = useLanguage();

  return (
    <div className="flex items-center justify-between">
      <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
        {dict.common.followUs}
      </p>
      <div className="flex items-center gap-2">
        <SocialIcon
          href="https://instagram.com/yourclub"
          icon={Instagram}
          label="Instagram"
        />

        <SocialIcon
          href="https://facebook.com/yourclub"
          icon={Facebook}
          label="Facebook"
        />
      </div>
    </div>
  );
};

export default SocialLinks;
