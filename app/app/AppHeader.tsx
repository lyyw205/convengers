"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./portal.module.css";
import {
  getStoredPagePermissions,
  type PagePermission,
  type PagePermissionConfig,
} from "../lib/page-permission-store";
import { getMockUser, hasAllTags } from "../lib/access-control";

type NavItem = {
  href: string;
  label: string;
  requiredTags?: string[];
};

const navItems: NavItem[] = [
  { href: "/app/gallery", label: "Gallery" },
  { href: "/app/projects", label: "Projects" },
  { href: "/app/networkings", label: "Networkings" },
  { href: "/app/profile", label: "Profile" },
  { href: "/app/admin", label: "Admin", requiredTags: ["ADMIN"] },
];

export default function AppHeader() {
  const mockUser = getMockUser();
  const [permissions, setPermissions] = useState<PagePermissionConfig[]>([]);

  useEffect(() => {
    setPermissions(getStoredPagePermissions());
    const handleUpdate = () => {
      setPermissions(getStoredPagePermissions());
    };
    window.addEventListener("page-permissions-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("page-permissions-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const permissionsMap = useMemo(() => {
    if (permissions.length === 0) {
      return new Map<string, PagePermission>();
    }
    return new Map(
      permissions.map((item) => [
        item.path,
        { requiredTags: item.requiredTags },
      ])
    );
  }, [permissions]);

  const visibleNavItems = navItems.filter((item) => {
    const permission = permissionsMap.get(item.href);
    const requiredTags = permission?.requiredTags ?? item.requiredTags ?? [];
    return hasAllTags(mockUser.tags, requiredTags);
  });

  if (!mockUser.isAuthenticated) {
    return (
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/app" className={styles.brand}>
            Convengers
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/app" className={styles.brand}>
          Convengers
        </Link>
        <nav className={styles.nav}>
          {visibleNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
