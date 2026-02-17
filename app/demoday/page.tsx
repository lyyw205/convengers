import styles from "./demoday.module.css";

const APPLY_URL = "https://forms.gle/solplus-demoday-2026";

const faqItems = [
  {
    q: "Q. 실시간 투자 투표는 실제 투자로 이어지나요?",
    a: "네. 관객 투표는 가상 투자 형태로 진행되지만, 우승팀에게는 자문위원단과 연계 VC의 실제 투자 미팅이 연결됩니다. 지난 시즌 우승팀 2팀이 데모데이 이후 3개월 내 실제 투자를 유치했습니다.",
  },
  {
    q: "Q. 참가비가 있나요?",
    a: "관객 참여비는 7,000원이며, 발표팀은 무료입니다. 참가비에는 네트워킹 케이터링과 행사 자료가 포함되어 있습니다.",
  },
  {
    q: "Q. 좌석이 만석되면 어떻게 되나요?",
    a: "선착순 100명 마감이며, 마감 이후에는 대기자 등록이 가능합니다. 취소 발생 시 대기 순서대로 안내드립니다. 조기 마감이 예상되므로 빠른 신청을 권장합니다.",
  },
  {
    q: "Q. 환불이 가능한가요?",
    a: "행사 3일 전(2/24)까지 100% 환불 가능합니다. 이후에는 환불이 불가하며, 양도는 사전 문의 시 가능합니다.",
  },
  {
    q: "Q. 어떤 팀이 발표자로 참가할 수 있나요?",
    a: "AI 기술을 활용한 프로덕트 또는 서비스를 보유한 팀이라면 누구나 지원 가능합니다. 사전 심사를 거쳐 최종 10팀이 선발되며, MVP 또는 프로토타입 단계 이상의 팀을 우선합니다.",
  },
  {
    q: "Q. 온라인으로도 참여할 수 있나요?",
    a: "현재 오프라인 참석만 가능합니다. 실시간 투표와 네트워킹이 핵심인 행사 특성상, 현장 참여를 권장합니다.",
  },
  {
    q: "Q. 주차가 가능한가요?",
    a: "파르나스타워 지하 주차장 이용 가능하며, 주차 요금은 별도입니다. 대중교통 이용을 권장드립니다. (삼성역 5번 출구 도보 3분)",
  },
];

const benefitTeam = [
  { icon: "💰", label: "투자 연계" },
  { icon: "🎓", label: "전문 멘토링" },
  { icon: "🏠", label: "공간 지원" },
];

const benefitAudience = [
  { icon: "🤝", label: "네트워킹" },
  { icon: "📺", label: "트렌드 인사이트" },
];

const timelineItems = [
  { time: "18:30", title: "Opening Bell", desc: "네트워킹 & 입장" },
  { time: "19:00", title: "Survivaltime", desc: "AI 팀 10팀 생존 발표", highlight: true },
  { time: "20:00", title: "Break", desc: "휴식" },
  { time: "20:15", title: "Real-time Funding", desc: "실시간 투자 투표 & 우승자 발표" },
  { time: "20:50", title: "Networking", desc: "클로징 네트워킹" },
  { time: "21:30", title: "End", desc: "행사 종료" },
];

const partners = [
  {
    name: "블루포인트파트너스",
    logo: "🔵",
    members: [{ name: "김서준", role: "대표" }],
  },
  {
    name: "소프트뱅크벤처스",
    logo: "🟡",
    members: [{ name: "이하은", role: "파트너" }],
  },
  {
    name: "네이버 AI Lab",
    logo: "🟢",
    members: [{ name: "박도윤", role: "前 CTO" }],
  },
  {
    name: "매쉬업엔젤스",
    logo: "🟣",
    members: [{ name: "정민채", role: "대표" }],
  },
];

const advisors = [
  {
    name: "김서준",
    role: "블루포인트파트너스 대표",
    desc: "초기 스타트업 투자 전문 / 누적 포트폴리오 120개사",
  },
  {
    name: "이하은",
    role: "소프트뱅크벤처스 파트너",
    desc: "AI·딥테크 분야 투자 심사역 / 전 카카오벤처스",
  },
  {
    name: "박도윤",
    role: "前 네이버 AI Lab CTO",
    desc: "대규모 언어모델(LLM) 연구 총괄 / NeurIPS 논문 다수",
  },
  {
    name: "정민채",
    role: "매쉬업엔젤스 대표",
    desc: "스타트업 액셀러레이팅 15년 / EXIT 8건, 유니콘 2개사 배출",
  },
];

