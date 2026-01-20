import Link from "next/link";
import { notFound } from "next/navigation";
import ModalCloseButton from "../../../../components/ModalCloseButton";
import ModalRoot from "../../../../components/ModalRoot";
import styles from "./page.module.css";
import { portfolioItems } from "../../../../lib/sample-data";

type PortfolioModalPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioModalPage({ params }: PortfolioModalPageProps) {
  const { slug } = await params;
  const item = portfolioItems.find((portfolio) => portfolio.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <ModalRoot>
      <div className={styles.modalOverlay}>
        <div className={styles.modalCard} role="dialog" aria-modal="true">
          <div className={styles.modalHeader}>
            <div>
              <div className={styles.badge}>
                <em>{`{Portfolio modal}`}</em>
              </div>
              <h2 className={styles.modalTitle}>{item.title}</h2>
              <p className={styles.modalSubtitle}>
                {item.category} · {item.year}
              </p>
            </div>
            <div className={styles.modalActions}>
              <Link href="/contact" className={styles.modalCta}>
                프로젝트 의뢰하러가기
              </Link>
              <ModalCloseButton className={styles.modalClose}>
                닫기
              </ModalCloseButton>
            </div>
          </div>
          <div className={styles.modalBody} data-modal-body>
            <div className={styles.modalImage}>
              <em>{`{대표 이미지 영역}`}</em>
            </div>
            <p className={styles.lead}>{item.summary}</p>
            <div className={styles.modalCopy}>
              <em>{`{Firebase Apple Open Source Development
This repository contains the source code for all Apple platform Firebase SDKs except FirebaseAnalytics.

Firebase is an app development platform with tools to help you build, grow, and monetize your app. More information about Firebase can be found on the official Firebase website.

Installation
See the subsections below for details about the different installation methods. Where available, it's recommended to install any libraries with a Swift suffix to get the best experience when writing your app in Swift.

Standard pod install
Swift Package Manager
Installing from the GitHub repo
Experimental Carthage
Standard pod install
For instructions on the standard pod install, visit: https://firebase.google.com/docs/ios/setup.

Swift Package Manager
Instructions for Swift Package Manager support can be found in the SwiftPackageManager.md Markdown file.

Installing from GitHub
These instructions can be used to access the Firebase repo at other branches, tags, or commits.

Background
See the Podfile Syntax Reference for instructions and options about overriding pod source locations.

Accessing Firebase Source Snapshots
All official releases are tagged in this repo and available via CocoaPods. To access a local source snapshot or unreleased branch, use Podfile directives like the following:

To access FirebaseFirestore via a branch:}`}</em>
            </div>
            <div className={styles.modalMeta}>
              <em>{`{Tech stack}`}</em> {item.stack.join(", ")}
            </div>
            <div className={styles.modalMeta}>
              <em>{`{Outcomes}`}</em> {item.outcomes.join(" · ")}
            </div>
          </div>
        </div>
      </div>
    </ModalRoot>
  );
}
