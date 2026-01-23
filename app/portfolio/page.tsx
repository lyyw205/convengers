"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import styles from "./page.module.css";
import { portfolioItems } from "../lib/sample-data";
import {
  addPortfolioUpload,
  getStoredPortfolioUploads,
  type PortfolioUpload,
} from "../lib/portfolio-upload-store";

export default function PortfolioPage() {
  const categories = ["전체", "AI Creator", "AI Coding", "AI Branding", "AI Agent"] as const;
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    categories[0]
  );
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const getThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    if (id) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return "/refs/ref-01.svg";
  };

  const uploadItems = uploads.map((upload) => ({
    slug: `upload-${upload.id}`,
    title: upload.category || "Portfolio",
    category: upload.category || "기타",
    summary: upload.description || "업로드된 포트폴리오",
    image: getThumbnail(upload.url),
    link: upload.url,
    isExternal: true,
  }));

  const combinedItems = [...uploadItems, ...portfolioItems];
  const filtered = useMemo(
    () =>
      activeCategory === "전체"
        ? combinedItems
        : combinedItems.filter((item) => item.category === activeCategory),
    [activeCategory, combinedItems]
  );
  const filteredBySearch = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return filtered;
    }
    return filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term)
    );
  }, [filtered, searchTerm]);
  const columns = useMemo(() => {
    const output = [[], [], [], []] as typeof filteredBySearch[];
    filteredBySearch.forEach((item, index) => {
      output[index % 4].push(item);
    });
    return output;
  }, [filteredBySearch]);

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
    <PublicLayout
      align="left"
      topSlot={
        <div className={styles.banner}>
          <div className={styles.bannerVideo}>
            <iframe
              className={styles.bannerVideoFrame}
              src="https://www.youtube.com/embed/MH-PXXchvpo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerText}>
            <div className={styles.bannerTitle}>SOLPCLUB 멤버들의 작품입니다.</div>
            <div className={styles.bannerSubtitle}>
              멤버 포트폴리오를 기반으로 원하는 작품을 의뢰하실 수 있습니다.
            </div>
          </div>
          <div className={styles.scrollHint} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.scrollHintIcon}>
              <path
                d="M12 4v14m0 0l-5-5m5 5l5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      }
    >
      <section className={styles.section}>
        <div className={styles.filterRow}>
          <div className={styles.filterButtons}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`${styles.filterButton} ${
                  activeCategory === category ? styles.filterButtonActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.filterDivider} aria-hidden="true" />
        <div className={styles.filterActions}>
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => setUploadModalOpen(true)}
            >
              포트폴리오 업로드
            </button>
            <form
              className={styles.searchForm}
              onSubmit={(event) => {
                event.preventDefault();
                setSearchTerm(searchInput);
              }}
            >
              <div className={styles.searchField}>
                <input
                  className={styles.filterInput}
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="{검색어}"
                  aria-label="{검색어}"
                />
                <button className={styles.searchButton} type="submit" aria-label="검색">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.referenceGrid}>
          {columns.map((column, columnIndex) => (
            <div key={`col-${columnIndex}`} className={styles.referenceColumn}>
              {column.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.slug}
                    href={item.link}
                    className={styles.gridCard}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className={styles.gridMedia}>
                      <img
                        className={styles.gridImage}
                        src={item.image}
                        alt={item.title}
                      />
                      <span className={styles.gridBadge}>{item.category}</span>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={item.slug}
                    href={`/portfolio/${item.slug}`}
                    className={styles.gridCard}
                    scroll={false}
                  >
                    <div className={styles.gridMedia}>
                      <img
                        className={styles.gridImage}
                        src={item.image}
                        alt={item.title}
                      />
                      <span className={styles.gridBadge}>{item.category}</span>
                    </div>
                  </Link>
                )
              ))}
            </div>
          ))}
        </div>
        {filteredBySearch.length === 0 && (
          <p className={styles.emptyState}>해당 카테고리의 포트폴리오가 없습니다.</p>
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
    </PublicLayout>
  );
}
