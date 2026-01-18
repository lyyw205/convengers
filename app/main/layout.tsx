import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function MainLayout({ children, modal }: MainLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
