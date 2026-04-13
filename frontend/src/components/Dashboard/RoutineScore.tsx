'use client';

import styles from './Dashboard.module.css';

interface RoutineScoreProps {
  score: number;
  hideCard?: boolean;
}

export default function RoutineScore({ score, hideCard }: RoutineScoreProps) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = score / 100;
  const offset = circumference - percent * circumference;

  let grade = 'Ótimo';
  let gradeColor = '#10b981';
  if (score < 50) {
    grade = 'Ruim';
    gradeColor = '#ef4444';
  } else if (score < 70) {
    grade = 'Regular';
    gradeColor = '#f59e0b';
  } else if (score < 85) {
    grade = 'Bom';
    gradeColor = '#f59e0b';
  }

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* If it's the standalone card, we render the header inside 'content' */}
      {!hideCard && (
        <div className={styles.routineHeader}>
          <h3 className={styles.chartTitle}>Pontuação da Rotina</h3>
          <span className="badge badge-green" style={{ fontSize: 11 }}>↗ +5%</span>
        </div>
      )}

      <div className={styles.routineRing} style={{ width: '100%', maxWidth: '140px', margin: 'auto', aspectRatio: '1/1', display: 'flex', alignItems: 'center' }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="routineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#routineGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
          <text
            x="50%"
            y="45%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="white"
            fontSize="36"
            fontWeight="800"
          >
            {score}
          </text>
          <text
            x="50%"
            y="70%"
            dominantBaseline="central"
            textAnchor="middle"
            fill={gradeColor}
            fontSize="14"
            fontWeight="600"
          >
            {grade}
          </text>
        </svg>
      </div>

      <div className={styles.routineStats} style={{ marginTop: hideCard ? 'auto' : 12, borderTop: hideCard ? 'none' : '1px solid var(--border-secondary)' }}>
        <div className={styles.routineStat}>
          <span className={styles.routineStatValue}>7</span>
          <span className={styles.routineStatLabel}>Dias Sequência</span>
        </div>
        <div className={styles.routineStat}>
          <span className={styles.routineStatValue}>28</span>
          <span className={styles.routineStatLabel}>Metas Atingidas</span>
        </div>
      </div>
    </div>
  );

  if (hideCard) return content;

  return (
    <div className={`card ${styles.routineCard}`}>
      {content}
    </div>
  );
}
