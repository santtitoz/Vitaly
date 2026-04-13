'use client';

import { useState } from 'react';
import { X, Moon, UtensilsCrossed, BookOpen, Droplets, Dumbbell } from 'lucide-react';
import { sonoApi, estudoApi, alimentacaoApi, hidratacaoApi, treinoApi } from '@/lib/api';
import styles from './QuickAdd.module.css';

type Category = 'sono' | 'alimentacao' | 'estudos' | 'hidratacao' | 'treinos';

interface QuickAddModalProps {
  onClose: () => void;
  onSaved: () => void;
  defaultCategory?: Category;
}

const categories: { key: Category; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'sono', label: 'Sono', icon: Moon, color: '#6B82EE' },
  { key: 'hidratacao', label: 'Água', icon: Droplets, color: '#3CB4C2' },
  { key: 'alimentacao', label: 'Alimentação', icon: UtensilsCrossed, color: '#68B281' },
  { key: 'treinos', label: 'Treino', icon: Dumbbell, color: '#D35996' },
  { key: 'estudos', label: 'Estudo', icon: BookOpen, color: '#E3A84A' },
];

export default function QuickAddModal({ onClose, onSaved, defaultCategory }: QuickAddModalProps) {
  const [category, setCategory] = useState<Category>(defaultCategory || 'sono');
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  // Form states
  const [sonoForm, setSonoForm] = useState({
    data_registro: today,
    hora_dormir: '23:00',
    hora_acordar: '07:00',
    quantidade: 8,
  });
  const [alimentacaoForm, setAlimentacaoForm] = useState({
    data_registro: today,
    quantidade_refeicoes: 3,
    horarios: '08:00, 12:00, 19:00',
    classificacao: 'Boa',
  });
  const [estudoForm, setEstudoForm] = useState({
    data_registro: today,
    horas_estudo: 2,
    produtividade: 7,
  });
  const [hidratacaoForm, setHidratacaoForm] = useState({
    data_registro: today,
    quantidade_ml: 2000,
    meta_ml: 3000,
  });
  const [treinoForm, setTreinoForm] = useState({
    data_registro: today,
    quantidade_planejada: 5,
    quantidade_realizada: 5,
    status: 'Concluído',
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      switch (category) {
        case 'sono':
          await sonoApi.create({ ...sonoForm, usuario: 1 });
          break;
        case 'alimentacao':
          await alimentacaoApi.create({ ...alimentacaoForm, usuario: 1 });
          break;
        case 'estudos':
          await estudoApi.create({ ...estudoForm, usuario: 1 });
          break;
        case 'hidratacao':
          await hidratacaoApi.create({ ...hidratacaoForm, usuario: 1 });
          break;
        case 'treinos':
          await treinoApi.create({ ...treinoForm, usuario: 1 });
          break;
      }
      onSaved();
    } catch (err) {
      console.error('Erro ao salvar:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Registro</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                className={`${styles.categoryTab} ${category === cat.key ? styles.active : ''}`}
                onClick={() => setCategory(cat.key)}
                style={
                  category === cat.key
                    ? { borderColor: cat.color, color: cat.color, background: `${cat.color}15` }
                    : {}
                }
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Forms */}
        <div className={styles.formArea}>
          {category === 'sono' && (
            <>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={sonoForm.data_registro}
                  onChange={(e) => setSonoForm({ ...sonoForm, data_registro: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Hora de Dormir</label>
                  <input
                    type="time"
                    value={sonoForm.hora_dormir}
                    onChange={(e) => setSonoForm({ ...sonoForm, hora_dormir: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Hora de Acordar</label>
                  <input
                    type="time"
                    value={sonoForm.hora_acordar}
                    onChange={(e) => setSonoForm({ ...sonoForm, hora_acordar: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Horas dormidas</label>
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={sonoForm.quantidade}
                  onChange={(e) =>
                    setSonoForm({ ...sonoForm, quantidade: Number(e.target.value) })
                  }
                />
              </div>
            </>
          )}

          {category === 'alimentacao' && (
            <>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={alimentacaoForm.data_registro}
                  onChange={(e) =>
                    setAlimentacaoForm({ ...alimentacaoForm, data_registro: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nº de Refeições</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={alimentacaoForm.quantidade_refeicoes}
                    onChange={(e) =>
                      setAlimentacaoForm({
                        ...alimentacaoForm,
                        quantidade_refeicoes: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Classificação</label>
                  <select
                    value={alimentacaoForm.classificacao}
                    onChange={(e) =>
                      setAlimentacaoForm({ ...alimentacaoForm, classificacao: e.target.value })
                    }
                  >
                    <option value="Ótima">Ótima</option>
                    <option value="Boa">Boa</option>
                    <option value="Regular">Regular</option>
                    <option value="Ruim">Ruim</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Horários (separados por vírgula)</label>
                <input
                  type="text"
                  value={alimentacaoForm.horarios}
                  placeholder="08:00, 12:00, 19:00"
                  onChange={(e) =>
                    setAlimentacaoForm({ ...alimentacaoForm, horarios: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {category === 'estudos' && (
            <>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={estudoForm.data_registro}
                  onChange={(e) => setEstudoForm({ ...estudoForm, data_registro: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Horas de Estudo</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={estudoForm.horas_estudo}
                    onChange={(e) =>
                      setEstudoForm({ ...estudoForm, horas_estudo: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Produtividade (0–10)</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={estudoForm.produtividade}
                    onChange={(e) =>
                      setEstudoForm({ ...estudoForm, produtividade: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {category === 'hidratacao' && (
            <>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={hidratacaoForm.data_registro}
                  onChange={(e) =>
                    setHidratacaoForm({ ...hidratacaoForm, data_registro: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantidade (ml)</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={hidratacaoForm.quantidade_ml}
                    onChange={(e) =>
                      setHidratacaoForm({
                        ...hidratacaoForm,
                        quantidade_ml: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Meta (ml)</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={hidratacaoForm.meta_ml}
                    onChange={(e) =>
                      setHidratacaoForm({ ...hidratacaoForm, meta_ml: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {category === 'treinos' && (
            <>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={treinoForm.data_registro}
                  onChange={(e) => setTreinoForm({ ...treinoForm, data_registro: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Exercícios Planejados</label>
                  <input
                    type="number"
                    min={0}
                    value={treinoForm.quantidade_planejada}
                    onChange={(e) =>
                      setTreinoForm({
                        ...treinoForm,
                        quantidade_planejada: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Exercícios Realizados</label>
                  <input
                    type="number"
                    min={0}
                    value={treinoForm.quantidade_realizada}
                    onChange={(e) =>
                      setTreinoForm({
                        ...treinoForm,
                        quantidade_realizada: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={treinoForm.status}
                  onChange={(e) => setTreinoForm({ ...treinoForm, status: e.target.value })}
                >
                  <option value="Concluído">Concluído</option>
                  <option value="Parcial">Parcial</option>
                  <option value="Não realizado">Não realizado</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className={styles.formActions}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Registro'}
          </button>
        </div>
      </div>
    </div>
  );
}
