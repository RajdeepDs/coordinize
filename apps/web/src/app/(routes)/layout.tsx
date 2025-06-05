import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";

type HomeLayoutProps = {
  readonly children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
}
