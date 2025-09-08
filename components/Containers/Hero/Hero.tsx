"use client";

export default function Hero() {
  return (
    <div className="relative grid h-[calc(100dvh-56px-100px)] w-full overflow-hidden !p-0 lg:h-[calc(100dvh-56px-32px)]">
      <video
        src="/videos/2.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/imgs/1.jpg"
        className="-z-50 col-start-1 row-start-1 h-full w-full rounded object-cover"
      />

      {/* <Image
        src="/imgs/1.jpg"
        alt="Hero Image"
        layout="fill"
        className="-z-50 col-start-1 row-start-1 h-full w-full rounded object-cover"
      /> */}
      <div className="absolute inset-0 -z-40 h-full w-full bg-gradient-to-t from-black to-transparent" />

      <div className="absolute inset-0 col-start-1 row-start-1 grid select-none grid-cols-2 grid-rows-2 gap-3 p-4 text-white">
        {[
          { text: "After Dark", align: "items-start justify-start", extra: "" },
          {
            text: "Neon Heart",
            align: "items-start justify-end",
            extra: "text-right",
          },
          {
            text: "Midnight Rhythm",
            align: "items-end justify-start",
            extra: "",
          },
          {
            text: "No Sleep Club",
            align: "items-end justify-end",
            extra: "text-right",
          },
        ].map(({ text, align, extra }) => (
          <div key={text} className={`flex ${align}`}>
            <p
              className={`max-w-[12ch] text-[10px] uppercase tracking-[0.25em] text-white/85 sm:text-xs ${extra}`}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
