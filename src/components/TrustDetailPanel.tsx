import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Leaf, Heart, Scale, Shield, Database, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import TrustUserControls from "./TrustUserControls";
import TrustGuidanceSection from "./TrustGuidanceSection";

interface Dimension {
  name: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface TrustScores {
  freedom: number;
  openness: number;
  connection: number;
  inclusivity: number;
  sustainability: number;
  dataStorage: number;
}

interface TrustDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  approved?: boolean;
  scores?: TrustScores;
}

const defaultScores: TrustScores = {
  freedom: 92,
  openness: 85,
  connection: 78,
  inclusivity: 81,
  sustainability: 70,
  dataStorage: 88,
};

const buildDimensions = (scores: TrustScores): Dimension[] => [
  {
    name: "Data Access & Control",
    score: scores.freedom,
    maxScore: 100,
    icon: <Shield className="w-5 h-5" />,
    description: "Who is accessing your data, when, where, and for what purpose. Can you control this access? What portion of your information is being accessed? Assessed per EU AI Act (2024) Art. 13–15 transparency requirements and Amsterdam's Algoritmeregister. Full data lineage tracking, granular consent, EU-only processing, right to deletion, and no third-party access without explicit permission.",
    color: "hsl(var(--trust-green))",
  },
  {
    name: "Data Storage & Compliance",
    score: scores.dataStorage,
    maxScore: 100,
    icon: <Database className="w-5 h-5" />,
    description: "Where your data physically resides and who can access it. Validated against GDPR (EU 2016/679), the Dutch Uitvoeringswet AVG (UAVG), and Amsterdam's municipal data ordinances. Covers data residency within EU borders, encryption at rest (AES-256) and in transit (TLS 1.3), retention policies, cross-border transfer safeguards under Schrems II, and right-to-erasure compliance.",
    color: "hsl(var(--amsterdam-navy))",
  },
  {
    name: "Openness & Transparency",
    score: scores.openness,
    maxScore: 100,
    icon: <Eye className="w-5 h-5" />,
    description: "Rooted in Amsterdam's centuries-old tradition of tolerance and open-mindedness — identified as a core value by Glocalities research among 500+ Amsterdammers (2023, Embassy of the Free Mind). Algorithm documentation is publicly listed in the Amsterdam Algoritmeregister, AI decisions are explainable in plain language per EU AI Act Art. 13, and regular independent audits ensure accountability.",
    color: "hsl(var(--trust-blue))",
  },
  {
    name: "Human Connection",
    score: scores.connection,
    maxScore: 100,
    icon: <Heart className="w-5 h-5" />,
    description: "Glocalities research identifies 'making and maintaining connections' as a defining trait of Amsterdam's soul — the city as a melting pot where diverse people come together. This AI keeps humans in the loop per EU AI Act Art. 14: you can always reach a real person, request reasoning behind decisions, and provide feedback that shapes the service. Aligned with Gemeente Amsterdam's Agenda Digitale Stad principles.",
    color: "hsl(var(--amsterdam-red))",
  },
  {
    name: "Inclusivity & Equality",
    score: scores.inclusivity,
    maxScore: 100,
    icon: <Scale className="w-5 h-5" />,
    description: "Amsterdam's commitment to social and economic equality is documented as a core value in the Glocalities Soul of Amsterdam study — with 46% of residents identifying as 'Creatives' driven by fairness and emancipation. AI is tested for bias across demographics per the EU AI Act Annex III high-risk criteria, pricing is fair and non-discriminatory, and services are accessible to all residents regardless of background. Aligned with Amsterdam's Anti-Discrimination Action Plan.",
    color: "hsl(var(--trust-amber))",
  },
  {
    name: "Duurzaamheid",
    score: scores.sustainability,
    maxScore: 100,
    icon: <Leaf className="w-5 h-5" />,
    description: "Amsterdam has always looked forward — the Glocalities study shows sustainability as a shared priority among Amsterdammers. AI models run on renewable-energy servers aligned with Amsterdam's Climate Neutral 2050 roadmap, route optimization reduces CO₂ emissions by 18%, and the platform reports its environmental footprint per the EU Corporate Sustainability Reporting Directive (CSRD).",
    color: "hsl(var(--trust-amber))",
  },
];

const APPROVAL_THRESHOLD = 60;

