import PublicLayout from "../components/PublicLayout";
import styles from "../public.module.css";

export default function CompanyPage() {
  return (
    <PublicLayout
      title="솔프클럽에 대한 설명을 엄청나게 자세히 작성한다면 이페이지인데 이건 추후 논의하는게 좋을 것 같습니다."
      subtitle="Convengers curates specialists, verifies delivery, and keeps a public trail of work so every new project starts with proof."
      align="center"
    >
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>Who we are</div>
          <h2 className={styles.headline}>A partner network with accountable delivery.</h2>
          <p className={styles.lead}>
            We combine a public portfolio with a private operating system to
            keep quality, pace, and accountability aligned. Every reference is
            reviewed, and every partner is tracked across projects.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>How we work</div>
          <ul className={styles.list}>
            <li>Intake and scope workshops to lock priorities.</li>
            <li>Partner matching based on verified outcomes.</li>
            <li>Weekly proof updates and post-launch reviews.</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.badge}>Capability</div>
            <h3>Product strategy</h3>
            <p className={styles.lead}>
              Roadmaps, research synthesis, and scoped delivery plans.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.badge}>Capability</div>
            <h3>Design + Engineering</h3>
            <p className={styles.lead}>
              Cross-functional pods built for speed and consistency.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.badge}>Capability</div>
            <h3>Growth &amp; ops</h3>
            <p className={styles.lead}>
              Activation, lifecycle improvements, and operational tooling.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
