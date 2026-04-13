'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Caderno.module.css';
import { Send, Plus, X } from 'lucide-react';

const MOCK_MESSAGES = [
  {
    id: 1,
    role: 'user',
    text: 'Tenho me alimentado mal constantemente, e sinto que isso atrapalha',
  },
  {
    id: 2,
    role: 'ai',
    text: '"Notei que nos dias em que você dorme menos de 7h, sua velocidade de resolução de exercícios de exatas cai 30%."',
  },
  {
    id: 3,
    role: 'user',
    text: 'Gosto de ir para a academia e não queria deixar isso de lado',
  },
  {
    id: 4,
    role: 'ai',
    text: 'Se você estuda à tarde, treinar no final do dia vai servir para limpar a mente, limpando a fadiga cognitiva antes do descanso noturno.',
  },
];

const THEME_COLORS = [
  { bg: '#6B82EE' }, // Sono
  { bg: '#3CB4C2' }, // Hidratação
  { bg: '#68B281' }, // Alimentação
  { bg: '#D35996' }, // Treinos
  { bg: '#E3A84A' }, // Estudos
];

const MOCK_POSTITS = [
  { id: 1, text: 'Caminhada de 25 minutos', bgColor: '#68B281' },
  { id: 2, text: 'Beber 3L de água hoje', bgColor: '#3CB4C2' },
  { id: 3, text: 'Resolver provas antigas', bgColor: '#6B82EE' },
];

