'use client';

import { Trophy, Flame, Droplets, BookOpen, Moon, Dumbbell, UtensilsCrossed } from 'lucide-react';
import styles from './Dashboard.module.css';

interface LevelCardProps {
  level: number;
  xp: number;
  progressPercent: number;
}

export function LevelCard({ level, xp, progressPercent }: LevelCardProps) {
  return (
    <div className={`card ${styles.levelCard}`}>
      <div className={styles.levelHeader}>
        <div>
          <span className={styles.levelLabel}>Nível</span>
          <span className={styles.levelNumber}>{level}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className={styles.levelLabel}>XP Total</span>
          <span className={styles.levelNumber}>{xp.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Progresso para Nível {level + 1}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{progressPercent}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface StreaksCardProps {
  streaks: { label: string; count: number; color: string; icon: string }[];
}

const iconMap: Record<string, React.ElementType> = {
  Moon,
  Droplets,
  UtensilsCrossed,
  Dumbbell,
  BookOpen,
};

export function StreaksCard({ streaks }: StreaksCardProps) {
  return (
    <div className={`card ${styles.streaksCard}`}>
      <div className={styles.sectionHeader}>
        <Flame size={16} color="#f59e0b" />
        <h4>Sequências Atuais</h4>
      </div>
      <div className={styles.streaksGrid}>
        {streaks.map((s) => {
          const Icon = iconMap[s.icon] || Flame;
          return (
            <div key={s.label} className={styles.streakItem} style={{ borderColor: s.color }}>
              <span className={styles.streakCount} style={{ color: s.color }}>
                {s.count}
              </span>
              <span className={styles.streakLabel}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AchievementsCardProps {
  achievements: { label: string; color: string }[];
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  return (
    <div className={`card ${styles.achievementsCard}`}>
      <div className={styles.sectionHeader}>
        <Trophy size={16} color="#f59e0b" />
        <h4>Conquistas ({achievements.length})</h4>
      </div>
      <div className={styles.achievementsList}>
        {achievements.map((a) => (
          <span
            key={a.label}
            className={styles.achievementBadge}
            style={{
              background: `${a.color}20`,
              color: a.color,
              borderColor: `${a.color}40`,
            }}
          >
            {a.label}
          </span>
        ))}
      </div>
    </div>
  );
}
