"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import {
  addPortfolioUpload,
  getStoredPortfolioUploads,
  type PortfolioUpload,
} from "../../lib/portfolio-upload-store";

export default function ProfilePage() {
  const skills = ["AI Agent", "AI Coding", "LLM", "RAG", "Product Strategy"];
  const categories = ["AI Solution", "AI Image/Video", "Web Development"];
  const verificationBadges = ["검증 완료", "리뷰 12", "멤버 등급 Regular"];
  const infoTabs = [
    { key: "skills", label: "기본 정보" },
    { key: "verification", label: "경력/보유 스킬" },
    { key: "portfolio", label: "포트폴리오" },
  ] as const;
  const [activeInfoTab, setActiveInfoTab] = useState<(typeof infoTabs)[number]["key"]>(
    "skills"
  );
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    url: "",
    category: "",
    hashtags: "",
    description: "",
  });
  const [uploads, setUploads] = useState<PortfolioUpload[]>([]);
  const currentUserName = "진 박";
  const noticeText =
    "외부 링크는 공개 접근이 가능한 URL만 등록해 주세요. 저작권/초상권에 문제가 있는 콘텐츠는 즉시 비노출 처리될 수 있습니다.";

  useEffect(() => {
    const refresh = () => setUploads(getStoredPortfolioUploads());
    refresh();
    window.addEventListener("portfolio-uploads-updated", refresh);
    return () => {
      window.removeEventListener("portfolio-uploads-updated", refresh);
    };
  }, []);

  const getYouTubeId = (url: string) => {
    const match =
      url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/) ??
      url.match(/youtube\.com\/embed\/([\w-]+)/);
    return match ? match[1] : null;
  };

  const portfolioVideos = useMemo(
    () =>
      uploads
        .filter((upload) => upload.ownerName === currentUserName)
        .map((upload) => ({
          ...upload,
          youtubeId: getYouTubeId(upload.url),
        })),
    [uploads]
  );

  const handleUploadSubmit = () => {
    if (!uploadForm.url.trim()) {
      return;
    }
    addPortfolioUpload({
      id: `${Date.now()}`,
      url: uploadForm.url.trim(),
      category: uploadForm.category.trim(),
      hashtags: uploadForm.hashtags
        .split(/[,#]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
      description: uploadForm.description.trim(),
      ownerName: currentUserName,
      createdAt: new Date().toISOString(),
    });
    setUploadForm({ url: "", category: "", hashtags: "", description: "" });
    setUploadModalOpen(false);
  };

  return (
    <div className={styles.profilePageShell}>
      <section className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.profileHeaderMain}>
            <label className={styles.avatarLabel}>
              <div className={styles.avatar} aria-hidden="true">
                JP
              </div>
              <div className={styles.avatarOverlay} aria-hidden="true">
                EDIT
              </div>
              <input className={styles.avatarInput} type="file" accept="image/*" />
            </label>
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>진 박</div>
              <div className={styles.profileEmail}>jin.park@example.com</div>
              <div className={styles.profileTags}>
                <span className={styles.profileTag}>Regular</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <div className={`${styles.summaryIcon} ${styles.iconBlue}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className={styles.summaryLabel}>진행한 프로젝트</div>
                <div className={styles.summaryValue}>8</div>
              </div>
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <div className={`${styles.summaryIcon} ${styles.iconGreen}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 3h12v18H6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 7h8M8 11h8M8 15h5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className={styles.summaryLabel}>지원한 프로젝트</div>
                <div className={styles.summaryValue}>5</div>
              </div>
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <div className={`${styles.summaryIcon} ${styles.iconOrange}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5h16v10H7l-3 3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className={styles.summaryLabel}>받은 제안</div>
                <div className={styles.summaryValue}>3</div>
              </div>
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <div className={`${styles.summaryIcon} ${styles.iconPurple}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4l2.2 4.5 5 .7-3.6 3.4.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.2l5-.7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className={styles.summaryLabel}>관심 프로젝트</div>
                <div className={styles.summaryValue}>4</div>
              </div>
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <div className={`${styles.summaryIcon} ${styles.iconTeal}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 6h10l4 4v8H5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M15 6v4h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className={styles.summaryLabel}>내 포트폴리오</div>
                <div className={styles.summaryValue}>6</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.infoSection} ${styles.profileCard}`}>
        <div className={styles.infoTabs}>
          {infoTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.infoTabButton} ${
                activeInfoTab === tab.key ? styles.infoTabActive : ""
              }`}
              onClick={() => setActiveInfoTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeInfoTab === "skills" && (
          <>
            <div className={styles.sectionSubtitle}>기본 정보를 입력하세요.</div>
            <div className={styles.infoForm}>
              <label className={styles.infoField}>
                <span className={styles.infoLabel}>이름</span>
                <input className={styles.input} type="text" placeholder="이름" />
              </label>
              <label className={styles.infoField}>
                <span className={styles.infoLabel}>연락처</span>
                <input className={styles.input} type="tel" placeholder="연락처" />
              </label>
              <label className={styles.infoField}>
                <span className={styles.infoLabel}>이메일</span>
                <input className={styles.input} type="email" placeholder="이메일" />
              </label>
            </div>
          </>
        )}

        {activeInfoTab === "portfolio" && (
          <div className={styles.portfolioSection}>
            <div className={styles.portfolioHeaderRow}>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => setUploadModalOpen(true)}
              >
                포트폴리오 업로드
              </button>
            </div>
            <div className={styles.portfolioGrid}>
              {portfolioVideos.length === 0 ? (
                <p className={styles.emptyState}>아직 업로드한 포트폴리오가 없습니다.</p>
              ) : (
                portfolioVideos.map((video) => (
                  <div key={video.id} className={styles.portfolioCard}>
                    <div className={styles.portfolioFrame}>
                      {video.youtubeId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title="Portfolio video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <a href={video.url} target="_blank" rel="noreferrer">
                          {video.url}
                        </a>
                      )}
                    </div>
                    <div className={styles.portfolioMeta}>
                      <div className={styles.portfolioCategory}>
                        {video.category || "기타"}
                      </div>
                      <div className={styles.portfolioDescription}>
                        {video.description || "영상 설명 없음"}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeInfoTab === "verification" && (
          <>
            <div className={styles.sectionSubtitle}>경력과 보유 스킬을 입력하세요.</div>
            <div className={styles.careerForm}>
              <label className={styles.infoField}>
                <span className={styles.infoLabel}>직군/직무</span>
                <input className={styles.input} type="text" placeholder="직군/직무" />
              </label>
              <label className={styles.infoField}>
                <span className={styles.infoLabel}>경력</span>
                <input className={styles.input} type="text" placeholder="예: 5년" />
              </label>
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.infoLabel}>프리랜서 경험</div>
              <div className={styles.toggleRow}>
                <button type="button" className={styles.toggleButton}>
                  있음
                </button>
                <button type="button" className={`${styles.toggleButton} ${styles.toggleActive}`}>
                  없음
                </button>
              </div>
            </div>

            <div className={styles.skillBlock}>
              <div className={styles.skillHeader}>
                <div className={styles.infoLabel}>보유 스킬</div>
                <button type="button" className={styles.addSkillButton}>
                  + 추가
                </button>
              </div>
              <div className={styles.skillRows}>
                <div className={styles.skillRow}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="스킬명"
                  />
                  <select className={styles.select}>
                    <option>초급</option>
                    <option>중급</option>
                    <option>고급</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      {uploadModalOpen ? (
        <div className={styles.modalOverlay} onClick={() => setUploadModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>포트폴리오 업로드</h3>
                <p className={styles.modalSubtitle}>포트폴리오 링크 정보를 입력하세요.</p>
              </div>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setUploadModalOpen(false)}
              >
                닫기
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.modalLabel}>URL</label>
              <input
                className={styles.modalInput}
                value={uploadForm.url}
                onChange={(event) =>
                  setUploadForm((prev) => ({ ...prev, url: event.target.value }))
                }
                placeholder="https://"
              />
              <label className={styles.modalLabel}>카테고리</label>
              <input
                className={styles.modalInput}
                value={uploadForm.category}
                onChange={(event) =>
                  setUploadForm((prev) => ({ ...prev, category: event.target.value }))
                }
                placeholder="예: AI Coding"
              />
              <label className={styles.modalLabel}>해시태그</label>
              <input
                className={styles.modalInput}
                value={uploadForm.hashtags}
                onChange={(event) =>
                  setUploadForm((prev) => ({ ...prev, hashtags: event.target.value }))
                }
                placeholder="#ai #portfolio"
              />
              <label className={styles.modalLabel}>영상 설명</label>
              <textarea
                className={styles.modalTextarea}
                value={uploadForm.description}
                onChange={(event) =>
                  setUploadForm((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="작품에 대한 간단한 설명을 적어주세요."
              />
              <div className={styles.noticeBox}>
                <div className={styles.noticeTitle}>안내/주의사항</div>
                <p className={styles.noticeText}>{noticeText}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setUploadModalOpen(false)}
              >
                취소
              </button>
              <button type="button" className={styles.primaryButton} onClick={handleUploadSubmit}>
                제출
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
