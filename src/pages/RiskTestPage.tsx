import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, ShieldX, AlertTriangle, CheckCircle2, ArrowRight, ChevronRight, RotateCcw, XCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePageMeta } from '../lib/usePageMeta';

type Question = {
  id: string;
  text: string;
  helpText?: string;
  options: { label: string; score: number }[];
};

const questions: Question[] = [
  {
    id: 'mfa',
    text: "Utilisez-vous l'authentification multifacteur (MFA) sur vos comptes critiques ?",
    helpText: 'Messagerie, ERP, CRM, comptes administrateurs, accès cloud...',
    options: [
      { label: 'Oui, sur tous les comptes critiques', score: 0 },
      { label: 'Partiellement, sur certains comptes', score: 2 },
      { label: 'Non, pas encore', score: 4 },
      { label: 'Je ne sais pas ce que c\'est', score: 5 },
    ],
  },
  {
    id: 'backup',
    text: 'Vos sauvegardes sont-elles régulières, testées et stockées hors site ?',
    helpText: 'Sauvegardes automatiques, vérifiées, avec au moins une copie déconnectée du réseau.',
    options: [
      { label: 'Oui, sauvegardes testées et hors site', score: 0 },
      { label: 'Sauvegardes automatiques mais jamais testées', score: 2 },
      { label: 'Sauvegardes manuelles et irrégulières', score: 4 },
      { label: 'Pas de sauvegarde fiable', score: 5 },
    ],
  },
  {
    id: 'updates',
    text: 'Vos systèmes et logiciels sont-ils mis à jour régulièrement ?',
    helpText: 'Correctifs de sécurité appliqués dans les jours suivant leur publication.',
    options: [
      { label: 'Oui, mises à jour automatiques activées', score: 0 },
      { label: 'Mises à jour manuelles, parfois en retard', score: 2 },
      { label: 'Rarement, quand on y pense', score: 4 },
      { label: 'Jamais ou presque', score: 5 },
    ],
  },
  {
    id: 'training',
    text: 'Vos collaborateurs sont-ils sensibilisés aux risques cyber ?',
    helpText: 'Formation phishing, bonnes pratiques mots de passe, signalement des incidents.',
    options: [
      { label: 'Oui, formation régulière et exercices', score: 0 },
      { label: 'Une formation initiale sans suivi', score: 2 },
      { label: 'Quelques consignes informelles', score: 3 },
      { label: 'Aucune sensibilisation', score: 5 },
    ],
  },
  {
    id: 'passwords',
    text: 'Comment sont gérés les mots de passe dans votre entreprise ?',
    options: [
      { label: 'Gestionnaire de mots de passe + politique stricte', score: 0 },
      { label: 'Mots de passe complexes mais pas de gestionnaire', score: 2 },
      { label: 'Mots de passe simples ou réutilisés', score: 4 },
      { label: 'Pas de politique, chacun fait comme il veut', score: 5 },
    ],
  },
  {
    id: 'incident-plan',
    text: "Avez-vous un plan de réponse en cas d'incident cyber ?",
    helpText: 'Contacts d\'urgence, procédures d\'isolement, plan de communication.',
    options: [
      { label: 'Oui, documenté et testé', score: 0 },
      { label: 'Oui, documenté mais jamais testé', score: 2 },
      { label: 'Non, mais on sait à peu près quoi faire', score: 3 },
      { label: 'Non, aucun plan', score: 5 },
    ],
  },
  {
    id: 'data',
    text: 'Quelles données sensibles traitez-vous ?',
    helpText: 'Données clients, données bancaires, données RH, données médicales...',
    options: [
      { label: 'Peu de données sensibles', score: 1 },
      { label: 'Données clients (emails, adresses)', score: 2 },
      { label: 'Données financières ou bancaires', score: 4 },
      { label: 'Données sensibles (santé, juridique, RH)', score: 5 },
    ],
  },
  {
    id: 'remote',
    text: "Les accès distants à vos systèmes sont-ils sécurisés ?",
    helpText: 'VPN, segmentation réseau, contrôle des appareils connectés.',
    options: [
      { label: 'VPN obligatoire + contrôle des appareils', score: 0 },
      { label: 'VPN disponible mais pas obligatoire', score: 2 },
      { label: 'Accès direct sans VPN', score: 4 },
      { label: 'Pas de contrôle des accès distants', score: 5 },
    ],
  },
  {
    id: 'insurance',
    text: 'Avez-vous une assurance cyber ?',
    options: [
      { label: 'Oui, avec des garanties adaptées', score: 0 },
      { label: 'Oui, mais je ne connais pas les détails', score: 2 },
      { label: 'Non, mais j\'y réfléchis', score: 3 },
      { label: 'Non, pas du tout', score: 5 },
    ],
  },
  {
    id: 'downtime',
    text: "Combien de temps votre entreprise peut-elle fonctionner sans ses outils numériques ?",
    options: [
      { label: 'Plusieurs jours sans impact majeur', score: 1 },
      { label: '1-2 jours maximum', score: 2 },
      { label: 'Quelques heures seulement', score: 4 },
      { label: 'Arrêt immédiat de l\'activité', score: 5 },
    ],
  },
];

