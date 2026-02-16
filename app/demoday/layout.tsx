import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHOW ME THE AI - Demo Day by SOLPLUS",
  description:
    "2026.02.27 목요일 19:00 | 120분 7천 원의 AI 서바이벌. 10팀의 혁신적인 AI 프로젝트, 실시간 투자 투표, 최대 1억 투자 연계.",
  openGraph: {
    title: "SHOW ME THE AI - Demo Day",
    description: "120분 7천 원의 AI 서바이벌. 미래의 AI 주인공을 만나보세요.",
    type: "website",
  },
};

export default function DemodayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