const teams = [
  {
    name: "Team Alpha",
    emoji: "🤖",
    desc: "자연어 처리 기반 고객 상담 자동화 솔루션. 기업 CS 비용을 80% 절감하고 고객 만족도를 동시에 높이는 AI 어시스턴트를 개발합니다.",
  },
  {
    name: "Team Beta",
    emoji: "🧠",
    desc: "의료 영상 AI 진단 플랫폼. 딥러닝 기술로 X-ray, CT 영상을 실시간 분석하여 조기 진단 정확도를 95% 이상으로 끌어올립니다.",
  },
  {
    name: "Team Gamma",
    emoji: "⚡",
    desc: "AI 기반 에너지 최적화 시스템. 건물 에너지 소비 패턴을 학습하여 전력 사용량을 30% 절감하는 스마트 빌딩 솔루션을 제공합니다.",
  },
  {
    name: "Team Delta",
    emoji: "🚀",
    desc: "생성형 AI 콘텐츠 제작 도구. 브랜드 가이드라인을 학습해 일관된 마케팅 콘텐츠를 자동 생성하여 제작 시간을 10배 단축합니다.",
  },
  {
    name: "Team Epsilon",
    emoji: "🔬",
    desc: "AI 신약 개발 가속 플랫폼. 분자 구조 시뮬레이션과 임상 데이터 분석을 결합하여 신약 후보 물질 탐색 기간을 획기적으로 단축합니다.",
  },
];

