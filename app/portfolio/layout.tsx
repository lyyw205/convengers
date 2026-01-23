import type { ReactNode } from "react";

type PortfolioLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function PortfolioLayout({ children, modal }: PortfolioLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
