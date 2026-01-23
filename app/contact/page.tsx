"use client";

import { useMemo, useState } from "react";
import ContactLayout from "./ContactLayout";
import styles from "./page.module.css";
import { saveContactSubmission } from "../lib/contact-store";

const tabs = [
  {
    id: "member",
    label: "멤버지원",
    title: "멤버지원",
    description: [
      "멤버십 구조와 활동 범위를 빠르게 훑어볼 수 있도록 정리했습니다. 참여 방식과 운영 원칙을 핵심만 담았습니다.",
      "역할과 기대치를 명확히 맞추기 위해 간단한 온보딩 과정이 있습니다. 필요한 정보만 전달해도 충분합니다.",
      "지원 의사를 남기면 담당자가 일정과 절차를 안내드립니다. 적합한 시점에 자연스럽게 연결해 드립니다.",
    ],
    formFields: [
      { type: "input", name: "fullName", placeholder: "성함" },
      { type: "input", name: "contactEmail", placeholder: "이메일" },
      {
        type: "select",
        name: "category",
        options: ["희망 분류", "AI CREATOR", "AI CODING", "AI BRANDING", "AI AGENT"],
      },
      { type: "textarea", name: "reason", placeholder: "지원 이유" },
    ],
    buttonLabel: "제출",
  },
  {
    id: "partner",
    label: "협력제안",
    title: "협력제안",
    description: [
      "브랜드, 프로젝트, 리소스 측면에서의 협업 가능성을 빠르게 정리합니다. 제안의 핵심을 공유해 주세요.",
      "서로의 강점을 묶는 방식으로 협력 구조를 설계합니다. 규모와 기간에 맞춘 옵션을 제시합니다.",
      "초기 논의 후 필요한 자료와 일정에 맞춰 후속 논의를 이어갑니다. 속도감 있게 진행합니다.",
    ],
    formFields: [
      { type: "input", name: "entityName", placeholder: "회사/팀/개인 이름" },
      { type: "input", name: "contactEmail", placeholder: "연락 이메일" },
      { type: "input", name: "coreStrength", placeholder: "주요 역량 (예: 개발, AI 영상, 자동화 등)" },
      { type: "textarea", name: "proposalReason", placeholder: "제안 이유" },
    ],
    buttonLabel: "제출",
  },
  {
    id: "estimate",
    label: "견적의뢰",
    title: "견적의뢰",
    description: [
      "프로젝트 목표와 범위를 빠르게 파악할 수 있도록 안내합니다. 핵심 요구사항만 알려주셔도 됩니다.",
      "일정과 예산 범위를 공유해 주시면 현실적인 옵션으로 제안합니다. 비용 산정 기준도 함께 설명드립니다.",
      "초기 견적 후에 상세 스코프를 정리해 확정합니다. 필요 시 단계별 진행도 가능합니다.",
    ],
    formFields: [
      { type: "input", name: "entityName", placeholder: "회사/팀/개인 이름" },
      { type: "input", name: "contactEmail", placeholder: "연락 이메일" },
      {
        type: "select",
        name: "projectType",
        options: ["프로젝트 유형", "AI CREATOR", "AI CODING", "AI BRANDING", "AI AGENT"],
      },
      { type: "textarea", name: "estimateDetails", placeholder: "견적 내용" },
    ],
    buttonLabel: "제출",
  },
];

export default function ContactPage() {
  const [activeTabId, setActiveTabId] = useState("estimate");
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[2];
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const fieldLabels = useMemo(() => {
    const map = new Map<string, string>();
    activeTab.formFields.forEach((field) => {
      if (field.type === "select") {
        map.set(field.name, field.options[0] ?? field.name);
        return;
      }
      map.set(field.name, field.placeholder);
    });
    return map;
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    setFormValues({});
  };

  const handleSubmit = () => {
    const fields = activeTab.formFields.map((field) => ({
      label: fieldLabels.get(field.name) ?? field.name,
      value: formValues[field.name] ?? "",
    }));
    saveContactSubmission({
      id: `${activeTab.id}-${Date.now()}`,
      tabId: activeTab.id,
      tabLabel: activeTab.label,
      submittedAt: new Date().toISOString(),
      fields,
    });
    setFormValues({});
  };

  return (
    <ContactLayout>
      <section className={styles.section}>
        <div className={styles.tabsRow}>
          <div className={styles.tabsHeading}>SOLPCLUB</div>
          <div className={styles.tabs} role="tablist" aria-label="Contact categories">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTabId === tab.id}
                className={`${styles.tab} ${
                  activeTabId === tab.id ? styles.tabActive : ""
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.columns}>
            <div className={styles.leftPanel}>
              <div className={styles.tabContent} role="tabpanel">
                <h3 className={styles.tabTitle}>{activeTab.title}</h3>
                <div className={styles.tabDescription}>
                  {activeTab.description.map((paragraph) => (
                    <p key={paragraph} className={styles.tabParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.divider} aria-hidden="true" />
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              {activeTab.formFields.map((field) => {
                if (field.type === "input") {
                  return (
                    <input
                      key={field.name}
                      className={styles.input}
                      placeholder={field.placeholder}
                      value={formValues[field.name] ?? ""}
                      onChange={(event) =>
                        setFormValues((prev) => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                    />
                  );
                }

                if (field.type === "select") {
                  return (
                    <select
                      key={field.name}
                      className={styles.select}
                      value={formValues[field.name] ?? field.options[0]}
                      onChange={(event) =>
                        setFormValues((prev) => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                    >
                      {field.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  );
                }

                return (
                  <textarea
                    key={field.name}
                    className={styles.textarea}
                    placeholder={field.placeholder}
                    value={formValues[field.name] ?? ""}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                );
              })}
              <button className={`${styles.button} ${styles.buttonPrimary}`} type="submit">
                {activeTab.buttonLabel}
              </button>
            </form>
          </div>
        </div>
      </section>
    </ContactLayout>
  );
}
