import Link from "next/link";
import styles from "./page.module.css";
import { portfolioItems, referenceItems } from "../lib/sample-data";
import ReferenceSlider from "../components/ReferenceSlider";

export default function PortalDashboardPage() {
  const partnerLogos = [
    { src: "/logos/partner-01.svg", x: "8%", y: "18%", w: "140px", r: "-4deg" },
    { src: "/logos/partner-02.svg", x: "28%", y: "38%", w: "160px", r: "2deg" },
    { src: "/logos/partner-03.svg", x: "50%", y: "16%", w: "150px", r: "-3deg" },
    { src: "/logos/partner-04.svg", x: "72%", y: "34%", w: "170px", r: "4deg" },
    { src: "/logos/partner-05.svg", x: "90%", y: "18%", w: "130px", r: "-2deg" },
    { src: "/logos/partner-06.svg", x: "12%", y: "68%", w: "170px", r: "3deg" },
    { src: "/logos/partner-07.svg", x: "34%", y: "74%", w: "140px", r: "-5deg" },
    { src: "/logos/partner-08.svg", x: "56%", y: "62%", w: "180px", r: "2deg" },
    { src: "/logos/partner-09.svg", x: "78%", y: "72%", w: "150px", r: "-3deg" },
    { src: "/logos/partner-10.svg", x: "18%", y: "88%", w: "130px", r: "4deg" },
    { src: "/logos/partner-11.svg", x: "60%", y: "88%", w: "160px", r: "-2deg" },
    { src: "/logos/partner-12.svg", x: "88%", y: "86%", w: "140px", r: "3deg" },
  ];

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            배너 타이틀 : 리더님과 배너 이미지 내용에 따라 다르게 넣을 예정입니다.
          </h1>
          <p className={styles.lead}>
            배너 내용 영역 +{" "}
            <em>{`{샘플 텍스트입니다. 프로젝트 맥락과 핵심 메시지를 길게 설명하는 자리로, 소개 문구와 강조 포인트가 함께 들어갈 수 있습니다. 실제 배너 콘텐츠 길이에 맞춰 문장을 조정할 예정입니다.}`}</em>
          </p>
          <div className={styles.heroCtaNote}>버튼형, 강의나 커뮤니티 링크 등</div>
        </div>
      </section>

      <section className={styles.blankSection} />

      <section className={styles.section}>
        <div className={`${styles.card} ${styles.cardDense}`}>
          <div className={styles.badge}>What is SOLPCLUB?</div>
          <h2 className={styles.headline}>
            솔프클럽은 솔로프리너들을 위한 커뮤니티입니다. (임시텍스트)
          </h2>
          <p className={styles.lead}>
            <em>{`{솔프클럽 커뮤니티 소개를 위한 샘플 문장입니다. 활동 방식과 참여 혜택, 운영 철학 등을 간단히 설명하는 영역으로 활용할 수 있습니다.}`}</em>
            <br />
            <em>{`{추가 설명 문장을 넣어 구성의 깊이를 더하는 보조 문장 영역입니다.}`}</em>
            <br />
            <br />
            <em>{`{한 줄 공백 이후에 들어가는 추가 설명 문장 샘플입니다.}`}</em>
            <br />
            <em>{`{두 번째 보조 설명 문장 샘플로, 핵심 메시지를 보완하는 용도로 사용됩니다.}`}</em>
          </p>
          <div className={styles.buttonRow}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/company">
              Solpclub 자세히 알아보기 (COMPANY 페이지로 이동하는 버튼입니다)
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.blankSection} />

      <section className={styles.section}>
        <h2 className={styles.portfolioTitle}>포트폴리오</h2>
        <p className={styles.portfolioDesc}>
          이 섹션은 포트폴리오 페이지랑 연동되는 페이지이며, 포트폴리오 클릭 시
          해당 포트폴리오 상세 페이지를 모달로 띄울 예정입니다.
        </p>
        <div className={styles.grid}>
          {portfolioItems.slice(0, 3).map((item) => (
            <article
              key={item.slug}
              className={`${styles.card} ${styles.cardNoPadding} ${styles.cardMedia}`}
            >
              <div
                className={styles.thumb}
                style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
              >
                <span className={styles.thumbText}>{item.title}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.badge}>{item.category}</div>
                <h3>{item.title}</h3>
                <p className={styles.lead}>{item.summary}</p>
                <div className={styles.meta}>{item.outcomes.join(" · ")}</div>
                <Link href={`/portfolio/${item.slug}`} scroll={false}>
                  See details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.blankSection} />

      <section className={styles.section}>
        <h2 className={styles.portfolioTitle}>레퍼런스</h2>
        <p className={styles.portfolioDesc}>
          이 섹션은 레퍼런스 페이지랑 연동되는 섹션이며, 레퍼런스 클릭 시
          레퍼런스 상세 페이지를 모달로 띄울 예정입니다.
        </p>
        <div className={styles.referenceWrap}>
          <ReferenceSlider items={referenceItems} />
        </div>
      </section>

      <section className={styles.blankSection} />

      <section className={styles.section}>
        <h2 className={styles.partnersTitle}>PARTNERS</h2>
        <p className={styles.partnersDesc}>
          파트너사 로고를 분산해서 나열한 이미지로 대체할 예정입니다. 이미지
          영역이라고 생각하시면 됩니다.
        </p>
        <div className={styles.logoField}>
          {partnerLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className={styles.logoFloating}
              style={
                {
                  "--x": logo.x,
                  "--y": logo.y,
                  "--w": logo.w,
                  "--r": logo.r,
                } as React.CSSProperties
              }
            >
              <img className={styles.logoImage} src={logo.src} alt="Partner logo" />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.blankSection} />
    </div>
  );
}