type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

function getRiskLevel(score: number): RiskLevel {
  const maxScore = questions.length * 5;
  const pct = (score / maxScore) * 100;
  if (pct >= 65) return 'critical';
  if (pct >= 45) return 'high';
  if (pct >= 25) return 'medium';
  return 'low';
}

const riskConfig: Record<RiskLevel, {
  label: string;
  color: string;
  bgClass: string;
  borderClass: string;
  Icon: typeof Shield;
  headline: string;
  description: string;
  statLine: string;
}> = {
  critical: {
    label: 'CRITIQUE',
    color: '#ef4444',
    bgClass: 'bg-red-500/10',
    borderClass: 'border-red-500/30',
    Icon: ShieldX,
    headline: 'Votre entreprise est en danger immédiat',
    description: "Votre niveau de protection est quasi inexistant. En l'état, une cyberattaque pourrait paralyser votre activité en quelques heures et provoquer des pertes financières majeures. Vous êtes une cible facile pour les attaquants.",
    statLine: "87 % des entreprises avec ce profil subissent un incident dans les 12 mois.",
  },
  high: {
    label: 'ÉLEVÉ',
    color: '#f97316',
    bgClass: 'bg-orange-500/10',
    borderClass: 'border-orange-500/30',
    Icon: ShieldAlert,
    headline: 'Des failles importantes exposent votre entreprise',
    description: "Plusieurs vulnérabilités critiques sont présentes. Un ransomware, une fraude au président ou une compromission de messagerie pourrait frapper à tout moment. Les dégâts seraient significatifs sans protection adaptée.",
    statLine: "63 % des PME avec ce profil ont subi au moins un incident cyber en 2025.",
  },
  medium: {
    label: 'MODÉRÉ',
    color: '#eab308',
    bgClass: 'bg-yellow-500/10',
    borderClass: 'border-yellow-500/30',
    Icon: AlertTriangle,
    headline: 'Des points de fragilité subsistent',
    description: "Vous avez mis en place certaines mesures, mais des lacunes persistent. Un attaquant motivé pourrait exploiter ces failles. Renforcez votre posture pour réduire significativement votre exposition.",
    statLine: "42 % des entreprises avec ce profil subissent un incident dans les 24 mois.",
  },
  low: {
    label: 'MAÎTRISÉ',
    color: '#22c55e',
    bgClass: 'bg-green-500/10',
    borderClass: 'border-green-500/30',
    Icon: Shield,
    headline: 'Bonne posture, restez vigilant',
    description: "Votre entreprise a mis en place les fondamentaux de la cybersécurité. Continuez à maintenir vos mesures à jour et assurez-vous que votre couverture assurantielle est alignée avec votre exposition réelle.",
    statLine: "Même bien protégé, le risque zéro n'existe pas. L'assurance cyber reste votre filet de sécurité.",
  },
};

