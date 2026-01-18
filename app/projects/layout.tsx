import type { ReactNode } from "react";

type ProjectsLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function ProjectsLayout({ children, modal }: ProjectsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
