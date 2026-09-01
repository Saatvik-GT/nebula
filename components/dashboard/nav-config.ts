import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ClipboardList,
  FileText,
  FolderClosed,
  Globe,
  LayoutGrid,
  Percent,
  ScrollText,
  Settings,
  ShieldCheck,
  Target,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Custom mask PNG in /public/nav-icons; overrides `icon` when set. */
  iconSrc?: string;
};

/**
 * Every item routes to a real page/list this project defines, each backed by a
 * resource in Frontend Spec PART D.
 */
export const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Evaluator",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutGrid, iconSrc: "/nav-icons/dashboard.png" },
      { label: "Projects", href: "/projects", icon: FolderClosed, iconSrc: "/nav-icons/projects.png" },
      { label: "Atlas", href: "/atlas", icon: Globe, iconSrc: "/nav-icons/atlas.png" },
      { label: "Challenges", href: "/challenges", icon: Target, iconSrc: "/nav-icons/challenge.png" },
      { label: "Sessions", href: "/sessions", icon: ClipboardList, iconSrc: "/nav-icons/session.png" },
      { label: "Reports", href: "/reports", icon: FileText, iconSrc: "/nav-icons/report.png" },
      { label: "Evidence", href: "/evidence", icon: ShieldCheck, iconSrc: "/nav-icons/evidence.png" },
    ],
  },
  {
    heading: "System",
    items: [
      { label: "Validation", href: "/validation", icon: Percent },
      { label: "Workers", href: "/workers", icon: Boxes },
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Audit Logs", href: "/audit", icon: ScrollText },
    ],
  },
];
