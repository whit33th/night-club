import ImageWithPlaceholder from "@/components/UI/ImageKit/ImageWithPlaceholder";
import { Doc } from "@/convex/_generated/dataModel";
import { generateSlug } from "@/lib/slugUtils";
import Link from "next/link";

interface EventCardProps {
  event: Doc<"events">;
  onClose: () => void;
}

const EventCard = ({ event, onClose }: EventCardProps) => {
  const eventSlug = generateSlug(event.title, event.date, event._id);

  return (
    <Link
      href={`/events/${eventSlug}`}
      onClick={onClose}
      className="group relative block aspect-square overflow-hidden rounded-md"
    >
      <ImageWithPlaceholder
        src={event.imageKitPath!}
        alt={event.title}
        fill
        className="aspect-square w-full object-cover transition will-change-transform group-hover:scale-[1.05]"
        transformation={[
          {
            width: 120,
            height: 120,
          },
        ]}
        quality={80}
        blurQuality={10}
        blurAmount={50}
        sizes="120px"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    </Link>
  );
};

export default EventCard;
