'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './Dashboard.module.css';

interface SleepStudyChartProps {
  sonoData: { data_registro: string; quantidade: number }[];
  estudoData: { data_registro: string; horas_estudo: number; produtividade: number }[];
}

export default function SleepStudyChart({ sonoData, estudoData }: SleepStudyChartProps) {
  const chartData = useMemo(() => {
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const sono = sonoData.find((s) => s.data_registro === key);
      const estudo = estudoData.find((e) => e.data_registro === key);
      last7.push({
        day: dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1),
        sono: sono?.quantidade ?? null,
        foco: estudo?.produtividade ?? null,
      });
    }
    return last7;
  }, [sonoData, estudoData]);

  return (
    <div className={`card ${styles.chartCard}`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Sono vs. Foco nos Estudos</h3>
          <p className={styles.chartSubtitle}>Correlação dos últimos 7 dias</p>
        </div>
        <div className={styles.chartLegend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#06b6d4' }} />
            Sono (hrs)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#8b5cf6' }} />
            Nível de Foco
          </span>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="day"
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 10]}
          />
          <Tooltip
            contentStyle={{
              background: '#1a1d26',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#f1f5f9',
              fontSize: 13,
            }}
          />
          <Line
            type="monotone"
            dataKey="sono"
            stroke="#06b6d4"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#06b6d4', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#22d3ee' }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="foco"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#a78bfa' }}
            strokeDasharray="6 3"
            connectNulls
          />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
