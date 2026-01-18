"use client";

import { useState } from "react";
import styles from "./community.module.css";

export default function ApplicationsPage() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const posts = [
    {
      id: "comm-101",
      title: "신규 프로젝트 제안서를 어떻게 준비하나요?",
      body: "클라이언트가 아직 요구사항을 명확히 주지 않았을 때 어떤 템플릿으로 정리하면 좋을까요?",
      author: "Jin Park",
      time: "10분 전",
      tags: ["프로젝트", "제안서"],
      replies: [
        {
          id: "rep-101",
          author: "Sora Lee",
          time: "5분 전",
          message: "핵심은 목표/범위를 분리하고, 미확정 항목을 표로 분리하는 거예요.",
        },
      ],
    },
    {
      id: "comm-102",
      title: "LLM PoC 진행 시 데이터 보안 체크리스트 공유해요",
      body: "내부 승인 과정에서 꼭 확인해야 하는 항목들을 정리해봤습니다.",
      author: "Min Seo",
      time: "1시간 전",
      tags: ["LLM", "보안"],
      replies: [
        {
          id: "rep-201",
          author: "Tae Park",
          time: "45분 전",
          message: "좋네요! 혹시 외부 벤더 계약 시 필수 조항도 포함되나요?",
        },
        {
          id: "rep-202",
          author: "Min Seo",
          time: "30분 전",
          message: "네, 다음 버전에 정리해서 올릴게요.",
        },
      ],
    },
    {
      id: "comm-103",
      title: "신규 멤버 온보딩에서 가장 효과 있었던 방식?",
      body: "첫 주에 온보딩을 줄이고 바로 실무를 붙이는 게 더 좋은지 고민입니다.",
      author: "Hyeon Kim",
      time: "어제",
      tags: ["온보딩", "운영"],
      replies: [],
    },
  ];

  return (
    <div className={styles.communityPage}>
      <header className={styles.communityHeader}>
        <div>
          <h1 className={styles.title}>Community</h1>
          <p className={styles.subtitle}>누구나 글을 쓰고 답을 달 수 있는 공간입니다.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="게시글 검색"
              aria-label="게시글 검색"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => setComposeOpen(true)}
          >
            글쓰기
          </button>
        </div>
      </header>

      {composeOpen ? (
        <div className={styles.modalOverlay} onClick={() => setComposeOpen(false)}>
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>글쓰기</h2>
                <p className={styles.modalSubtitle}>
                  실무 질문이나 경험 공유를 자유롭게 남겨주세요.
                </p>
              </div>
              <button className={styles.closeButton} type="button" onClick={() => setComposeOpen(false)}>
                닫기
              </button>
            </div>
            <div className={styles.composeCard}>
              <div className={styles.composeMeta}>
                <span className={styles.badge}>새 글</span>
                <span className={styles.muted}>답변은 누구나 작성할 수 있어요.</span>
              </div>
              <input className={styles.composeTitle} type="text" placeholder="제목" />
              <textarea
                className={styles.composeBody}
                placeholder="내용을 입력하세요."
                rows={5}
              />
              <div className={styles.composeActions}>
                <span className={styles.hint}>답글이 달리면 알림을 받을 수 있어요.</span>
                <button className={styles.primaryButton} type="button">
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className={styles.postList}>
        {posts
          .filter((post) => {
            const query = searchQuery.trim().toLowerCase();
            if (!query) {
              return true;
            }
            const tagText = post.tags.join(" ");
            const haystack = `${post.title} ${post.body} ${tagText}`.toLowerCase();
            return haystack.includes(query);
          })
          .map((post) => {
          const isOpen = expandedPosts.includes(post.id);
          return (
            <article key={post.id} className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={styles.postTitleRow}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <button
                  className={`${styles.textButton} ${styles.toggleButton}`}
                  type="button"
                  onClick={() =>
                    setExpandedPosts((prev) =>
                      prev.includes(post.id) ? prev.filter((id) => id !== post.id) : [...prev, post.id]
                    )
                  }
                  aria-label={isOpen ? "접기" : "열기"}
                >
                  <span className={styles.iconButton} aria-hidden="true">
                    {isOpen ? (
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 14l6-6 6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 10l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
              <div>
                <p className={styles.postBody}>{post.body}</p>
              </div>
            </div>
            <div className={styles.tagRow}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className={styles.postFooter}>
              <div className={styles.postFooterMeta}>
                <span className={styles.replyCount}>답글 {post.replies.length}</span>
                <span className={styles.postMetaInline}>
                  {post.author} · {post.time}
                </span>
              </div>
            </div>
            {isOpen ? (
              <div className={styles.replySection}>
                {post.replies.length ? (
                  <div className={styles.replyList}>
                    {post.replies.map((reply) => (
                      <div key={reply.id} className={styles.replyCard}>
                        <div className={styles.replyMeta}>
                          <span>{reply.author}</span>
                          <span>·</span>
                          <span>{reply.time}</span>
                        </div>
                        <p className={styles.replyMessage}>{reply.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyReplies}>첫 답글을 남겨주세요.</p>
                )}
                <div className={styles.replyComposer}>
                  <textarea
                    className={styles.replyInput}
                    placeholder="답글을 입력하세요."
                    rows={3}
                  />
                  <button className={styles.secondaryButton} type="button">
                    등록
                  </button>
                </div>
              </div>
            ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}