const TrustDetailPanel = ({ isOpen, onClose, appName, approved = true, scores }: TrustDetailPanelProps) => {
  const [expandedDim, setExpandedDim] = useState<string | null>(null);
  const [showDimensions, setShowDimensions] = useState(false);
  const dimensions = buildDimensions(scores ?? defaultScores);
  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-card shadow-2xl"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${approved ? "bg-accent" : "bg-destructive"}`} />
                    <span className={`text-xs font-display font-semibold tracking-widest uppercase ${approved ? "text-accent" : "text-destructive"}`}>
                      {approved ? "Amsterdam Verified" : "Not Approved"}
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground">
                    AI Trust Report
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {appName} · City of Amsterdam
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Overall score with integrated dimension dropdown */}
              <div className={`rounded-2xl mb-4 overflow-hidden border-2 ${
                approved 
                  ? "bg-gradient-to-br from-trust-green/10 via-card to-trust-blue/10 border-trust-green/30" 
                  : "bg-gradient-to-br from-destructive/10 via-card to-trust-amber/10 border-destructive/30"
              }`}>
                <button
                  onClick={() => setShowDimensions(!showDimensions)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="hsl(var(--border))" strokeWidth="3.5" fill="none" />
                      <circle
                        cx="24" cy="24" r="20"
                        stroke={approved ? "hsl(var(--trust-green))" : "hsl(var(--destructive))"}
                        strokeWidth="3.5" fill="none" strokeLinecap="round"
                        strokeDasharray={`${(overallScore / 100) * 125.7} 125.7`}
                      />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-sm font-display font-bold ${approved ? "text-trust-green" : "text-destructive"}`}>
                      {overallScore}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-display font-bold text-sm">Overall Trust Score</p>
                    <p className={`text-[11px] font-medium ${approved ? "text-trust-green" : "text-destructive"}`}>
                      {approved ? "✓ Verified · 6 dimensions" : `⚠ Below ${APPROVAL_THRESHOLD}% — action needed`}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${showDimensions ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showDimensions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-1">
                        {dimensions.map((dim, i) => {
                          const passing = dim.score >= APPROVAL_THRESHOLD;
                          const isDimOpen = expandedDim === dim.name;
                          const scoreColor = passing ? dim.color : "hsl(var(--destructive))";
                          return (
                            <div key={dim.name} className={`rounded-xl overflow-hidden transition-colors ${isDimOpen ? "bg-secondary/60" : "hover:bg-secondary/40"}`}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setExpandedDim(isDimOpen ? null : dim.name); }}
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 text-left"
                              >
                                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ color: scoreColor }}>{dim.icon}</span>
                                <span className="flex-1 font-display font-medium text-foreground text-xs">{dim.name}</span>
                                <div className="w-14 h-1.5 rounded-full bg-border flex-shrink-0">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                                    transition={{ delay: 0.05 + i * 0.03, duration: 0.5, ease: "easeOut" }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: scoreColor }}
                                  />
                                </div>
                                <span className="font-display font-bold text-xs w-7 text-right" style={{ color: scoreColor }}>{dim.score}</span>
                                {passing 
                                  ? <CheckCircle className="w-3.5 h-3.5" style={{ color: scoreColor }} /> 
                                  : <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                                    </motion.div>
                                }
                                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isDimOpen ? "rotate-180" : ""}`} />
                              </button>
                              <AnimatePresence>
                                {isDimOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-3 pb-2.5 ml-7">
                                      {!passing && (
                                        <div className="flex items-center gap-1.5 mb-1.5 px-2 py-1 rounded-md bg-destructive/10 border border-destructive/20 w-fit">
                                          <AlertTriangle className="w-3 h-3 text-destructive" />
                                          <span className="text-[10px] font-semibold text-destructive">Action needed — score below {APPROVAL_THRESHOLD}</span>
                                        </div>
                                      )}
                                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                                        {dim.description}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Approval status banner */}
              {!approved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/15 mb-4"
                >
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Why this app wasn't approved</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      Scored below {APPROVAL_THRESHOLD}/100 on multiple dimensions.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* User access controls */}
              <TrustUserControls />

              {/* Guidance & education */}
              <TrustGuidanceSection />

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-border text-center">
                <p className="text-[10px] text-muted-foreground">
                  Amsterdam AI Trust Framework v1.0 · Gemeente Amsterdam · Glocalities
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TrustDetailPanel;
