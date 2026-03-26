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
    description: "Who is accessing your data, when, where, and for what purpose. Can you control this access? What portion of your information is being accessed? Full data lineage tracking, granular consent, EU-only processing, right to deletion, and no third-party access without explicit permission.",
    color: "hsl(var(--trust-green))",
  },
  {
    name: "Data Storage & Compliance",
    score: scores.dataStorage,
    maxScore: 100,
    icon: <Database className="w-5 h-5" />,
    description: "Validates where and how your data is physically stored. Assessed against GDPR (EU), local municipal data ordinances, and the user's regional regulations. Covers data residency requirements, encryption at rest and in transit, retention policies, cross-border transfer safeguards, and right-to-erasure compliance.",
    color: "hsl(var(--amsterdam-navy))",
  },
  {
    name: "Openness & Transparency",
    score: scores.openness,
    maxScore: 100,
    icon: <Eye className="w-5 h-5" />,
    description: "Reflecting Amsterdam's tradition of tolerance and open-mindedness — algorithm documentation is publicly available, AI decisions are explainable in plain language, data usage logs are accessible to users, and regular independent audits ensure accountability.",
    color: "hsl(var(--trust-blue))",
  },
  {
    name: "Human Connection",
    score: scores.connection,
    maxScore: 100,
    icon: <Heart className="w-5 h-5" />,
    description: "Amsterdam thrives on making and maintaining connections. This AI keeps humans in the loop — you can always reach a real person, request reasoning behind decisions, and provide feedback that shapes the service.",
    color: "hsl(var(--amsterdam-red))",
  },
  {
    name: "Inclusivity & Equality",
    score: scores.inclusivity,
    maxScore: 100,
    icon: <Scale className="w-5 h-5" />,
    description: "Rooted in Amsterdam's commitment to social and economic equality — the AI is tested for bias across demographics, pricing is fair and non-discriminatory, and the service is accessible to all residents regardless of background.",
    color: "hsl(var(--trust-amber))",
  },
  {
    name: "Duurzaamheid",
    score: scores.sustainability,
    maxScore: 100,
    icon: <Leaf className="w-5 h-5" />,
    description: "Amsterdam has always looked forward. AI models run on renewable-energy servers, route optimization reduces CO₂ emissions by 18%, and the platform reports its environmental footprint transparently.",
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
              <div className={`rounded-2xl mb-4 overflow-hidden ${approved ? "bg-primary" : "bg-destructive"}`}>
                <button
                  onClick={() => setShowDimensions(!showDimensions)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div className="relative w-11 h-11 flex-shrink-0">
                    <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="hsla(0,0%,100%,0.15)" strokeWidth="4" fill="none" />
                      <circle
                        cx="24" cy="24" r="20"
                        stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"
                        strokeDasharray={`${(overallScore / 100) * 125.7} 125.7`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-display font-bold text-white">
                      {overallScore}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-display font-bold text-sm">Overall Trust Score</p>
                    <p className="text-white/60 text-[11px]">
                      {approved ? "6 dimensions · tap to explore" : `Below ${APPROVAL_THRESHOLD}% threshold`}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${showDimensions ? "rotate-180" : ""}`} />
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
                      <div className="px-3.5 pb-3.5 space-y-0.5">
                        {dimensions.map((dim, i) => {
                          const passing = dim.score >= APPROVAL_THRESHOLD;
                          const isDimOpen = expandedDim === dim.name;
                          return (
                            <div key={dim.name}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setExpandedDim(isDimOpen ? null : dim.name); }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left"
                              >
                                <span className="scale-[0.6] text-white/80 flex-shrink-0">{dim.icon}</span>
                                <span className="flex-1 font-display font-medium text-white/90 text-[11px]">{dim.name}</span>
                                <div className="w-12 h-1 rounded-full bg-white/15 flex-shrink-0">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                                    transition={{ delay: 0.05 + i * 0.03, duration: 0.4 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: passing ? "white" : "hsl(var(--trust-amber))" }}
                                  />
                                </div>
                                <span className="font-display font-bold text-[11px] text-white w-6 text-right">{dim.score}</span>
                                {passing ? <CheckCircle className="w-2.5 h-2.5 text-white/60" /> : <AlertTriangle className="w-2.5 h-2.5 text-white/80" />}
                                <ChevronDown className={`w-2.5 h-2.5 text-white/40 transition-transform ${isDimOpen ? "rotate-180" : ""}`} />
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
                                    <p className="px-7 pb-2 text-[10px] text-white/60 leading-relaxed">
                                      {dim.description}
                                    </p>
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