export default function DemodayPage() {
  return (
    <>
      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.navLogo}>SOLPLUS</span>
          <div className={styles.navLinks}>
            <a href="#hero" className={styles.navLink}>소개</a>
            <a href="#program" className={styles.navLink}>프로그램</a>
            <a href="#teams" className={styles.navLink}>참가팀</a>
            <a href="#benefits" className={styles.navLink}>혜택</a>
            <a href="#faq" className={styles.navLink}>FAQ</a>
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={styles.navCta}>참여 신청</a>
          </div>
        </div>
      </nav>

      {/* S1: Hero */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            SHOW ME THE AI
          </h1>
          <p className={styles.heroSubtitle}>
            10팀의 AI 스타트업, 120분의 생존 발표,<br />
            <strong>100억 규모 투자 연계</strong>
          </p>
          <p className={styles.heroDesc}>
            관객 100명이 투자자가 되어 <strong>실시간으로 우승팀을 결정</strong>합니다.<br />
            지난 시즌 우승 2팀, 3개월 내 실제 투자 유치 성공.
          </p>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={styles.heroCta}>
            참여 신청하기 →
          </a>
          <p className={styles.heroMeta}>주최: SOLPLUS &nbsp;|&nbsp; 선착순 100명</p>
        </div>
      </section>

      {/* S2: Innovation + Numbers */}
      <section className={`${styles.section} ${styles.numbers}`}>
        <div className={styles.sectionInner}>
          <div className={styles.innovationBlock}>
            <h2 className={styles.innovationKeyword}>도약</h2>
            <p className={styles.innovationEn}>Next Chapter</p>
            <p className={styles.innovationDesc}>
              AI의 가능성을 직접 목격하고, 시장의 방향을 먼저 읽는 자리.
              <br />
              120분, 이 안에서 AI의 다음 챕터가 시작됩니다.
            </p>
          </div>
          <div className={styles.numberBtnRow}>
            <div className={styles.numberBtn}>
              <span className={styles.numberBtnLabel}>투자 연계 규모</span>
              <span className={styles.numberBtnValue}>100억+</span>
            </div>
            <div className={styles.numberBtn}>
              <span className={styles.numberBtnLabel}>우승팀 투자금</span>
              <span className={styles.numberBtnValue}>최대 1억</span>
            </div>
            <div className={styles.numberBtn}>
              <span className={styles.numberBtnLabel}>참가 팀 (선발)</span>
              <span className={styles.numberBtnValue}>10팀</span>
            </div>
          </div>
        </div>
      </section>

      {/* S2.5: Problem Section */}
      <section className={styles.problemSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.problemTitle}>
            이런 고민, <span className={styles.problemHighlight}>해보신 적 있나요?</span>
          </h2>

          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <span className={styles.problemEmoji}>🤔</span>
              <h3>For AI 스타트업</h3>
              <ul className={styles.problemList}>
                <li>"AI 프로덕트를 만들었는데, 투자자에게 어떻게 피칭해야 할지 막막해요"</li>
                <li>"초기 스타트업이라 VC 미팅 기회 자체가 없어요"</li>
                <li>"우리 제품이 시장에서 통할지 검증하고 싶어요"</li>
              </ul>
            </div>

            <div className={styles.problemCard}>
              <span className={styles.problemEmoji}>👀</span>
              <h3>For 투자자·업계 종사자</h3>
              <ul className={styles.problemList}>
                <li>"AI 트렌드를 따라가기 벅차요. 누가 진짜 게임체인저인지 어떻게 알죠?"</li>
                <li>"네트워킹 행사는 많은데, 실제 투자로 이어지는 자리는 거의 없어요"</li>
                <li>"AI 시장의 다음 주자를 미리 발굴하고 싶어요"</li>
              </ul>
            </div>
          </div>

          <div className={styles.problemCta}>
            <p className={styles.problemCtaText}>
              <strong>SHOW ME THE AI</strong>는 이 모든 고민을 <span>120분 안에</span> 해결합니다.
            </p>
          </div>
        </div>
      </section>

      {/* S3: Points Section (4 Points) */}
      <section id="program" className={styles.pointsSection}>
        {/* Points Headline */}
        <div className={styles.pointBlock}>
          <div className={styles.sectionInner}>
            <h2 className={styles.pointsHeadline}>
              솔프클럽의 <span className={styles.pointsHighlight}>데모데이</span>는
              <br />
              다른 AI 네트워킹과 <span className={styles.pointsHighlight}>다릅니다.</span>
            </h2>
          </div>
        </div>

        {/* Point 1 */}
        <div className={styles.pointBlock}>
          <div className={styles.sectionInner}>
            <div className={styles.pointLabel}>Point 1</div>
            <h3 className={styles.pointTitle}>실시간 투표를 통한 우승팀 결정</h3>
            <p className={styles.pointDesc}>
              관객 100명 전원이 가상 투자자가 됩니다. 실시간 투자 투표로 우승팀이 결정되고, 발표팀은 대중의 선택을 통해 서비스의 시장성을 무대 위에서 직접 검증할 수 있습니다.
            </p>
            <div className={styles.pointVisual}>
              <div className={styles.mockupScreen}>
                <div className={styles.mockupHeader}>
                  <span className={styles.mockupDot} />
                  <span className={styles.mockupDot} />
                  <span className={styles.mockupDot} />
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.mockupTitle}>실시간 투자 투표</div>
                  <div className={styles.mockupBars}>
                    <div className={styles.mockupBarRow}>
                      <span className={styles.mockupBarLabel}>Team A</span>
                      <div className={styles.mockupBarTrack}>
                        <div className={styles.mockupBarFill} style={{ width: "78%" }} />
                      </div>
                      <span className={styles.mockupBarValue}>3,200만</span>
                    </div>
                    <div className={styles.mockupBarRow}>
                      <span className={styles.mockupBarLabel}>Team B</span>
                      <div className={styles.mockupBarTrack}>
                        <div className={styles.mockupBarFill} style={{ width: "62%" }} />
                      </div>
                      <span className={styles.mockupBarValue}>2,540만</span>
                    </div>
                    <div className={styles.mockupBarRow}>
                      <span className={styles.mockupBarLabel}>Team C</span>
                      <div className={styles.mockupBarTrack}>
                        <div className={styles.mockupBarFill} style={{ width: "45%" }} />
                      </div>
                      <span className={styles.mockupBarValue}>1,850만</span>
                    </div>
                    <div className={styles.mockupBarRow}>
                      <span className={styles.mockupBarLabel}>Team D</span>
                      <div className={styles.mockupBarTrack}>
                        <div className={styles.mockupBarFill} style={{ width: "31%" }} />
                      </div>
                      <span className={styles.mockupBarValue}>1,270만</span>
                    </div>
                  </div>
                  <div className={styles.mockupFooter}>
                    <div className={styles.mockupBtn}>투자하기</div>
                    <span className={styles.mockupTimer}>남은 시간 02:34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Point 2 */}
        <div className={`${styles.pointBlock} ${styles.pointBlockGray}`}>
          <div className={styles.sectionInner}>
            <div className={styles.pointLabel}>Point 2</div>
            <h3 className={styles.pointTitle}>실전 투자 AI 쇼케이스</h3>
            <p className={styles.pointDesc}>
              단순 발표가 아닌, 다양한 VC와 연계하여 실제 투자까지 이어지는 실전형 투자 쇼케이스입니다.
            </p>
            <div className={styles.pointVisual}>
              <div className={styles.growthImage}>
                <svg viewBox="0 0 480 200" className={styles.growthSvg}>
                  <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 180 Q60 170 120 140 T240 80 T360 40 T480 10" fill="none" stroke="#22c55e" strokeWidth="3" />
                  <path d="M0 180 Q60 170 120 140 T240 80 T360 40 T480 10 L480 200 L0 200 Z" fill="url(#growthGrad)" />
                  <circle cx="120" cy="140" r="5" fill="#22c55e" />
                  <circle cx="240" cy="80" r="5" fill="#22c55e" />
                  <circle cx="360" cy="40" r="5" fill="#22c55e" />
                  <circle cx="480" cy="10" r="5" fill="#22c55e" />
                  <text x="120" y="165" textAnchor="middle" fontSize="11" fill="#9ca3af">Seed</text>
                  <text x="240" y="105" textAnchor="middle" fontSize="11" fill="#9ca3af">Series A</text>
                  <text x="360" y="65" textAnchor="middle" fontSize="11" fill="#9ca3af">Series B</text>
                  <text x="456" y="35" textAnchor="middle" fontSize="11" fill="#9ca3af">Exit</text>
                </svg>
                <p className={styles.growthCaption}>Demo Day를 통한 스타트업 성장 곡선</p>
              </div>
            </div>
          </div>
        </div>

        {/* Point 3 */}
        <div className={styles.pointBlock}>
          <div className={styles.sectionInner}>
            <div className={styles.pointLabel}>Point 3</div>
            <h3 className={styles.pointTitle}>주요 혜택</h3>
            <p className={styles.pointDesc}>
              우승팀에게는 투자 연계부터 멘토링, 공간 지원까지.
              <br />
              참여한 모든 분들에게는 AI 업계 핵심 플레이어와의 네트워킹 기회를 제공합니다.
            </p>
            <div className={styles.benefitGroups}>
              <div className={`${styles.benefitGroup} ${styles.benefitGroupBlue}`}>
                <span className={`${styles.benefitGroupLabel} ${styles.benefitGroupLabelBlue}`}>For Team</span>
                <div className={styles.benefitCircleRow}>
                  {benefitTeam.map((b) => (
                    <div key={b.label} className={styles.benefitCircle}>
                      <div className={`${styles.benefitCircleIcon} ${styles.benefitCircleIconBlue}`}>{b.icon}</div>
                      <div className={styles.benefitCircleLabel}>{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${styles.benefitGroup} ${styles.benefitGroupGreen}`}>
                <span className={`${styles.benefitGroupLabel} ${styles.benefitGroupLabelGreen}`}>For You</span>
                <div className={styles.benefitCircleRow}>
                  {benefitAudience.map((b) => (
                    <div key={b.label} className={styles.benefitCircle}>
                      <div className={`${styles.benefitCircleIcon} ${styles.benefitCircleIconGreen}`}>{b.icon}</div>
                      <div className={styles.benefitCircleLabel}>{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Point 4 */}
        <div className={`${styles.pointBlock} ${styles.pointBlockGray}`}>
          <div className={styles.sectionInner}>
            <div className={styles.pointLabel}>Point 4</div>
            <h3 className={styles.pointTitle}>데모데이 타임라인</h3>
            <p className={styles.pointDesc}>
              2026. 02. 27(목) 18:30 – 21:30 | 서울 강남구 역삼로 180 지하1층(이벤트홀)
            </p>
            <div className={styles.horizTimeline}>
              {timelineItems.map((item, i) => (
                <div key={item.time} className={styles.horizTimelineItem}>
                  <div className={styles.horizTimelineDotWrap}>
                    <div
                      className={`${styles.horizTimelineDot} ${item.highlight ? styles.horizTimelineDotHighlight : ""}`}
                    />
                    {i < timelineItems.length - 1 && (
                      <div className={styles.horizTimelineLine} />
                    )}
                  </div>
                  <div className={styles.horizTimelineTime}>{item.time}</div>
                  <div
                    className={`${styles.horizTimelineTitle} ${item.highlight ? styles.horizTimelineTitleHighlight : ""}`}
                  >
                    {item.title}
                  </div>
                  <div className={styles.horizTimelineDesc}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S5: Teams */}
      <section id="teams" className={`${styles.section} ${styles.teams}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>현재 참가팀</h2>
          <p className={styles.sectionDesc}>
            AI 자동화, AI 영상, 필름 메이커 등 다양한 분야의 팀이 신청하셨습니다.
          </p>
          <div className={styles.teamGrid}>
            {teams.map((team) => (
              <div key={team.name} className={styles.teamCard}>
                <div className={styles.teamCardFront}>
                  <div className={styles.teamLogo}>{team.emoji}</div>
                  <div className={styles.teamName}>{team.name}</div>
                </div>
                <div className={styles.teamCardOverlay}>
                  <div className={styles.teamOverlayName}>{team.name}</div>
                  <div className={styles.teamOverlayDesc}>{team.desc}</div>
                </div>
              </div>
            ))}
            {/* 6th card: CTA */}
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={styles.teamCard}>
              <div className={styles.teamCardFront}>
                <div className={styles.teamLogo}>＋</div>
                <div className={styles.teamName}>참가 신청하기</div>
              </div>
              <div className={styles.teamCardOverlay}>
                <div className={styles.teamOverlayName}>참가 신청하기</div>
                <div className={styles.teamOverlayDesc}>
                  AI 프로젝트를 가진 팀이라면 지금 바로 도전하세요. 발표자 또는 관객으로 참여할 수 있습니다.
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* S6: Partners */}
      <section id="benefits" className={`${styles.section} ${styles.advisors}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.advisorTitle}>파트너스</h2>
          <p className={styles.advisorSubtitle}>
            데모데이와 함께하는 기업과 자문위원을 소개합니다.
          </p>
          <div className={styles.partnerSplit}>
            <div className={styles.partnerSplitLeft}>
              <span className={styles.partnerSplitLabel}>파트너 기업</span>
              <div className={styles.partnerLogoGrid}>
                {partners.map((p) => (
                  <div key={p.name} className={styles.partnerLogoCard}>
                    <span className={styles.partnerLogoCardIcon}>{p.logo}</span>
                    <span className={styles.partnerLogoCardName}>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.partnerSplitRight}>
              <span className={styles.partnerSplitLabel}>자문위원</span>
              <div className={styles.partnerPeopleList}>
                {advisors.map((a) => (
                  <div key={a.name} className={styles.partnerPerson}>
                    <span className={styles.partnerPersonName}>{a.name}</span>
                    <span className={styles.partnerPersonRole}>{a.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* S8: FAQ */}
      <section id="faq" className={`${styles.section} ${styles.faq}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>❓ 자주 묻는 질문</h2>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary>
                  {item.q}
                  <span className={styles.faqArrow}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* S9: Final CTA */}
      <section id="apply" className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <div className={styles.ctaShared}>
            <div className={styles.ctaSharedRow}>
              <span className={styles.ctaSharedSide}>당신의</span>
              <span className={styles.ctaSharedSide}>보여주세요.</span>
            </div>
            <h2 className={styles.ctaSharedCenter}>AI를</h2>
            <div className={styles.ctaSharedRow}>
              <span className={styles.ctaSharedSide}>미래의</span>
              <span className={styles.ctaSharedSide}>만나보세요.</span>
            </div>
          </div>
          <p className={styles.finalCtaDate}>2026. 02. 27(목) 19:00</p>
          <p className={styles.finalCtaLocation}>📍 서울 강남구 역삼로 180 지하1층(이벤트홀)</p>
          <div className={styles.finalCtaBtns}>
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={styles.finalCtaBtn}>
              지금 신청하기
            </a>
            <button className={styles.finalShareBtn}>
              공유하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>SOLPLUS</span>
          <div className={styles.footerLinks}>
            <a href="/terms" className={styles.footerLink}>이용약관</a>
            <a href="/privacy" className={styles.footerLink}>개인정보처리방침</a>
            <a href="/contact" className={styles.footerLink}>문의</a>
          </div>
        </div>
      </footer>
    </>
  );
}
