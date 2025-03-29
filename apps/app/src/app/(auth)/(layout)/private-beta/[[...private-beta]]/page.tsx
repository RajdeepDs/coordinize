import dynamic from "next/dynamic";

const title = "Private Beta";
const description = "New users will be invited soon.";
const PrivateBeta = dynamic(() =>
  import("@/components/auth/private-beta").then((mod) => mod.PrivateBeta),
);

export default function PrivateBetaPage() {
  return (
    <div className="mx-auto flex h-full w-[30%] flex-col justify-center space-y-3">
      <div className="flex flex-col">
        <h1 className="font-semibold text-base">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <PrivateBeta />
    </div>
  );
}
