import type { Metadata } from "next";
import dynamic from "next/dynamic";

const title = "Private Beta";
const description = "New users will be invited soon.";
const PrivateBeta = dynamic(() =>
  import("@/components/auth/private-beta").then((mod) => mod.PrivateBeta),
);

export const metadata: Metadata = {
  title,
};

export default function PrivateBetaPage() {
  return (
    <div className="mx-auto flex h-full w-sm flex-col justify-center gap-4 px-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-base">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <PrivateBeta />
    </div>
  );
}
