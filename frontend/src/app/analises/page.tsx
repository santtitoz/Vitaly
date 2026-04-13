'use client';

import { Moon, Droplets, Utensils, Brain, Dumbbell, BookOpen, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import styles from '@/components/PageStyles/PageStyles.module.css';
import RoutineScore from '@/components/Dashboard/RoutineScore';

export default function AnalisesPage() {
  const radarData = [
    { subject: 'Sono', A: 80, fullMark: 100 },
    { subject: 'Hidratação', A: 90, fullMark: 100 },
    { subject: 'Nutrição', A: 45, fullMark: 100 },
    { subject: 'Treinos', A: 75, fullMark: 100 },
    { subject: 'Estudos', A: 65, fullMark: 100 },
  ];

  const lineChartData = [
    { date: 'Jan 24', sono: 0, foco: 0 },
    { date: 'Jan 25', sono: 0, foco: 0 },
    { date: 'Jan 30', sono: 0, foco: 0 },
    { date: 'Jan 31', sono: 7.5, foco: 0.5 },
    { date: 'Feb 1', sono: 7.3, foco: 7.5 },
    { date: 'Feb 2', sono: 7.4, foco: 6.8 },
    { date: 'Feb 3', sono: 7.5, foco: 7.6 },
    { date: 'Feb 4', sono: 7.2, foco: 6.0 },
    { date: 'Feb 5', sono: 7.4, foco: 8.5 },
    { date: 'Feb 6', sono: 7.6, foco: 7.1 },
  ];

  return (
    <div className={styles.bentoGrid}>
      {/* ── BENTO TOP ── */}
      <div className={`${styles.bentoCell}`} style={{ gridColumn: 'span 5', gridRow: 'span 5' }}>
        <h3 className={styles.cellTitle} style={{ marginBottom: '8px' }}>Pontuação Geral de Saúde</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: 0 }}>
          <RoutineScore score={78} hideCard />
        </div>
      </div>

      <div className={`${styles.bentoCell}`} style={{ gridColumn: 'span 7', gridRow: 'span 5' }}>
        <h3 className={styles.cellTitle}>Visão de Cerveja</h3>
        <div className={styles.cellBody}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar name="Equilíbrio" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BENTO MIDDLE (5 mini cards) ── */}
      <div style={{ gridColumn: 'span 12', gridRow: 'span 2', display: 'flex', gap: 8, minHeight: 0 }}>
        <MetricCard title="Sono" value="7.8" unit="/ 8 hrs" icon={<Moon size={16} color="#6B82EE" />} status="neutral" progress={90} color="#6B82EE" />
        <MetricCard title="Hidratação" value="2.1" unit="/ 3 L" icon={<Droplets size={16} color="#3CB4C2" />} status="neutral" progress={70} color="#3CB4C2" />
        <MetricCard title="Alimentação" value="1800" unit="kcal" icon={<Utensils size={16} color="#68B281" />} status="neutral" progress={85} color="#68B281" />
        <MetricCard title="Estudos" value="4.2" unit="/ 4 hrs" icon={<Brain size={16} color="#E3A84A" />} status="up" progress={100} color="#E3A84A" />
        <MetricCard title="Treinos" value="45" unit="min" icon={<Dumbbell size={16} color="#D35996" />} status="up" progress={100} color="#D35996" />
      </div>

      {/* ── BENTO BOTTOM ── */}
      <div className={`${styles.bentoCell}`} style={{ gridColumn: 'span 12', gridRow: 'span 5' }}>
        <h3 className={styles.cellTitle}>Correlação Sono & Sexo</h3>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>Acompanhe como a qualidade do sono impacta seu foco nos estudos nas últimas 2 semanas</p>
        <div className={styles.cellBody}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{ background: '#1a1d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="sono" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3, fill: '#60a5fa' }} name="Sono (hrs)" />
              <Line type="monotone" dataKey="foco" stroke="#ec4899" strokeWidth={2} dot={{ r: 3, fill: '#ec4899' }} name="Nível de Foco" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa' }} />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Sono (hrs)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899' }} />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Nível de Foco</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, progress, color }: any) {
  return (
    <div className={styles.bentoCell} style={{ flex: 1, padding: 12, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <span style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)' }}>{title}</span>
        <div className={styles.statValue}>
          <span style={{ fontSize: 18 }}>{value}</span>
          <span className={styles.statUnit} style={{ fontSize: 10 }}>{unit}</span>
        </div>
      </div>
      <div className={styles.progressBar} style={{ height: 3 }}>
        <div className={styles.progressBarFill} style={{ width: `${progress}%`, background: color }} />
      </div>
    </div>
  );
}
