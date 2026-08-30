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

export type NavItem = { label: string; href: string; icon: LucideIcon };

/**
 * Every item routes to a real page/list this project defines, each backed by a
 * resource in Frontend Spec PART D.
 */
export const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Evaluator",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
      { label: "Projects", href: "/projects", icon: FolderClosed },
      { label: "Atlas", href: "/atlas", icon: Globe },
      { label: "Challenges", href: "/challenges", icon: Target },
      { label: "Sessions", href: "/sessions", icon: ClipboardList },
      { label: "Reports", href: "/reports", icon: FileText },
      { label: "Evidence", href: "/evidence", icon: ShieldCheck },
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
