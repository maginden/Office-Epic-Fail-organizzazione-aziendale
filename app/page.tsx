'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  AlertTriangle, 
  Users, 
  Zap, 
  MessageSquare, 
  Target, 
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

// --- Components ---

const SlideWrapper = ({ children, direction }: { children: React.ReactNode, direction: number }) => (
  <motion.div
    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12"
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
    <motion.div 
      className="h-full bg-orange-600"
      initial={{ width: 0 }}
      animate={{ width: `${(current / (total - 1)) * 100}%` }}
    />
  </div>
);

// --- Slides Data ---

const slides = [
  {
    id: 'intro',
    type: 'hero',
    title: 'OGGI PARLIAMO DI:...',
    subtitle: '16 Marzo - Forum Lab, Lecce',
    description: 'Corso Garanzia Giovani - Social Media Marketing',
    icon: <AlertTriangle className="w-16 h-16 text-orange-600 mb-6" />,
    logo: 'https://drive.google.com/uc?id=1PxU_d3N_FDouXPCRTy9HPOGPE0l4kOdI',
    bg: 'bg-stone-50'
  },
  {
    id: 'video',
    type: 'video',
    title: 'Analizziamo il Caos',
    subtitle: 'La verità, vi prego, sull\'ORGANIZZAZIONE AZIENDALE',
    videoUrl: 'https://www.youtube.com/embed/V88Hc_taOYo?start=185',
    bg: 'bg-stone-900 text-white'
  },
  {
    id: 'theory-intro',
    type: 'hero',
    title: 'SOPRAVVIVERE ALL\'AZIENDA',
    subtitle: 'Il manuale che nessun HR ti darà mai il primo giorno.',
    description: 'UC 1657 — Garanzia Giovani Edition',
    icon: <Users className="w-16 h-16 text-blue-600 mb-6" />,
    bg: 'bg-blue-50'
  },
  {
    id: 'what-is-company',
    type: 'theory-visual',
    title: "Vignetta 1: Cos'è un'Azienda?",
    subtitle: 'Un sistema che trasforma risorse in valore',
    content: (
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-center">
          <div className="p-6 bg-white border-2 border-stone-900 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-xl">
            <h4 className="font-bold text-sm uppercase mb-3 border-b-2 border-stone-900 pb-1">INPUT</h4>
            <ul className="text-sm space-y-2 font-medium">
              <li>💰 Capitali</li>
              <li>👷 Persone</li>
              <li>🔧 Materie prime</li>
              <li>💡 Know-how</li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-2 bg-stone-900 mb-2 hidden md:block"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-yellow-400 border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl text-center"
            >
              <span className="font-display font-black text-3xl uppercase">L&apos;AZIENDA</span>
              <p className="text-xs font-bold mt-2 uppercase tracking-widest">Trasforma & Organizza</p>
            </motion.div>
            <div className="w-full h-2 bg-stone-900 mt-2 hidden md:block"></div>
          </div>
          <div className="p-6 bg-white border-2 border-stone-900 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-xl">
            <h4 className="font-bold text-sm uppercase mb-3 border-b-2 border-stone-900 pb-1">OUTPUT</h4>
            <ul className="text-sm space-y-2 font-medium">
              <li>📦 Prodotti/Servizi</li>
              <li>💚 Valore</li>
              <li>📈 Profitto</li>
              <li>🌍 Impatto</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    bg: 'bg-stone-100'
  },
  {
    id: 'organigramma-theory',
    type: 'theory-visual',
    title: 'Organigramma',
    subtitle: 'Chi comanda chi (almeno sulla carta)',
    content: (
      <div className="w-full max-w-3xl p-8 bg-white border-4 border-stone-900 shadow-[12px_12px_0_0_rgba(0,0,0,1)] rounded-2xl">
        <div className="flex flex-col items-center gap-6">
          <div className="px-8 py-3 bg-yellow-400 border-2 border-stone-900 font-bold uppercase">CEO / Imprenditore</div>
          <div className="w-1 h-8 bg-stone-900"></div>
          <div className="flex gap-8">
            <div className="px-4 py-2 bg-blue-100 border-2 border-stone-900 text-xs font-bold uppercase">Marketing</div>
            <div className="px-4 py-2 bg-emerald-100 border-2 border-stone-900 text-xs font-bold uppercase">Produzione</div>
            <div className="px-4 py-2 bg-purple-100 border-2 border-stone-900 text-xs font-bold uppercase">HR / Admin</div>
          </div>
          <div className="w-full border-t-2 border-stone-900 border-dashed my-4"></div>
          <p className="text-sm text-stone-500 italic">&quot;Box = Ruolo | Linee = Autorità&quot;</p>
        </div>
      </div>
    ),
    bg: 'bg-blue-50'
  },
  {
    id: 'magic-pyramid',
    type: 'piramide-interattiva',
    title: 'LA PIRAMIDE MAGICA',
    subtitle: 'Trascina i personaggi per vedere la gerarchia in azione!',
    bg: 'bg-stone-100'
  },
  {
    id: 'structures-theory',
    type: 'theory-visual',
    title: 'Le Strutture',
    subtitle: 'Scegli la tua avventura organizzativa',
    content: (
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {[
          { t: 'Funzionale', d: 'Per aree specializzate', c: 'bg-blue-100' },
          { t: 'Divisionale', d: 'Per prodotto o mercato', c: 'bg-emerald-100' },
          { t: 'A Matrice', d: 'Doppia dipendenza', c: 'bg-red-100' },
          { t: 'Piatta', d: 'Startup & Autonomia', c: 'bg-yellow-100' }
        ].map((s) => (
          <div key={s.t} className={`p-4 border-2 border-stone-900 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-xl ${s.c}`}>
            <h4 className="font-bold uppercase mb-1">{s.t}</h4>
            <p className="text-xs font-medium text-stone-600">{s.d}</p>
          </div>
        ))}
      </div>
    ),
    bg: 'bg-stone-50'
  },
  {
    id: 'living-cells',
    type: 'cellule-vive',
    title: 'LE CELLULE VIVE',
    subtitle: 'Il flusso del lavoro (e delle colpe)',
    bg: 'bg-emerald-50'
  },
  {
    id: 'strategy-theory',
    type: 'theory-visual',
    title: 'La Strategia',
    subtitle: 'La struttura segue la strategia',
    content: (
      <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
        <div className="p-4 bg-white border-2 border-stone-900 font-bold uppercase text-sm">Organizzazione</div>
        <ChevronRight className="w-8 h-8" />
        <div className="p-4 bg-yellow-400 border-2 border-stone-900 font-bold uppercase text-sm">Strategia</div>
        <ChevronRight className="w-8 h-8" />
        <div className="p-6 bg-stone-900 text-white border-2 border-stone-900 font-bold uppercase text-lg shadow-[8px_8px_0_0_rgba(255,225,53,1)]">Posizionamento</div>
      </div>
    ),
    bg: 'bg-orange-50'
  },
  {
    id: 'chaos-simulator',
    type: 'comic-interactive',
    title: 'IL SIMULATORE DI CAOS',
    subtitle: 'Clicca sui reparti per vedere cosa succede al povero SMM',
    bg: 'bg-yellow-50'
  },
  {
    id: 'communication',
    type: 'content',
    title: '1. Comunicazione Interna',
    subtitle: 'Il telefono senza fili aziendale',
    points: [
      'Informazioni frammentate: "Ma io pensavo che..."',
      'Overload di email vs Mancanza di chiarezza',
      'Il fallimento del Social Media Manager: quando il reparto vendite non parla con il marketing.'
    ],
    icon: <MessageSquare className="w-12 h-12 text-blue-500" />,
    failExample: 'Postare un\'offerta scaduta perché nessuno ti ha avvisato.'
  },
  {
    id: 'processes',
    type: 'content',
    title: '2. Processi e Workflow',
    subtitle: 'Chi fa cosa, quando e come?',
    points: [
      'Assenza di SOP (Standard Operating Procedures)',
      'Il "collo di bottiglia": aspettare l\'approvazione per 3 giorni',
      'Automazione vs Lavoro Manuale ripetitivo'
    ],
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    failExample: 'Sbagliare il tag di un cliente importante perché il file Excel era vecchio.'
  },
  {
    id: 'hierarchy',
    type: 'content',
    title: '3. Gerarchia e Ruoli',
    subtitle: 'Troppi capi, nessun marinaio',
    points: [
      'Mancanza di leadership chiara',
      'Micro-management: il nemico della creatività',
      'Responsabilità ambigue: "Non era compito mio"'
    ],
    icon: <Users className="w-12 h-12 text-purple-500" />,
    failExample: 'Tre persone diverse rispondono allo stesso commento su Instagram con toni diversi.'
  },
  {
    id: 'smm-context',
    type: 'content',
    title: 'SMM & Organizzazione',
    subtitle: 'Perché vi riguarda da vicino',
    points: [
      'Il Piano Editoriale richiede coordinamento',
      'Crisis Management: chi decide cosa dire in 10 minuti?',
      'Budget e Risorse: l\'organizzazione del tempo è denaro'
    ],
    icon: <Target className="w-12 h-12 text-emerald-500" />,
    failExample: 'Un commento negativo diventa virale perché il SMM non aveva il potere di rimborsare il cliente.'
  },
  {
    id: 'quiz',
    type: 'quiz',
    title: 'Test di Sopravvivenza',
    question: 'Qual è il primo segnale di un\'azienda disorganizzata?',
    options: [
      { text: 'C\'è troppa musica in ufficio', correct: false },
      { text: 'Nessuno sa chi ha l\'ultima parola su un progetto', correct: true },
      { text: 'La macchinetta del caffè è rotta', correct: false },
      { text: 'Si usano troppi post-it', correct: false }
    ]
  },
  {
    id: 'conclusion',
    type: 'hero',
    title: 'Dall\'Epic Fail all\'Epic Win',
    subtitle: 'L\'organizzazione è la base della vostra creatività.',
    description: 'Domande? Riflessioni? O raccontateci il vostro peggior fail!',
    icon: <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-6" />,
    bg: 'bg-emerald-50'
  }
];

// --- Main Page ---

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [chaosActive, setChaosActive] = useState<string[]>([]);

  const toggleChaos = (dept: string) => {
    setChaosActive(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
      setQuizAnswered(null);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
      setQuizAnswered(null);
    }
  };

  const slide = slides[currentSlide];

  return (
    <main className={`min-h-screen flex flex-col overflow-hidden transition-colors duration-500 ${slide.bg || 'bg-stone-50'}`}>
      <ProgressBar current={currentSlide} total={slides.length} />

      <div className="flex-1 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <SlideWrapper key={currentSlide} direction={direction}>
            
            {slide.type === 'hero' && (
              <div className="text-center max-w-4xl flex flex-col items-center">
                {slide.logo && (
                  <div className="mb-8 relative w-32 h-32">
                    <Image 
                      src={slide.logo} 
                      alt="Logo" 
                      fill 
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                {slide.icon}
                <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-medium text-stone-600 mb-8">
                  {slide.subtitle}
                </p>
                <div className="inline-block px-4 py-2 bg-stone-900 text-white text-sm font-mono uppercase tracking-widest">
                  {slide.description}
                </div>
              </div>
            )}

            {slide.type === 'video' && (
              <div className="w-full max-w-5xl flex flex-col items-center">
                <h2 className="text-3xl font-display font-bold mb-6">{slide.title}</h2>
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <iframe 
                    className="w-full h-full"
                    src={slide.videoUrl}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
                <p className="mt-6 text-stone-400 italic">{slide.subtitle}</p>
              </div>
            )}

            {slide.type === 'theory-visual' && (
              <div className="flex flex-col items-center w-full">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-2 text-center">{slide.title}</h2>
                <p className="text-xl text-stone-500 mb-12 text-center">{slide.subtitle}</p>
                {slide.content}
              </div>
            )}

            {slide.type === 'content' && (
              <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
                <div className="flex flex-col justify-center">
                  <div className="mb-6">{slide.icon}</div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl text-stone-500 mb-8">{slide.subtitle}</p>
                  
                  <div className="p-6 bg-orange-100 border-l-4 border-orange-600 rounded-r-xl">
                    <p className="text-sm font-mono uppercase text-orange-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Esempio di Epic Fail
                    </p>
                    <p className="text-lg font-medium text-orange-950 italic">
                      &quot;{slide.failExample}&quot;
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  {slide.points?.map((point, i) => (
                    <motion.div 
                      key={`point-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p className="text-lg font-medium">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'piramide-interattiva' && (
              <div className="w-full max-w-4xl flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-2 text-center">{slide.title}</h2>
                <p className="text-xl text-stone-500 mb-12 text-center">{slide.subtitle}</p>
                
                <div className="relative w-full aspect-[4/3] bg-white border-4 border-stone-900 shadow-[16px_16px_0_0_rgba(0,0,0,1)] rounded-3xl p-8 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                      <path d="M50,10 L90,90 L10,90 Z" fill="none" stroke="black" strokeWidth="2" className="w-full h-full" />
                    </svg>
                  </div>

                  {/* CEO */}
                  <motion.div 
                    drag dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-30"
                  >
                    <div className="p-4 bg-yellow-400 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-center">
                      <span className="text-4xl">👑</span>
                      <p className="font-bold text-xs mt-1">CEO (Golf!)</p>
                    </div>
                  </motion.div>

                  {/* Manager */}
                  <motion.div 
                    drag dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20"
                  >
                    <div className="p-4 bg-blue-400 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-center">
                      <span className="text-4xl">👨‍💼</span>
                      <p className="font-bold text-xs mt-1">Manager (URLA!)</p>
                    </div>
                  </motion.div>

                  {/* Workers */}
                  <div className="absolute bottom-12 left-0 w-full flex justify-around px-4 z-10">
                    {[
                      { id: 'p-worker', icon: '👷', label: 'Prod.' },
                      { id: 'i-worker', icon: '👷', label: 'Interno (📱)' },
                      { id: 'v-worker', icon: '👷', label: 'Vendite' }
                    ].map((w) => (
                      <motion.div 
                        key={w.id}
                        drag dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <div className="p-4 bg-stone-100 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-center">
                          <span className="text-4xl">{w.icon}</span>
                          <p className="font-bold text-xs mt-1">{w.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    &quot;Ordini dal cielo: Vendete! 🤪&quot;
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'cellule-vive' && (
              <div className="w-full max-w-4xl flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-2 text-center">{slide.title}</h2>
                <p className="text-xl text-stone-500 mb-12 text-center">{slide.subtitle}</p>
                
                <div className="relative w-full p-12 bg-white border-4 border-stone-900 shadow-[16px_16px_0_0_rgba(0,0,0,1)] rounded-3xl overflow-hidden">
                  <div className="flex items-center justify-between w-full relative z-10">
                    {[
                      { id: 'p', label: 'Produzione', icon: '💥', color: 'bg-red-100' },
                      { id: 'q', label: 'Qualità', icon: '❓', color: 'bg-yellow-100' },
                      { id: 'm', label: 'Marketing', icon: '📣', color: 'bg-blue-100' },
                      { id: 'v', label: 'Vendite', icon: '💰', color: 'bg-emerald-100' }
                    ].map((cell, i, arr) => (
                      <React.Fragment key={cell.id}>
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`p-6 border-2 border-stone-900 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center ${cell.color}`}
                        >
                          <span className="text-4xl mb-2">{cell.icon}</span>
                          <span className="font-bold text-sm uppercase">{cell.label}</span>
                        </motion.div>
                        {i < arr.length - 1 && (
                          <div className="flex-1 flex justify-center">
                            <motion.div
                              animate={{ x: [-10, 10, -10] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <ChevronRight className="w-8 h-8 text-stone-400" />
                            </motion.div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-12 p-6 bg-stone-900 text-yellow-400 rounded-xl border-2 border-stone-900 text-center font-display font-black text-2xl uppercase italic">
                    &quot;Pizza rotta? Colpa tua! 😆&quot;
                  </div>

                  {/* Animated background elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`bg-dot-${i}`}
                        className="absolute w-2 h-2 bg-stone-900 rounded-full"
                        initial={{ x: 100 * i, y: 50 * i }}
                        animate={{ 
                          x: [100 * i, 150 * i, 100 * i],
                          y: [50 * i, 100 * i, 50 * i],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 3 + i }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'comic-interactive' && (
              <div className="w-full max-w-4xl flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-2 text-center">{slide.title}</h2>
                <p className="text-xl text-stone-500 mb-12 text-center">{slide.subtitle}</p>
                
                <div className="relative w-full aspect-[4/3] bg-white border-4 border-stone-900 shadow-[16px_16px_0_0_rgba(0,0,0,1)] rounded-3xl overflow-hidden p-8">
                  {/* CEO */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <button 
                      onClick={() => toggleChaos('ceo')}
                      className={`p-4 rounded-xl border-2 border-stone-900 transition-all ${chaosActive.includes('ceo') ? 'bg-yellow-400 scale-110' : 'bg-stone-100'}`}
                    >
                      <span className="text-4xl">👑</span>
                      <p className="font-bold text-xs mt-1">CEO</p>
                    </button>
                  </div>

                  {/* Departments */}
                  <div className="absolute bottom-12 left-0 w-full flex justify-around px-4">
                    {[
                      { id: 'marketing', icon: '🎉', label: 'Marketing' },
                      { id: 'prod', icon: '😰', label: 'Produzione' },
                      { id: 'finanza', icon: '😤', label: 'Finanza' }
                    ].map((dept) => (
                      <button 
                        key={dept.id}
                        onClick={() => toggleChaos(dept.id)}
                        className={`p-4 rounded-xl border-2 border-stone-900 transition-all ${chaosActive.includes(dept.id) ? 'bg-orange-400 scale-110' : 'bg-stone-100'}`}
                      >
                        <span className="text-4xl">{dept.icon}</span>
                        <p className="font-bold text-xs mt-1">{dept.label}</p>
                      </button>
                    ))}
                  </div>

                  {/* Central Character (The Victim) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <motion.div 
                      animate={chaosActive.length > 0 ? { 
                        rotate: [0, -5, 5, -5, 5, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                      className="relative"
                    >
                      <span className="text-6xl">🚀</span>
                      {chaosActive.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-12 -right-12 bg-red-600 text-white px-4 py-2 rounded-full font-black text-xl border-2 border-white shadow-lg"
                        >
                          AIUTO!
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Tentacles / Chaos Lines */}
                  <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
                    <AnimatePresence>
                      {chaosActive.includes('ceo') && (
                        <motion.line 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                          x1="50%" y1="20%" x2="50%" y2="45%" stroke="black" strokeWidth="4" strokeDasharray="8 4" 
                        />
                      )}
                      {chaosActive.includes('marketing') && (
                        <motion.line 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                          x1="20%" y1="80%" x2="45%" y2="55%" stroke="black" strokeWidth="4" strokeDasharray="8 4" 
                        />
                      )}
                      {chaosActive.includes('prod') && (
                        <motion.line 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                          x1="50%" y1="80%" x2="50%" y2="55%" stroke="black" strokeWidth="4" strokeDasharray="8 4" 
                        />
                      )}
                      {chaosActive.includes('finanza') && (
                        <motion.line 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                          x1="80%" y1="80%" x2="55%" y2="55%" stroke="black" strokeWidth="4" strokeDasharray="8 4" 
                        />
                      )}
                    </AnimatePresence>
                  </svg>
                </div>
                
                <p className="mt-8 text-stone-500 font-medium italic">
                  {chaosActive.length === 0 
                    ? "Tutto sembra tranquillo... per ora." 
                    : chaosActive.length === 4 
                      ? "CAOS TOTALE! L'organizzazione è collassata." 
                      : "La pressione aumenta..."}
                </p>
              </div>
            )}

            {slide.type === 'quiz' && (
              <div className="max-w-3xl w-full text-center">
                <HelpCircle className="w-16 h-16 text-stone-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">{slide.question}</h2>
                
                <div className="grid gap-4">
                  {slide.options?.map((opt, i) => (
                    <button
                      key={`opt-${i}`}
                      onClick={() => setQuizAnswered(i)}
                      className={`
                        w-full p-6 text-left text-xl font-medium rounded-2xl border-2 transition-all
                        ${quizAnswered === null 
                          ? 'border-stone-200 hover:border-orange-500 hover:bg-orange-50' 
                          : opt.correct 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                            : quizAnswered === i 
                              ? 'border-red-500 bg-red-50 text-red-900' 
                              : 'border-stone-100 opacity-50'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt.text}</span>
                        {quizAnswered !== null && opt.correct && <CheckCircle2 className="text-emerald-500" />}
                        {quizAnswered === i && !opt.correct && <XCircle className="text-red-500" />}
                      </div>
                    </button>
                  ))}
                </div>

                {quizAnswered !== null && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-lg font-medium text-stone-600"
                  >
                    {slide.options?.[quizAnswered].correct 
                      ? "Esatto! La chiarezza dei ruoli è fondamentale." 
                      : "Non proprio. Anche se il caffè è importante, la gerarchia è il vero problema qui."}
                  </motion.p>
                )}
              </div>
            )}

          </SlideWrapper>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex items-center justify-between border-t border-stone-200 bg-white/50 backdrop-blur-sm">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all disabled:opacity-30 hover:bg-stone-100"
        >
          <ChevronLeft /> Indietro
        </button>

        <div className="text-sm font-mono text-stone-400">
          {currentSlide + 1} / {slides.length}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-full font-bold transition-all hover:bg-orange-600 hover:scale-105 disabled:opacity-30"
        >
          {currentSlide === slides.length - 1 ? 'Fine' : 'Avanti'} <ChevronRight />
        </button>
      </div>
    </main>
  );
}
