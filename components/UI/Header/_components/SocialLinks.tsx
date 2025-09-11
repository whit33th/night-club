import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import SocialIcon from "./SocialIcon";

const SocialLinks = () => (
  <div className="flex items-center justify-between">
    <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
      Follow us
    </p>
    <div className="flex items-center gap-2">
      <SocialIcon
        href="https://instagram.com/yourclub"
        icon={Instagram}
        label="Instagram"
      />
      <SocialIcon
        href="https://x.com/yourclub"
        icon={Twitter}
        label="Twitter"
      />
      <SocialIcon
        href="https://facebook.com/yourclub"
        icon={Facebook}
        label="Facebook"
      />
      <SocialIcon
        href="https://youtube.com/@yourclub"
        icon={Youtube}
        label="YouTube"
      />
    </div>
  </div>
);

export default SocialLinks;