function getRecommendations(answers: Record<string, number>): { icon: typeof XCircle; text: string; urgent: boolean }[] {
  const recs: { icon: typeof XCircle; text: string; urgent: boolean }[] = [];

  if ((answers['mfa'] ?? 0) >= 4)
    recs.push({ icon: XCircle, text: "URGENT : Activez l'authentification multifacteur (MFA) sur tous vos comptes critiques immédiatement. C'est la mesure #1 contre le vol d'identifiants.", urgent: true });
  else if ((answers['mfa'] ?? 0) >= 2)
    recs.push({ icon: AlertTriangle, text: "Étendez le MFA à tous vos comptes critiques, pas seulement certains.", urgent: false });

  if ((answers['backup'] ?? 0) >= 4)
    recs.push({ icon: XCircle, text: "URGENT : Mettez en place des sauvegardes automatiques avec stockage hors site. Sans cela, un ransomware détruira vos données sans recours.", urgent: true });
  else if ((answers['backup'] ?? 0) >= 2)
    recs.push({ icon: AlertTriangle, text: "Testez vos sauvegardes régulièrement. Une sauvegarde non testée peut être inutilisable le jour J.", urgent: false });

  if ((answers['updates'] ?? 0) >= 4)
    recs.push({ icon: XCircle, text: "URGENT : Les failles non corrigées sont la porte d'entrée principale des attaques. Activez les mises à jour automatiques.", urgent: true });

  if ((answers['training'] ?? 0) >= 3)
    recs.push({ icon: XCircle, text: "Vos collaborateurs sont votre maillon faible. Lancez immédiatement un programme de sensibilisation cyber avec exercices de phishing.", urgent: true });

  if ((answers['passwords'] ?? 0) >= 4)
    recs.push({ icon: XCircle, text: "URGENT : Déployez un gestionnaire de mots de passe d'entreprise. Les mots de passe faibles ou réutilisés sont responsables de 80 % des compromissions.", urgent: true });

  if ((answers['incident-plan'] ?? 0) >= 3)
    recs.push({ icon: AlertTriangle, text: "Documentez un plan de réponse aux incidents : contacts d'urgence, procédures d'isolement, communication de crise. Chaque minute compte lors d'une attaque.", urgent: true });

  if ((answers['remote'] ?? 0) >= 4)
    recs.push({ icon: XCircle, text: "URGENT : Sécurisez vos accès distants avec un VPN et du contrôle d'appareils. Chaque accès non protégé est une porte ouverte.", urgent: true });

  if ((answers['insurance'] ?? 0) >= 3)
    recs.push({ icon: AlertTriangle, text: "Sans assurance cyber, votre entreprise supporte seule 100 % du coût d'un incident : frais d'experts, pertes d'exploitation, responsabilités. Demandez un devis.", urgent: true });

  if ((answers['downtime'] ?? 0) >= 4)
    recs.push({ icon: XCircle, text: "Votre dépendance numérique est totale. Un incident = arrêt immédiat. La couverture perte d'exploitation est indispensable.", urgent: true });

  return recs.sort((a, b) => (a.urgent === b.urgent ? 0 : a.urgent ? -1 : 1));
}

