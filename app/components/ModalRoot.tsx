"use client";

import { useEffect } from "react";

type ModalRootProps = {
  children: React.ReactNode;
};

export default function ModalRoot({ children }: ModalRootProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const handleWheel = (event: WheelEvent) => {
      const modalBody = document.querySelector<HTMLElement>("[data-modal-body]");
      if (!modalBody) {
        return;
      }

      if (event.target instanceof Node && modalBody.contains(event.target)) {
        return;
      }

      modalBody.scrollBy({ top: event.deltaY });
      event.preventDefault();
    };

    const handleTouchMove = (event: TouchEvent) => {
      const modalBody = document.querySelector<HTMLElement>("[data-modal-body]");
      if (!modalBody) {
        return;
      }

      if (event.target instanceof Node && modalBody.contains(event.target)) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return <>{children}</>;
}
