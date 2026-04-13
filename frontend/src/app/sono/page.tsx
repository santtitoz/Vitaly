'use client';

import { useState, useEffect, useCallback } from 'react';
import { Moon, Clock, TrendingUp, Plus, Trash2, Zap, ArrowUp } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { sonoApi, type Sono } from '@/lib/api';
import styles from '@/components/PageStyles/PageStyles.module.css';

export default function SonoPage() {
  const [records, setRecords] = useState<Sono[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    data_registro: today,
    hora_dormir: '22:00',
    hora_acordar: '06:00',
    quantidade: 8,
  });

  const load = useCallback(async () => {
    try {
      const data = await sonoApi.list();
      setRecords(data.sort((a, b) => b.data_registro.localeCompare(a.data_registro)));
    } catch {
      /* API offline */
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await sonoApi.create({ ...form, usuario: 1 });
      load();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await sonoApi.delete(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const chartData = [
    { dayName: 'Sun', horas: 7 },
    { dayName: 'Mon', horas: 7.5 },
    { dayName: 'Tue', horas: 6.8 },
    { dayName: 'Wed', horas: 8.1 },
    { dayName: 'Thu', horas: 7.2 },
    { dayName: 'Fri', horas: 7.8 },
    { dayName: 'Sat', horas: 8.0 },
  ];

  const avgSleep = '7.8';
  const lastNight = '8.0';

  return (
    <div className={styles.bentoGrid}>
      {/* ── BENTO Top 4 Stats (span 12, display flex) ── */}
      <div style={{ gridColumn: 'span 12', gridRow: 'span 2', display: 'flex', gap: 8, minHeight: 0 }}>
        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Última Noite</span>
            <div className={styles.statValue}>{lastNight} <span className={styles.statUnit}>hrs</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(99, 102, 241, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Moon size={20} color="#818cf8" />
          </div>
        </div>
        
        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Média de Sono</span>
            <div className={styles.statValue}>{avgSleep} <span className={styles.statUnit}>hrs</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(6, 182, 212, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} color="#22d3ee" />
          </div>
        </div>

        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Qualidade Média</span>
            <div className={styles.statValue}>7.6 <span className={styles.statUnit}>/10</span></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(139, 92, 246, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#a78bfa" />
          </div>
        </div>

        <div className={styles.bentoCell} style={{ flex: 1, padding: '12px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.statLabel}>Tendência Semanal</span>
            <div className={styles.statValue}><ArrowUp size={20} color="#34d399" /></div>
          </div>
          <div style={{ width: 40, height: 40, background: 'rgba(16, 185, 129, 0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={20} color="#34d399" />
          </div>
        </div>
      </div>

      {/* ── BENTO Main Chart ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 6' }}>
        <h3 className={styles.cellTitle}>Duração do Sono (Últimos 7 Dias)</h3>
        <div className={styles.cellBody}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="sonoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="dayName" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 12]} dx={-5} />
              <Tooltip
                contentStyle={{ background: '#1a1d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                formatter={(value: any) => [`${value}h`, 'Sono']}
              />
              <Area type="monotone" dataKey="horas" stroke="#818cf8" fill="url(#sonoGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BENTO List ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 4' }}>
        <h3 className={styles.cellTitle}>Registros de Sono Recentes</h3>
        <div className={styles.listContainer}>
          {records.length > 0 ? records.slice(0, 3).map((record, i) => {
            const dateObj = new Date(record.data_registro + 'T00:00:00');
            const dateStr = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
            return (
              <div key={record.id} className={styles.listItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: 'rgba(99, 102, 241, 0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Moon size={16} color="#818cf8" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{record.quantidade.toFixed(1)} horas</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{dateStr}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)' }}>Qualidade</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{Math.max(6, Math.floor(record.quantidade))}/10</span>
                  </div>
                  <button className={styles.deleteBtn} onClick={() => record.id && handleDelete(record.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className={styles.emptyState}>Nenhum registro encontrado</div>
          )}
        </div>
      </div>

      <button className="fab" onClick={() => setIsModalOpen(true)} title="Registrar Sono"><Plus size={24} /></button>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Sono</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Data</label>
                <input type="date" value={form.data_registro} onChange={e => setForm({...form, data_registro: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Hora de Dormir</label>
                  <input type="time" value={form.hora_dormir} onChange={e => setForm({...form, hora_dormir: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Hora de Acordar</label>
                  <input type="time" value={form.hora_acordar} onChange={e => setForm({...form, hora_acordar: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Horas Dormidas (Calculado/Ajustável)</label>
                <input type="number" step="0.5" value={form.quantidade} onChange={e => setForm({...form, quantidade: Number(e.target.value)})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Salvar Registro</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
