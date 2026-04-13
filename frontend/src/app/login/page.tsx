'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const url = isLogin 
      ? 'http://127.0.0.1:8000/api/v1/auth/login/' 
      : 'http://127.0.0.1:8000/api/v1/auth/register/';
      
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Erro ao autenticar');
        return;
      }
      
      localStorage.setItem('vitaly_token', data.token);
      localStorage.setItem('vitaly_user', JSON.stringify(data.user));
      
      router.push('/');
    } catch (err) {
      setError('Erro de conexão com o servidor');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dotsBackground} />
      
      <div className={styles.authCard} style={{ zIndex: 1 }}>
        <div className={styles.header}>
          <div className={styles.logo}>Vitaly</div>
          <h1 className={styles.title}>
            {isLogin ? 'Bem-vindo de volta' : 'Criar nova conta'}
          </h1>
          <p className={styles.subtitle}>
            {isLogin 
              ? 'Insira suas credenciais para acessar seu universo' 
              : 'Junte-se a nós para transformar sua rotina'
            }
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 13, border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Como quer ser chamado?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              className={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>

        <div className={styles.toggleAction}>
          <span>
            {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
          </span>
          <span 
            className={styles.toggleLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Criar agora' : 'Faça login'}
          </span>
        </div>
      </div>
    </div>
  );
}
