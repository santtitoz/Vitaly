const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// ── Types ──────────────────────────────────────────

export interface Alimentacao {
  id?: number;
  data_registro: string;
  quantidade_refeicoes: number;
  horarios: string;
  classificacao: string;
}

export interface Sono {
  id?: number;
  data_registro: string;
  hora_dormir: string;
  hora_acordar: string;
  quantidade: number;
}

export interface Estudo {
  id?: number;
  data_registro: string;
  horas_estudo: number;
  produtividade: number;
}

export interface Hidratacao {
  id?: number;
  data_registro: string;
  quantidade_ml: number;
  meta_ml: number;
}

export interface Treino {
  id?: number;
  data_registro: string;
  quantidade_planejada: number;
  quantidade_realizada: number;
  status: string;
}

// ── Generic fetch helper ───────────────────────────

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('vitaly_token') : null;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error ${res.status}: ${error}`);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

// ── Alimentação ────────────────────────────────────

export const alimentacaoApi = {
  list: () => apiFetch<Alimentacao[]>('/alimentacoes/'),
  get: (id: number) => apiFetch<Alimentacao>(`/alimentacoes/${id}/`),
  create: (data: Omit<Alimentacao, 'id'>) =>
    apiFetch<Alimentacao>('/alimentacoes/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Alimentacao>) =>
    apiFetch<Alimentacao>(`/alimentacoes/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/alimentacoes/${id}/`, { method: 'DELETE' }),
};

// ── Sono ───────────────────────────────────────────

export const sonoApi = {
  list: () => apiFetch<Sono[]>('/sonos/'),
  get: (id: number) => apiFetch<Sono>(`/sonos/${id}/`),
  create: (data: Omit<Sono, 'id'>) =>
    apiFetch<Sono>('/sonos/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Sono>) =>
    apiFetch<Sono>(`/sonos/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/sonos/${id}/`, { method: 'DELETE' }),
};

// ── Estudo ─────────────────────────────────────────

export const estudoApi = {
  list: () => apiFetch<Estudo[]>('/estudos/'),
  get: (id: number) => apiFetch<Estudo>(`/estudos/${id}/`),
  create: (data: Omit<Estudo, 'id'>) =>
    apiFetch<Estudo>('/estudos/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Estudo>) =>
    apiFetch<Estudo>(`/estudos/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/estudos/${id}/`, { method: 'DELETE' }),
};

// ── Hidratação ─────────────────────────────────────

export const hidratacaoApi = {
  list: () => apiFetch<Hidratacao[]>('/hidratacoes/'),
  get: (id: number) => apiFetch<Hidratacao>(`/hidratacoes/${id}/`),
  create: (data: Omit<Hidratacao, 'id'>) =>
    apiFetch<Hidratacao>('/hidratacoes/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Hidratacao>) =>
    apiFetch<Hidratacao>(`/hidratacoes/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/hidratacoes/${id}/`, { method: 'DELETE' }),
};

// ── Treino ─────────────────────────────────────────

export const treinoApi = {
  list: () => apiFetch<Treino[]>('/treinos/'),
  get: (id: number) => apiFetch<Treino>(`/treinos/${id}/`),
  create: (data: Omit<Treino, 'id'>) =>
    apiFetch<Treino>('/treinos/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Treino>) =>
    apiFetch<Treino>(`/treinos/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/treinos/${id}/`, { method: 'DELETE' }),
};
