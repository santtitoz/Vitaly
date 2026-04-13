'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import SleepStudyChart from '@/components/Dashboard/SleepStudyChart';
import WeeklyHeatmap from '@/components/Dashboard/WeeklyHeatmap';
import ProgressRing from '@/components/Dashboard/ProgressRing';
import RoutineScore from '@/components/Dashboard/RoutineScore';
import { LevelCard, StreaksCard, AchievementsCard } from '@/components/Dashboard/GamificationCards';
import QuickAddModal from '@/components/QuickAdd/QuickAddModal';
import styles from '@/components/Dashboard/Dashboard.module.css';
import pageStyles from '@/components/PageStyles/PageStyles.module.css';
import {
  sonoApi,
  estudoApi,
  hidratacaoApi,
  alimentacaoApi,
  treinoApi,
  type Sono,
  type Estudo,
  type Hidratacao,
  type Alimentacao,
  type Treino,
} from '@/lib/api';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export default function DashboardPage() {
  const [sonoData, setSonoData] = useState<Sono[]>([]);
  const [estudoData, setEstudoData] = useState<Estudo[]>([]);
  const [hidratacaoData, setHidratacaoData] = useState<Hidratacao[]>([]);
  const [alimentacaoData, setAlimentacaoData] = useState<Alimentacao[]>([]);
  const [treinoData, setTreinoData] = useState<Treino[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [sono, estudo, hidratacao, alimentacao, treino] = await Promise.allSettled([
        sonoApi.list(),
        estudoApi.list(),
        hidratacaoApi.list(),
        alimentacaoApi.list(),
        treinoApi.list(),
      ]);
      if (sono.status === 'fulfilled') setSonoData(sono.value);
      if (estudo.status === 'fulfilled') setEstudoData(estudo.value);
      if (hidratacao.status === 'fulfilled') setHidratacaoData(hidratacao.value);
      if (alimentacao.status === 'fulfilled') setAlimentacaoData(alimentacao.value);
      if (treino.status === 'fulfilled') setTreinoData(treino.value);
    } catch {
      // API not running — use empty data
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Today's data for progress rings
  const today = getToday();
  const todayHidratacao = hidratacaoData.find((h) => h.data_registro === today);
  const todayAlimentacao = alimentacaoData.find((a) => a.data_registro === today);
  const todayEstudo = estudoData.find((e) => e.data_registro === today);

  const waterPercent = todayHidratacao ? todayHidratacao.quantidade_ml : 0;
  const waterMeta = todayHidratacao?.meta_ml ?? 3000;
  const calValue = todayAlimentacao ? todayAlimentacao.quantidade_refeicoes : 0;
  const focusValue = todayEstudo ? todayEstudo.horas_estudo : 0;

  // Calculate routine score from available data
  const routineScore = Math.min(
    100,
    Math.round(
      (waterPercent / waterMeta) * 25 +
      (calValue / 5) * 25 +
      (focusValue / 4) * 25 +
      25
    )
  );

  const streaks = [
    { label: 'Sono', count: 7, color: '#6B82EE', icon: 'Moon' },
    { label: 'Água', count: 5, color: '#3CB4C2', icon: 'Droplets' },
    { label: 'Comida', count: 4, color: '#68B281', icon: 'UtensilsCrossed' },
    { label: 'Treino', count: 3, color: '#D35996', icon: 'Dumbbell' },
    { label: 'Estudo', count: 6, color: '#E3A84A', icon: 'BookOpen' },
  ];

  const achievements = [
    { label: '🌅 Madrugador', color: '#f59e0b' },
    { label: '💧 Mestre da hidratação', color: '#06b6d4' },
    { label: '📚 Campeão dos Estudos', color: '#8b5cf6' },
  ];

  return (
    <>
      <div className={pageStyles.bentoGrid}>

        {/* ── BENTO LEFT (span 8) ── */}
        <div style={{ gridColumn: 'span 8', gridRow: 'span 12', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <SleepStudyChart sonoData={sonoData} estudoData={estudoData} />
          </div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <WeeklyHeatmap
              sonoData={sonoData}
              hidratacaoData={hidratacaoData}
              alimentacaoData={alimentacaoData}
              treinoData={treinoData}
              estudoData={estudoData}
            />
          </div>
        </div>

        {/* ── BENTO RIGHT (span 4) ── */}
        <div style={{ gridColumn: 'span 4', gridRow: 'span 12', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          {/* Progress Rings */}
          <div className={`card ${styles.ringsCard}`}>
            <div className={styles.ringsRow}>
              <ProgressRing value={waterPercent} max={waterMeta} color="#06b6d4" label="Água" unit="ml" size={68} />
              <ProgressRing value={calValue} max={6} color="#f59e0b" label="Refeições" unit="" size={68} />
              <ProgressRing value={focusValue} max={6} color="#8b5cf6" label="Foco" unit="hrs" size={68} />
            </div>
          </div>

          <RoutineScore score={routineScore || 78} />
          <LevelCard level={3} xp={2450} progressPercent={45} />
          <StreaksCard streaks={streaks} />
        </div>

      </div>

      {/* FAB */}
      <button className="fab" onClick={() => setShowQuickAdd(true)} title="Adicionar registro">
        <Plus size={24} />
      </button>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <QuickAddModal
          onClose={() => setShowQuickAdd(false)}
          onSaved={() => {
            loadData();
            setShowQuickAdd(false);
          }}
        />
      )}
    </>
  );
}
