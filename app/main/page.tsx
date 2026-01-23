import Link from "next/link";
import PublicLayout from "../components/PublicLayout";
import publicLayoutStyles from "../components/public-layout.module.css";
import companyStyles from "./company.module.css";
import styles from "./page.module.css";
import { portfolioItems, projectItems } from "../lib/sample-data";
import ReferenceSlider from "../components/ReferenceSlider";

export default function Home() {
  const partnerLogos = [
    { src: "/logos/partner-01.svg" },
    { src: "/logos/partner-02.svg" },
    { src: "/logos/partner-03.svg" },
    { src: "/logos/partner-04.svg" },
    { src: "/logos/partner-05.svg" },
    { src: "/logos/partner-06.svg" },
    { src: "/logos/partner-07.svg" },
    { src: "/logos/partner-08.svg" },
    { src: "/logos/partner-09.svg" },
    { src: "/logos/partner-10.svg" },
    { src: "/logos/partner-11.svg" },
    { src: "/logos/partner-12.svg" },
  ];

  return (
    <PublicLayout
      title="배너 타이틀 : 리더님과 배너 이미지 내용에 따라 다르게 넣을 예정입니다."
      subtitle={
        <>
          배너 내용 영역 +{" "}
          <em>{`{샘플 텍스트입니다. 프로젝트 맥락과 핵심 메시지를 길게 설명하는 자리로, 소개 문구와 강조 포인트가 함께 들어갈 수 있습니다. 실제 배너 콘텐츠 길이에 맞춰 문장을 조정할 예정입니다.}`}</em>
        </>
      }
      align="left"
      titleClassName={styles.heroTitle}
      subtitleClassName={styles.heroSubtitle}
      heroClassName={styles.hero}
      heroInnerClassName={styles.heroInner}
      heroBackground={
        <div className={styles.heroVideoBackdrop} aria-hidden="true">
          <iframe
            src="https://www.youtube.com/embed/MH-PXXchvpo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      }
      ctaSlot={<div className={styles.heroCtaNote}>버튼형, 강의나 커뮤니티 링크 등</div>}
    >
      <section
        className={`${publicLayoutStyles.hero} ${publicLayoutStyles.heroCentered}`}
      >
        <div className={publicLayoutStyles.heroInner}>
          <h1 className={companyStyles.pageTitle}>솔프클럽(SOLP CLUB)</h1>
          <p className={companyStyles.subtitle}>
            솔프클럽은 ㈜컨벤져스 산하 AI 비즈니스 커뮤니티로,
            <br />
            스터디 → 프로젝트 → 협업 → 수익화를 만드는{" "}
            <strong>실전 연합형 비즈니스 커뮤니티</strong>입니다.
          </p>
        </div>
      </section>

      <div className={publicLayoutStyles.main}>
        <div className={companyStyles.body}>
          <section className={companyStyles.videoSection}>
            <div className={companyStyles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/MH-PXXchvpo"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>

          <div style={{ display: "grid", gap: "20px" }}>
            <section className={companyStyles.textSection}>
              <h2 className={companyStyles.sectionTitle}>솔프클럽에서는?</h2>
              <p className={companyStyles.cardDescription}>
                AI와 관련된 다양한 경험을 쌓을 수 있습니다.
              </p>
            </section>

            <section className={companyStyles.circleSection}>
              <div className={companyStyles.circleRow}>
                <div className={companyStyles.circleItem}>
                  <div className={`${companyStyles.circle} ${companyStyles.circleGreen}`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={companyStyles.circleIcon}
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="10" rx="2" fill="#ffffff" />
                      <rect x="4.5" y="6.5" width="15" height="7" rx="1.4" fill="#eaf7ee" />
                      <polygon points="10,9 15,11.5 10,14" fill="#2f7a4b" />
                      <rect x="8" y="17" width="8" height="2" rx="1" fill="#2f7a4b" />
                    </svg>
                  </div>
                  <div className={companyStyles.circleText}>
                    <div className={companyStyles.circleTitle}>AI 강의</div>
                    <div className={companyStyles.circleDesc}>
                      AI 분야 전문가의 강의를 들을 수 있어요
                    </div>
                  </div>
                </div>

                <div className={companyStyles.circleItem}>
                  <div className={`${companyStyles.circle} ${companyStyles.circleBlue}`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={companyStyles.circleIcon}
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="9" r="3" fill="#4a79ff" />
                      <circle cx="16" cy="9" r="3" fill="#7fb2ff" />
                      <path
                        d="M4.5 18c.6-2.6 2.8-4 5.5-4"
                        fill="none"
                        stroke="#2f4fb8"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13 14c2.7 0 4.9 1.4 5.5 4"
                        fill="none"
                        stroke="#2f4fb8"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.8 11.5h2.4"
                        stroke="#2f4fb8"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className={companyStyles.circleText}>
                    <div className={companyStyles.circleTitle}>AI 네트워킹</div>
                    <div className={companyStyles.circleDesc}>
                      AI 전문가와 관련 종사자들과 오프라인 네트워킹을 진행해요
                    </div>
                  </div>
                </div>

                <div className={companyStyles.circleItem}>
                  <div className={`${companyStyles.circle} ${companyStyles.circlePurple}`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={companyStyles.circleIcon}
                      aria-hidden="true"
                    >
                      <rect x="4" y="6" width="6" height="6" rx="1.2" fill="#8a6bff" />
                      <rect x="14" y="6" width="6" height="6" rx="1.2" fill="#b59bff" />
                      <rect x="9" y="14" width="6" height="6" rx="1.2" fill="#6a4ce0" />
                      <path d="M10 9h4M7 12v2M17 12v2" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className={companyStyles.circleText}>
                    <div className={companyStyles.circleTitle}>AI 프로젝트</div>
                    <div className={companyStyles.circleDesc}>
                      다양한 프로젝트에 참여해볼 수 있어요
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className={companyStyles.memberWrap}>
            <div className={companyStyles.memberSection}>
              <div className={companyStyles.memberEyebrow}>SOLPCLUB MEMBER</div>
              <h2 className={companyStyles.memberTitle}>솔로프리너</h2>
              <p className={companyStyles.memberDescription}>
                솔프클럽의 멤버명으로 다양한 서비스를 제공받을 수 있는 등급입니다.
              </p>
            </div>

            <div className={companyStyles.memberCards}>
              <div className={companyStyles.memberCardItem}>
                <div className={companyStyles.memberCardMedia} />
                <div className={companyStyles.memberCardText}>
                  <div className={companyStyles.memberCardDesc}>혜택 1</div>
                  <div className={companyStyles.memberCardTitle}>
                    PRIME·PRO 전용 배지로
                    <br />
                    최고의 파트너임을 증명할 수 있어요.
                  </div>
                </div>
              </div>
              <div className={companyStyles.memberCardItem}>
                <div className={companyStyles.memberCardMedia} />
                <div className={companyStyles.memberCardText}>
                  <div className={companyStyles.memberCardDesc}>혜택 2</div>
                  <div className={companyStyles.memberCardTitle}>
                    비공개 프라이빗 프로젝트도
                    <br />
                    제약 없이 지원할 수 있어요.
                  </div>
                </div>
              </div>
              <div className={companyStyles.memberCardItem}>
                <div className={companyStyles.memberCardMedia} />
                <div className={companyStyles.memberCardText}>
                  <div className={companyStyles.memberCardDesc}>혜택 3</div>
                  <div className={companyStyles.memberCardTitle}>
                    비공개 강의 영상도
                    <br />
                    저렴하게 시청할 수 있어요.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.portfolioTitle}>Projects</h2>
        <p className={styles.portfolioDesc}>
          현재 진행 중인 프로젝트 3개를 보여줍니다.
        </p>
        <div className={styles.grid}>
          {projectItems.slice(0, 3).map((item, index) => (
            <article key={item.title} className={styles.card}>
              <div className={`${styles.projectThumb} ${styles[`projectThumb${index + 1}`]}`}>
                <span className={styles.thumbText}>{item.title}</span>
              </div>
              <div className={styles.projectTags}>
                <span className={styles.badge}>{item.status}</span>
                <span className={styles.projectTag}>{item.duration}</span>
                <span className={styles.projectTag}>{item.budget}</span>
              </div>
              <h3>{item.title}</h3>
              <Link href="/projects">View projects →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.blankSection} />

      <section className={styles.section}>
        <h2 className={styles.portfolioTitle}>포트폴리오</h2>
        <p className={styles.portfolioDesc}>
          이 섹션은 포트폴리오 페이지랑 연동되는 섹션이며, 포트폴리오 클릭 시
          포트폴리오 상세 페이지로 이동합니다.
        </p>
        <div className={styles.referenceWrap}>
          <ReferenceSlider items={portfolioItems} />
        </div>
      </section>

      <section className={styles.blankSection} />

      <section className={styles.section}>
        <h2 className={styles.partnersTitle}>PARTNERS</h2>
        <div className={styles.fullBleed}>
          <div className={styles.logoScroller} aria-label="Partner logos">
            <div className={styles.logoTrack}>
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={`${logo.src}-${index}`} className={styles.logoItem}>
                  <img className={styles.logoImage} src={logo.src} alt="Partner logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
