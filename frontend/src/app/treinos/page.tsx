'use client';

import { Dumbbell } from 'lucide-react';

export default function TreinosPage() {
  return (
    <>
      <div className="page-header">
        <h1>💪 Treinos</h1>
        <p>Gerencie sua rotina de exercícios</p>
      </div>
      <div className="card">
        <div className="empty-state">
          <Dumbbell size={48} />
          <p>Página em desenvolvimento. Use o botão + no Painel para registrar treinos.</p>
        </div>
      </div>
    </>
  );
}
