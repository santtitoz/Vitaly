'use client';

import { useState, useEffect, useCallback } from 'react';
import { Salad, Plus, Trash2, Droplet, Flame, Wheat, PieChart as PieIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { alimentacaoApi, type Alimentacao } from '@/lib/api';
import styles from '@/components/PageStyles/PageStyles.module.css';

const PIE_COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'];

export default function AlimentacaoPage() {
  const [records, setRecords] = useState<Alimentacao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    data_registro: today,
    quantidade_refeicoes: 3,
    horarios: '08:00, 12:00, 19:00',
    classificacao: 'Boa',
  });

  const load = useCallback(async () => {
    try {
      const data = await alimentacaoApi.list();
      setRecords(data.sort((a, b) => b.data_registro.localeCompare(a.data_registro)));
    } catch {
      /* API offline */
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await alimentacaoApi.create({ ...form, usuario: 1 });
      load();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await alimentacaoApi.delete(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const chartData = [
    { day: 'Sat', cal: 800 },
    { day: 'Sun', cal: 1200 },
    { day: 'Mon', cal: 1100 },
    { day: 'Tue', cal: 900 },
    { day: 'Wed', cal: 1300 },
    { day: 'Thu', cal: 1800 },
    { day: 'Fri', cal: 1100 },
  ];

  const pieData = [
    { name: 'Breakfast', value: 400 },
    { name: 'Lunch', value: 650 },
    { name: 'Dinner', value: 550 },
    { name: 'Snack', value: 200 },
  ];

  const todayRecord = records.find((r) => r.data_registro === today);
  const percent = 55;

  return (
    <div className={styles.bentoGrid}>

      {/* ── BENTO Top Huge Card (span 12, height 3) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 3', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Calorias de Hoje</span>
          <span style={{ fontSize: 12, color: '#34d399', fontWeight: 600 }}>1100 / 2000 kcal</span>
        </div>
        <div className={styles.progressBar} style={{ height: 6, marginBottom: 12 }}>
          <div className={styles.progressBarFill} style={{ width: `${percent}%`, background: '#34d399' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={16} color="#ef4444" style={{ marginBottom: 4 }} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>60g</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Proteína</span>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Wheat size={16} color="#f59e0b" style={{ marginBottom: 4 }} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>115g</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Carboidratos</span>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Droplet size={16} color="#3b82f6" style={{ marginBottom: 4 }} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>40g</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Gordura</span>
          </div>
        </div>
      </div>

      {/* ── BENTO Middle Left (span 5, height 5) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 5', gridRow: 'span 5' }}>
        <h3 className={styles.cellTitle}>Divisão por Refeição</h3>
        <div className={styles.cellBody}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius="65%" outerRadius="95%" paddingAngle={4} dataKey="value" stroke="none">
                  {pieData.map((e, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1a1d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            {pieData.map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i] }} />
                <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BENTO Middle Right (span 7, height 5) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 7', gridRow: 'span 5' }}>
        <h3 className={styles.cellTitle}>Calorias Semanais</h3>
        <div className={styles.cellBody}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} dx={-5} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: '#1a1d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="cal" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BENTO Bottom List (span 12, height 4) ── */}
      <div className={styles.bentoCell} style={{ gridColumn: 'span 12', gridRow: 'span 4' }}>
        <h3 className={styles.cellTitle}>Refeições de Hoje</h3>
        <div className={styles.listContainer}>
          {records.length > 0 ? (
            records.slice(0, 3).map((record, i) => (
              <div key={Math.random()} className={styles.listItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: 'rgba(245, 158, 11, 0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Salad size={18} color="#f59e0b" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{i === 0 ? 'Café Da Manhã' : 'Almoço'}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{i === 0 ? 'Oatmeal with berries' : 'Grilled chicken salad'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#34d399' }}>{i === 0 ? '450 kcal' : '650 kcal'}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>P: 25g • C: 55g • F: 15g</span>
                  </div>
                  <button className={styles.deleteBtn} onClick={() => record.id && handleDelete(record.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>Nenhum registro hoje.</div>
          )}
        </div>
      </div>

      <button className="fab" onClick={() => setIsModalOpen(true)} title="Registrar Refeição"><Plus size={24} /></button>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Refeição</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Data</label>
                <input type="date" value={form.data_registro} onChange={e => setForm({...form, data_registro: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Classificação da sua alimentacao do Dia</label>
                <select value={form.classificacao} onChange={e => setForm({...form, classificacao: e.target.value})}>
                  <option value="Ótima">Ótima</option>
                  <option value="Boa">Boa</option>
                  <option value="Regular">Regular</option>
                  <option value="Ruim">Ruim</option>
                </select>
              </div>
              <div className="form-group">
                <label>Horários das Refeições</label>
                <input type="text" value={form.horarios} onChange={e => setForm({...form, horarios: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: 8 }}>Salvar Registro</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
