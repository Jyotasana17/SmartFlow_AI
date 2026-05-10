"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Ambulance,
  BarChart3,
  BrainCircuit,
  LayoutDashboard,
  Radio,
  Settings,
  SlidersHorizontal,
  UserCircle,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/monitoring", label: "Monitoring", icon: Radio },
  { href: "/control", label: "AI Control", icon: BrainCircuit },
  { href: "/prediction", label: "Prediction", icon: Activity },
  { href: "/emergency", label: "Emergency", icon: Ambulance },
  { href: "/simulation", label: "Simulation", icon: Waypoints },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/human-centric", label: "Human-Centric", icon: UserCircle },
  { href: "/admin", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-20 border-r border-cyan-300/15 bg-slate-950/65 backdrop-blur-xl lg:block">
      <nav className="flex h-full flex-col items-center gap-2 py-4">
        {nav.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "group grid h-12 w-12 place-items-center rounded-md border border-transparent text-cyan-100/55 transition",
                "hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-cyan-50",
                active && "border-cyan-300/40 bg-cyan-300/15 text-cyan-50 shadow-glow",
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
        <div className="mt-auto grid h-12 w-12 place-items-center rounded-md border border-cyan-300/15 bg-cyan-300/5 text-cyan-100/50">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
      </nav>
    </aside>
  );
}
