import { ImageKitProvider } from "@imagekit/next";

export function ImageKitProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!}>
      {children}
    </ImageKitProvider>
  );
}
