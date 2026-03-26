import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Leaf, Heart, Scale, Shield, Database, AlertTriangle, CheckCircle } from "lucide-react";
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
    name: "Data Privacy & Control",
    score: scores.freedom,
    maxScore: 100,
    icon: <Shield className="w-5 h-5" />,
    description: "The cornerstone of trust. Who can access your data, what controls you have over it, where it's stored, and how it flows. Full data lineage tracking, granular consent management, EU-only processing, right to deletion, and no third-party sharing without explicit permission.",
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
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${approved ? "bg-accent" : "bg-destructive"}`} />
                    <span className={`text-xs font-display font-semibold tracking-widest uppercase ${approved ? "text-accent" : "text-destructive"}`}>
                      {approved ? "Amsterdam Verified" : "Not Approved"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    AI Trust Report
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {appName} {approved ? "has been evaluated by" : "did not meet standards set by"} the City of Amsterdam
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Overall score */}
              <div className={`flex items-center gap-5 p-5 rounded-2xl mb-6 ${approved ? "bg-primary" : "bg-destructive"}`}>
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="hsla(0,0%,100%,0.15)" strokeWidth="5" fill="none" />
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="white"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(overallScore / 100) * 175.9} 175.9`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-display font-bold text-white">
                    {overallScore}
                  </span>
                </div>
                <div>
                  <p className="text-white font-display font-bold text-lg">
                    Overall Trust Score
                  </p>
                  <p className="text-white/70 text-sm">
                    {approved
                      ? "Based on 5 dimensions of Amsterdam's soul"
                      : `Below ${APPROVAL_THRESHOLD}% threshold for Amsterdam approval`}
                  </p>
                </div>
              </div>

              {/* Approval status banner */}
              {!approved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15 mb-4"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Why this app wasn't approved</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {appName} scored below the required threshold on multiple trust dimensions. 
                      The Amsterdam AI Trust Framework requires a minimum score of {APPROVAL_THRESHOLD}/100 on each dimension and an overall average above {APPROVAL_THRESHOLD}%.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Dimensions */}
              <div className="space-y-4">
                {dimensions.map((dim, i) => {
                  const passing = dim.score >= APPROVAL_THRESHOLD;
                  return (
                    <motion.div
                      key={dim.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className={`p-4 rounded-xl border bg-card ${passing ? "border-border" : "border-destructive/20"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: passing ? dim.color : "hsl(var(--muted))",
                              color: "white",
                            }}
                          >
                            {dim.icon}
                          </div>
                          <span className="font-display font-semibold text-foreground">{dim.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-lg text-foreground">
                            {dim.score}<span className="text-muted-foreground text-sm font-normal">/{dim.maxScore}</span>
                          </span>
                          {passing ? (
                            <CheckCircle className="w-4 h-4 text-trust-green" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: passing ? dim.color : "hsl(var(--destructive))" }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {dim.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* User privacy controls */}
              <TrustUserControls />

              {/* Guidance & education */}
              <TrustGuidanceSection />

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Evaluated under the Amsterdam AI Trust Framework v1.0 · Rooted in the Soul of Amsterdam
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gemeente Amsterdam · Bureau Digitalisering & Innovatie · Research by Glocalities
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