export default function NotebookPage() {
  const [messages, setMessages] = useState([...MOCK_MESSAGES]);
  const [postIts, setPostIts] = useState([...MOCK_POSTITS]);
  const [inputText, setInputText] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [draftColor, setDraftColor] = useState(THEME_COLORS[0].bg);
  const [draftSpan, setDraftSpan] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), role: 'user', text: inputText };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: 'Entendido. Adicionei essa anotação ao seu contexto geral!' }
      ]);
    }, 1000);
  };

  const confirmAddPostIt = () => {
    const newId = Date.now();
    setPostIts((prev) => [
      ...prev,
      // @ts-ignore
      { id: newId, text: '', bgColor: draftColor, span: draftSpan }
    ]);
    setShowOptions(false);
    setEditingId(newId);
  };

  const handleRemovePostIt = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostIts((prev) => prev.filter(p => p.id !== id));
  };

  const updatePostItText = (id: number, text: string) => {
    setPostIts(prev => prev.map(p => p.id === id ? { ...p, text } : p));
  };


  return (
    <>
      {/* <div className="page-header">
        <h1 className="page-title">Anotações</h1>
      </div> */}

      <div className={styles.notebookGrid}>

        {/* Top Header Row with Stat Badges */}
        <div className={styles.header}>
          <div className={styles.statPill} style={{ background: '#101013' }}>
            <span className={styles.statBadge} style={{ background: '#6B82EE', color: '#ffffff' }}>Sono</span>
            <span className={styles.statValue}>7.8 <span className={styles.statUnit}>/8 hrs</span></span>
            <div className={styles.miniBar}><div className={styles.miniBarFill} style={{ background: '#6B82EE', width: '95%' }} /></div>
          </div>

          <div className={styles.statPill} style={{ background: '#101013' }}>
            <span className={styles.statBadge} style={{ background: '#3CB4C2', color: '#ffffff' }}>Hidratação</span>
            <span className={styles.statValue}>7.8 <span className={styles.statUnit}>/8 hrs</span></span>
            <div className={styles.miniBar}><div className={styles.miniBarFill} style={{ background: '#3CB4C2', width: '90%' }} /></div>
          </div>

          <div className={styles.statPill} style={{ background: '#101013' }}>
            <span className={styles.statBadge} style={{ background: '#68B281', color: '#ffffff' }}>Alimentação</span>
            <span className={styles.statValue}>7.8 <span className={styles.statUnit}>/8 hrs</span></span>
            <div className={styles.miniBar}><div className={styles.miniBarFill} style={{ background: '#68B281', width: '90%' }} /></div>
          </div>

          <div className={styles.statPill} style={{ background: '#101013' }}>
            <span className={styles.statBadge} style={{ background: '#D35996', color: '#ffffff' }}>Treinos</span>
            <span className={styles.statValue}>7.8 <span className={styles.statUnit}>/8 hrs</span></span>
            <div className={styles.miniBar}><div className={styles.miniBarFill} style={{ background: '#D35996', width: '90%' }} /></div>
          </div>

          <div className={styles.statPill} style={{ background: '#101013' }}>
            <span className={styles.statBadge} style={{ background: '#E3A84A', color: '#ffffff' }}>Estudos</span>
            <span className={styles.statValue}>7.8 <span className={styles.statUnit}>/8 hrs</span></span>
            <div className={styles.miniBar}><div className={styles.miniBarFill} style={{ background: '#E3A84A', width: '95%' }} /></div>
          </div>
        </div>

        {/* Main Content Split Area */}
        <div className={styles.mainArea}>

          {/* Chat / Dotted Area */}
          <div className={styles.chatSection}>
            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={styles.messageRow}
                  style={{ justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end' }}
                >
                  <div
                    className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                    style={{
                      background: msg.role === 'user' ? '#000000' : '#4c1d95',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatInputArea}>
              <input
                type="text"
                placeholder="Adicionar anotação no caderno..."
                className={styles.chatInput}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className={styles.sendButton} onClick={handleSendMessage}>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Post-its Area */}
          <div className={styles.notesSection}>
            <div className={styles.notesHeader}>
              <div className={styles.dotsRow}>
                <div className={styles.dot} style={{ background: '#f59e0b' }} />
                <div className={styles.dot} style={{ background: '#22c55e' }} />
                <div className={styles.dot} style={{ background: '#3b82f6' }} />
              </div>
              <button className={styles.addPostItBtn} onClick={() => setShowOptions(!showOptions)}>
                <Plus size={14} style={{ marginRight: 4 }} /> Novo
              </button>

              {showOptions && (
                <div className={styles.optionsPanel}>
                  <div className={styles.optionsTitle}>Cores Temáticas</div>
                  <div className={styles.colorPicker}>
                    {THEME_COLORS.map(c => (
                      <div
                        key={c.bg}
                        className={`${styles.colorBtn} ${draftColor === c.bg ? styles.selected : ''}`}
                        style={{ backgroundColor: c.bg }}
                        onClick={() => setDraftColor(c.bg)}
                      />
                    ))}
                  </div>

                  <div className={styles.optionsTitle} style={{ marginTop: 8 }}>Tamanho</div>
                  <div className={styles.sizePicker}>
                    <button
                      className={`${styles.sizeBtn} ${draftSpan === 1 ? styles.selected : ''}`}
                      onClick={() => setDraftSpan(1)}
                    >
                      Menor (1x)
                    </button>
                    <button
                      className={`${styles.sizeBtn} ${draftSpan === 2 ? styles.selected : ''}`}
                      onClick={() => setDraftSpan(2)}
                    >
                      Largo (2x)
                    </button>
                  </div>

                  <button className={styles.confirmAddBtn} onClick={confirmAddPostIt}>
                    Criar Post-it
                  </button>
                </div>
              )}
            </div>

            <div className={styles.postItsGrid}>
              {postIts.map((note) => (
                <div
                  key={note.id}
                  // @ts-ignore
                  className={`${styles.postIt} ${note.span === 2 ? styles.span2 : ''}`}
                  style={{ background: note.bgColor, color: '#ffffff' }}
                  onClick={() => setEditingId(note.id)}
                >
                  <button
                    className={styles.removePostItBtn}
                    onClick={(e) => handleRemovePostIt(note.id, e)}
                    title="Remover Post-it"
                  >
                    <X size={14} />
                  </button>

                  {editingId === note.id ? (
                    <textarea
                      autoFocus
                      className={styles.postItInput}
                      value={note.text}
                      onChange={(e) => updatePostItText(note.id, e.target.value)}
                      onBlur={() => setEditingId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          setEditingId(null);
                        }
                      }}
                    />
                  ) : (
                    <div className={styles.postItText}>
                      {note.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
