"use client";

import { useRouter } from "next/navigation";

type ModalCloseButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export default function ModalCloseButton({
  className,
  children,
}: ModalCloseButtonProps) {
  const router = useRouter();

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/main");
  };

  return (
    <button type="button" className={className} onClick={handleClose}>
      {children}
    </button>
  );
}
