'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Moon,
  Droplets,
  UtensilsCrossed,
  Dumbbell,
  BookOpen,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/', label: 'Início', icon: LayoutDashboard },
  { href: '/sono', label: 'Sono', icon: Moon },
  { href: '/hidratacao', label: 'Hidratação', icon: Droplets },
  { href: '/alimentacao', label: 'Nutrição', icon: UtensilsCrossed },
  { href: '/treinos', label: 'Treinos', icon: Dumbbell },
  { href: '/estudos', label: 'Estudos', icon: BookOpen },
  { href: '/analises', label: 'Análises', icon: BarChart3 },
  { href: '/caderno', label: 'IA', icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoText}>Vitaly</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {isActive && <span className={styles.activeDot} />}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.statusRow}>
          <span className="status-dot status-online" />
          <span className={styles.statusText}>Online • Sincronizado</span>
        </div>
      </div>
    </aside>
  );
}