export default function RiskTestPage() {
  usePageMeta({
    title: 'Test de niveau de risque cyber | Le Cyberassureur',
    description: "Évaluez gratuitement le niveau de risque cyber de votre entreprise en 2 minutes. Recevez des recommandations personnalisées et découvrez votre score de vulnérabilité.",
    path: '/test-risque-cyber',
  });

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [gaugeAnim, setGaugeAnim] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 5;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((c) => c + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  useEffect(() => {
    if (!showResults) return;
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const target = totalScore;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setAnimatedScore(current);
      if (current >= target) clearInterval(interval);
    }, 30);
    setTimeout(() => setGaugeAnim(true), 200);
    return () => clearInterval(interval);
  }, [showResults, totalScore]);

  const restart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResults(false);
    setAnimatedScore(0);
    setGaugeAnim(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const risk = getRiskLevel(totalScore);
  const config = riskConfig[risk];
  const recommendations = getRecommendations(answers);
  const pct = (totalScore / maxScore) * 100;
  const question = questions[currentQ];

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main page-main--spacious">
        <div className="mx-auto max-w-4xl px-4">

          {/* Header section */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]" style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171' }}>
              <ShieldAlert className="h-4 w-4" />
              <span>Évaluation gratuite en 2 min</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Quel est votre niveau de <span style={{ color: '#ef4444' }}>risque cyber</span> ?
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Répondez à {questions.length} questions pour découvrir les vulnérabilités de votre entreprise et recevoir des recommandations immédiates.
            </p>
          </div>

          {!showResults ? (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span className="text-gray-400">Question {currentQ + 1} / {questions.length}</span>
                  <span className="text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--surface-muted)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: progress < 40 ? '#22d3ee' : progress < 70 ? '#eab308' : progress < 100 ? '#f97316' : '#ef4444',
                    }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div
                key={question.id}
                className="animate-slide-up rounded-3xl border p-6 shadow-2xl sm:p-10"
                style={{
                  background: 'var(--surface-base)',
                  borderColor: 'var(--border-soft)',
                }}
              >
                <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{question.text}</h2>
                {question.helpText && (
                  <p className="mb-8 text-sm text-gray-400">{question.helpText}</p>
                )}

                <div className="space-y-3">
                  {question.options.map((opt, idx) => {
                    const isSelected = answers[question.id] === opt.score;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(question.id, opt.score)}
                        className="group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5"
                        style={{
                          background: isSelected ? 'var(--accent-soft)' : 'var(--surface-soft)',
                          borderColor: isSelected ? 'var(--border-strong)' : 'var(--border-soft)',
                        }}
                      >
                        <span
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all"
                          style={{
                            background: isSelected ? 'var(--accent)' : 'var(--surface-muted)',
                            color: isSelected ? '#020617' : 'var(--text-muted)',
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-base font-medium text-white sm:text-lg">{opt.label}</span>
                        <ChevronRight className="ml-auto h-5 w-5 text-gray-500 transition-transform group-hover:translate-x-1" />
                      </button>
                    );
                  })}
                </div>

                {/* Nav buttons */}
                {currentQ > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentQ((c) => c - 1)}
                    className="mt-6 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
                  >
                    ← Question précédente
                  </button>
                )}
              </div>
            </>
          ) : (
            /* ==================== RESULTS ==================== */
            <div ref={resultsRef} className="space-y-8 animate-slide-up">

              {/* Score card */}
              <div
                className="overflow-hidden rounded-3xl border shadow-2xl"
                style={{ borderColor: config.color + '33', background: 'var(--surface-base)' }}
              >
                <div className="p-8 text-center sm:p-12">
                  {/* Animated gauge */}
                  <div className="relative mx-auto mb-6 h-48 w-48">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-muted)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke={config.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        strokeDashoffset={gaugeAnim ? `${2 * Math.PI * 42 * (1 - pct / 100)}` : `${2 * Math.PI * 42}`}
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black" style={{ color: config.color }}>{animatedScore}</span>
                      <span className="text-sm text-gray-400">/ {maxScore}</span>
                    </div>
                  </div>

                  {/* Risk badge */}
                  <div
                    className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-black uppercase tracking-widest"
                    style={{
                      borderColor: config.color + '44',
                      background: config.color + '18',
                      color: config.color,
                    }}
                  >
                    <config.Icon className="h-5 w-5" />
                    Risque {config.label}
                  </div>

                  <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{config.headline}</h2>
                  <p className="mx-auto max-w-2xl text-lg text-gray-300">{config.description}</p>

                  {/* Scary stat */}
                  <div
                    className="mx-auto mt-6 max-w-xl rounded-2xl border p-4"
                    style={{
                      borderColor: config.color + '33',
                      background: config.color + '0d',
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: config.color }}>
                      ⚠️ {config.statLine}
                    </p>
                  </div>
                </div>

                {/* Pulse bar */}
                {(risk === 'critical' || risk === 'high') && (
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${config.color}, ${config.color}88, ${config.color})`, animation: 'pulse 2s ease-in-out infinite' }} />
                )}
              </div>

              {/* Recommendations */}
              <div
                className="rounded-3xl border p-6 shadow-xl sm:p-10"
                style={{ background: 'var(--surface-base)', borderColor: 'var(--border-soft)' }}
              >
                <h3 className="mb-6 text-2xl font-bold text-white">
                  🔍 Vos recommandations personnalisées
                </h3>
                <div className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-2xl border p-4"
                      style={{
                        borderColor: rec.urgent ? 'rgba(239,68,68,0.25)' : 'var(--border-soft)',
                        background: rec.urgent ? 'rgba(239,68,68,0.06)' : 'var(--surface-soft)',
                      }}
                    >
                      <rec.icon
                        className="mt-0.5 h-5 w-5 flex-shrink-0"
                        style={{ color: rec.urgent ? '#ef4444' : '#eab308' }}
                      />
                      <p className="text-sm font-medium leading-relaxed text-gray-200">{rec.text}</p>
                    </div>
                  ))}
                  {recommendations.length === 0 && (
                    <div className="flex items-start gap-4 rounded-2xl border p-4" style={{ borderColor: 'rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.06)' }}>
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: '#22c55e' }} />
                      <p className="text-sm font-medium leading-relaxed text-gray-200">
                        Votre posture cyber est solide. Continuez à maintenir vos mesures de protection à jour.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div
                className="rounded-3xl border p-8 text-center shadow-2xl sm:p-12"
                style={{
                  background: risk === 'low' ? 'var(--surface-base)' : `linear-gradient(135deg, ${config.color}11, var(--surface-base), ${config.color}08)`,
                  borderColor: config.color + '33',
                }}
              >
                <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                  {risk === 'critical' || risk === 'high'
                    ? "Ne restez pas exposé. Agissez maintenant."
                    : "Vérifiez que votre couverture est à la hauteur."}
                </h3>
                <p className="mx-auto mb-8 max-w-xl text-gray-300">
                  {risk === 'critical' || risk === 'high'
                    ? "Chaque jour sans protection augmente votre exposition. Un devis prend 2 minutes et peut éviter des dizaines de milliers d'euros de pertes."
                    : "Même bien protégé, une assurance cyber reste indispensable pour couvrir les pertes résiduelles et l'imprévu."}
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link
                    to="/devis-assurance-cyber#devis-cyber"
                    className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105"
                    style={{ background: risk === 'critical' ? '#ef4444' : risk === 'high' ? '#f97316' : 'var(--accent)' }}
                  >
                    Recevoir mon devis gratuit
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Refaire le test
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
