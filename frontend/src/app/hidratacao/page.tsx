'use client';

import { Droplets } from 'lucide-react';

export default function HidratacaoPage() {
  return (
    <>
      <div className="page-header">
        <h1>💧 Hidratação</h1>
        <p>Acompanhe sua ingestão diária de água</p>
      </div>
      <div className="card">
        <div className="empty-state">
          <Droplets size={48} />
          <p>Página em desenvolvimento. Use o botão + no Painel para registrar hidratação.</p>
        </div>
      </div>
    </>
  );
}
