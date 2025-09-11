const EventSkeleton = () => (
  <div className="aspect-square overflow-hidden rounded-md bg-neutral-800">
    <div className="h-full w-full animate-pulse bg-neutral-700" />
  </div>
);

interface EventSkeletonGridProps {
  count?: number;
}

const EventSkeletonGrid = ({ count = 5 }: EventSkeletonGridProps) => (
  <>
    {Array.from({ length: count }).map((_, idx) => (
      <EventSkeleton key={`skeleton-${idx}`} />
    ))}
  </>
);

export default EventSkeletonGrid;
