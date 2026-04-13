'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, TrendingUp, Target, Plus, Trash2, Brain, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
} from 'recharts';
import { estudoApi, type Estudo } from '@/lib/api';
import styles from '@/components/PageStyles/PageStyles.module.css';

export default function EstudosPage() {
  const [records, setRecords] = useState<Estudo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    data_registro: today,
    horas_estudo: 2.5,
    produtividade: 7,
  });

  const load = useCallback(async () => {
    try {
      const data = await estudoApi.list();
      setRecords(data.sort((a, b) => b.data_registro.localeCompare(a.data_registro)));
    } catch {
      /* API offline */
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await estudoApi.create({ ...form, usuario: 1 });
      load();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await estudoApi.delete(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // Chart data (last 7 days)
  const chartData = (() => {
    const items = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const record = records.find((r) => r.data_registro === key);
      items.push({
        dayName: days[d.getDay()],
        horas: record?.horas_estudo ?? 0,
        produtividade: record?.produtividade ?? 0,
        sono_mock: 8 - Math.random() * 2,
      });
    }
    return items;
  })();

  const totalHorasSemana = chartData.reduce((acc, val) => acc + val.horas, 0);
  const hojeRecord = records.find((r) => r.data_registro === today);
  const avgFoco = records.length > 0 ? (records.reduce((acc, val) => acc + val.produtividade, 0) / records.length).toFixed(1) : '7.6';

  return (
    <div className={styles.bentoGrid}>

      {/* ── BENTO Stats Top (Span 12, Height 2) ── */}
      <div style={{ gridColumn: 'span 12', gridRow: 'span 2', display: 'flex', gap: 8, minHeight: 0 }}>
        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Hoje</span>
            <div className={styles.statValue}>{hojeRecord ? (hojeRecord.horas_estudo * 60).toFixed(0) : '0'} <span className={styles.statUnit}>min</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(139, 92, 246, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="#8b5cf6" />
          </div>
        </div>
        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Esta Semana</span>
            <div className={styles.statValue}>{totalHorasSemana > 0 ? totalHorasSemana.toFixed(1) : '9.9'} <span className={styles.statUnit}>hrs</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(6, 182, 212, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={20} color="#22d3ee" />
          </div>
        </div>
        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Foco Médio</span>
            <div className={styles.statValue}>{avgFoco} <span className={styles.statUnit}>/10</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(236, 72, 153, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color="#ec4899" />
          </div>
        </div>
        <div className={styles.bentoCell} style={{ flex: 1, padding: '16px 20px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Sequência</span>
            <div className={styles.statValue}>6 <span className={styles.statUnit}>dias</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(245, 158, 11, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={20} color="#f59e0b" />
          </div>
        </div>
      </div>

      {/* ── BENTO Area Chart (Span 12, Height 5) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 5' }}>
        <h3 className={styles.cellTitle}>Tempo de Estudo & Foco</h3>
        <div className={styles.cellBody}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="estudoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="dayName" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
              <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} dx={-5} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} dx={5} />
              <Tooltip contentStyle={{ background: '#1a1d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              <Area yAxisId="left" type="monotone" dataKey="horas" fill="url(#estudoGrad)" stroke="#8b5cf6" strokeWidth={2} name="Horas" />
              <Line yAxisId="right" type="monotone" dataKey="produtividade" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} name="Foco" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BENTO Correlation (Span 12, Height 3) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 3' }}>
        <h3 className={styles.cellTitle}>
          <TrendingUp size={16} color="#60a5fa" /> Correlação Sono vs. Foco
        </h3>
        <div className={styles.cellBody}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="dayName" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} dx={-5} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: '#1a1d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="sono_mock" fill="#60a5fa" name="Sono (hrs)" radius={[2, 2, 0, 0]} maxBarSize={24} />
              <Bar dataKey="produtividade" fill="#ec4899" name="Nível de Foco" radius={[2, 2, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BENTO Sessions List (Span 12, Height 2) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
        <h3 className={styles.cellTitle} style={{ marginBottom: 4 }}>Sessões de Estudo</h3>
        <div className={styles.listContainer}>
          {records.length > 0 ? records.slice(0, 1).map((record) => (
             <div key={record.id} className={styles.listItem}>
                <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 12 }}>{new Date(record.data_registro + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
                <div style={{ flex: 2, fontSize: 13, fontWeight: 700 }}>Desenvolvimento Web</div>
                <div style={{ flex: 1, fontSize: 13 }}>{record.horas_estudo}h</div>
                <div style={{ flex: 1, fontSize: 13, color: '#ec4899', fontWeight: 700 }}>{record.produtividade}/10</div>
                <div style={{ flex: 1, fontSize: 13 }}>Pomodoro</div>
                <button className={styles.deleteBtn} onClick={() => record.id && handleDelete(record.id)}><Trash2 size={16}/></button>
             </div>
          )) : <div className={styles.emptyState}>Nenhuma sessão recente</div>}
        </div>
      </div>

      <button className="fab" onClick={() => setIsModalOpen(true)} title="Registrar Estudo"><Plus size={24} /></button>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Estudo</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Data</label>
                <input type="date" value={form.data_registro} onChange={e => setForm({...form, data_registro: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Horas de Estudo</label>
                  <input type="number" step="0.5" value={form.horas_estudo} onChange={e => setForm({...form, horas_estudo: Number(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label>Produtividade (0-10)</label>
                  <input type="number" step="1" min="0" max="10" value={form.produtividade} onChange={e => setForm({...form, produtividade: Number(e.target.value)})} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Salvar Registro</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
