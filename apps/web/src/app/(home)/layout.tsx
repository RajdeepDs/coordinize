import { Header } from "@/components/header";
import type { ReactNode } from "react";

type HomeLayoutProps = {
  readonly children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
