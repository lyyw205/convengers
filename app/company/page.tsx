import PublicLayout from "../components/PublicLayout";
import styles from "./company.module.css";

export default function CompanyPage() {
  return (
    <PublicLayout
      title={`솔프클럽(SOLP CLUB)
| AI 비즈니스 커뮤니티 소개서`}
      titleClassName={styles.pageTitle}
      subtitle="솔프클럽(SOLP CLUB)은 ㈜컨벤져스 산하 AI 비즈니스 커뮤니티로, AI 솔로프러너·1인 기업·스타트업. 기업이 스터디 → 프로젝트 → 협업 → 수익화를 만드는 실전 연합형 비즈니스형 커뮤니티입니다."
      align="left"
    >
      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}># About SOLP CLUB</h2>
          <aside className={styles.callout}>
            <span className={styles.calloutIcon} aria-hidden="true">
              💡
            </span>
            <div>
              <strong className={styles.calloutTitle}>
                [ AI Study ] [ AI Networking ] [ AI Project ]
              </strong>
            </div>
          </aside>
          <p className={styles.lead}>㈜컨벤져스의 자회사, 솔프클럽</p>
          <ul className={styles.list}>
            <li>직장인 사업 연구소를 피벗해서 (주)컨벤져스의 커뮤니티로 통합</li>
            <li>
              직장인 사업 연구소(직사연) : 누적 50회 이상 비즈니스 프로젝트, 500회 이상
              네트워킹 진행
            </li>
          </ul>
          <img
            className={styles.futureImage}
            src="/company/image/solpclub-future.png"
            alt="솔프클럽이 만들고 싶은 미래"
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>팀원 소개</h2>
          <ul className={styles.list}>
            <li>(주) 컨벤져스& 솔프클럽 대표 : 권중우 대표</li>
            <li>솔프클럽 대표(전, 직장인 사업 연구소 운영) : 손병진 대표</li>
          </ul>
          <div className={styles.peopleGrid}>
            <img
              className={styles.peopleImage}
              src="/company/image/권중우.webp"
              alt="권중우 대표"
            />
            <img
              className={styles.peopleImage}
              src="/company/image/손병진.webp"
              alt="손병진 대표"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}># Business Model</h2>
          <ul className={styles.list}>
            <li>
              <strong>AI 네트워킹 :</strong> AI 업계의 분들간의 시너지 날 수 있는
              고밀도 커뮤니티
            </li>
            <li>
              <strong>AI 스터디 :</strong> 단순 이론이 아닌, 비즈니스 자동화 및
              수익화를 위한 실무 중심 스터디
            </li>
            <li>
              <strong>AI 프로젝트 :</strong> 연합형 비즈니스 모델 구축 및 실제 시장
              검증(MVP) 프로젝트 진행
            </li>
          </ul>
          <div className={styles.peopleGrid}>
            <img
              className={styles.assetImage}
              src="/company/image/프로젝트%20협업.webp"
              alt="프로젝트 협업"
            />
            <img
              className={styles.assetImage}
              src="/company/image/ai%20networking.webp"
              alt="AI networking"
            />
            <img
              className={styles.assetImage}
              src="/company/image/ai%20study.webp"
              alt="AI study"
            />
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
