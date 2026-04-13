'use client';

import styles from './Dashboard.module.css';

interface WeeklyHeatmapProps {
  sonoData: { data_registro: string; quantidade: number }[];
  hidratacaoData: { data_registro: string; quantidade_ml: number; meta_ml: number }[];
  alimentacaoData: { data_registro: string; quantidade_refeicoes: number; classificacao: string }[];
  treinoData: { data_registro: string; status: string }[];
  estudoData: { data_registro: string; horas_estudo: number }[];
}

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const CATEGORIES = [
  { key: 'sono', label: 'Sono', colors: ['rgba(255,255,255,0.03)', 'rgba(107, 130, 238, 0.3)', 'rgba(107, 130, 238, 0.55)', 'rgba(107, 130, 238, 0.8)', '#6B82EE'] },
  { key: 'agua', label: 'Água', colors: ['rgba(255,255,255,0.03)', 'rgba(60, 180, 194, 0.3)', 'rgba(60, 180, 194, 0.55)', 'rgba(60, 180, 194, 0.8)', '#3CB4C2'] },
  { key: 'comida', label: 'Comida', colors: ['rgba(255,255,255,0.03)', 'rgba(104, 178, 129, 0.3)', 'rgba(104, 178, 129, 0.55)', 'rgba(104, 178, 129, 0.8)', '#68B281'] },
  { key: 'treino', label: 'Treino', colors: ['rgba(255,255,255,0.03)', 'rgba(211, 89, 150, 0.3)', 'rgba(211, 89, 150, 0.55)', 'rgba(211, 89, 150, 0.8)', '#D35996'] },
  { key: 'estudos', label: 'Estudos', colors: ['rgba(255,255,255,0.03)', 'rgba(227, 168, 74, 0.3)', 'rgba(227, 168, 74, 0.55)', 'rgba(227, 168, 74, 0.8)', '#E3A84A'] },
];

function getIntensity(value: number, max: number): number {
  if (value <= 0) return 0;
  const ratio = value / max;
  if (ratio < 0.2) return 0;
  if (ratio < 0.4) return 1;
  if (ratio < 0.6) return 2;
  if (ratio < 0.8) return 3;
  return 4;
}

export default function WeeklyHeatmap({
  sonoData,
  hidratacaoData,
  alimentacaoData,
  treinoData,
  estudoData,
}: WeeklyHeatmapProps) {
  // Build a map for the last 7 days
  const last7Dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Dates.push(d.toISOString().split('T')[0]);
  }

  function getGrid(category: string): number[] {
    return last7Dates.map((date) => {
      switch (category) {
        case 'sono': {
          const item = sonoData.find((s) => s.data_registro === date);
          return getIntensity(item?.quantidade ?? 0, 10);
        }
        case 'agua': {
          const item = hidratacaoData.find((h) => h.data_registro === date);
          return getIntensity(item?.quantidade_ml ?? 0, item?.meta_ml ?? 3000);
        }
        case 'nutricao': {
          const item = alimentacaoData.find((a) => a.data_registro === date);
          return getIntensity(item?.quantidade_refeicoes ?? 0, 6);
        }
        case 'treino': {
          const item = treinoData.find((t) => t.data_registro === date);
          return item?.status === 'Concluído' ? 4 : item ? 2 : 0;
        }
        case 'estudo': {
          const item = estudoData.find((e) => e.data_registro === date);
          return getIntensity(item?.horas_estudo ?? 0, 8);
        }
        default:
          return 0;
      }
    });
  }

  return (
    <div className={`card ${styles.heatmapCard}`}>
      <h3 className={styles.chartTitle}>Visão Semanal</h3>
      <div className={styles.heatmapGrid}>
        {/* Day header row */}
        <div className={styles.heatmapRow}>
          <span className={styles.heatmapLabel} />
          {DAYS.map((day) => (
            <span key={day} className={styles.heatmapDayHeader}>
              {day}
            </span>
          ))}
        </div>

        {CATEGORIES.map((cat) => {
          const grid = getGrid(cat.key);
          return (
            <div key={cat.key} className={styles.heatmapRow}>
              <span className={styles.heatmapLabel}>{cat.label}</span>
              {grid.map((intensity, i) => (
                <div
                  key={i}
                  className={styles.heatmapCell}
                  style={{ background: cat.colors[intensity] }}
                  title={`${cat.label} - ${DAYS[i]}: nível ${intensity}`}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className={styles.heatmapLegendRow}>
        <span className={styles.heatmapLegendLabel}>Menos</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={styles.heatmapLegendCell}
            style={{
              background: `rgba(139, 92, 246, ${0.1 + i * 0.2})`,
            }}
          />
        ))}
        <span className={styles.heatmapLegendLabel}>Mais</span>
      </div>
    </div>
  );
}
