import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Eye, Leaf, Heart, Scale, Compass } from "lucide-react";

interface Dimension {
  name: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface TrustDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
}

const dimensions: Dimension[] = [
  {
    name: "Vrijheid & Privacy",
    score: 92,
    maxScore: 100,
    icon: <Compass className="w-5 h-5" />,
    description: "True to Amsterdam's spirit of independence and freedom — your data stays yours. Processed within EU boundaries, never sold. You control what's shared, with full GDPR compliance and the right to opt out at any time.",
    color: "hsl(var(--trust-green))",
  },
  {
    name: "Openness & Transparency",
    score: 85,
    maxScore: 100,
    icon: <Eye className="w-5 h-5" />,
    description: "Reflecting Amsterdam's tradition of tolerance and open-mindedness — algorithm documentation is publicly available, AI decisions are explainable in plain language, and regular independent audits ensure accountability.",
    color: "hsl(var(--trust-blue))",
  },
  {
    name: "Human Connection",
    score: 78,
    maxScore: 100,
    icon: <Heart className="w-5 h-5" />,
    description: "Amsterdam thrives on making and maintaining connections. This AI keeps humans in the loop — you can always reach a real person, request reasoning behind decisions, and provide feedback that shapes the service.",
    color: "hsl(var(--amsterdam-red))",
  },
  {
    name: "Inclusivity & Equality",
    score: 81,
    maxScore: 100,
    icon: <Scale className="w-5 h-5" />,
    description: "Rooted in Amsterdam's commitment to social and economic equality — the AI is tested for bias across demographics, pricing is fair and non-discriminatory, and the service is accessible to all residents regardless of background.",
    color: "hsl(var(--amsterdam-navy))",
  },
  {
    name: "Duurzaamheid",
    score: 70,
    maxScore: 100,
    icon: <Leaf className="w-5 h-5" />,
    description: "Amsterdam has always looked forward. AI models run on renewable-energy servers, route optimization reduces CO₂ emissions by 18%, and the platform reports its environmental footprint transparently.",
    color: "hsl(var(--trust-amber))",
  },
];

const TrustDetailPanel = ({ isOpen, onClose, appName }: TrustDetailPanelProps) => {
  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-card shadow-2xl"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs font-display font-semibold tracking-widest uppercase text-accent">
                      Amsterdam Verified
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    AI Trust Report
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {appName} has been evaluated by the City of Amsterdam
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
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-primary mb-6">
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
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-display font-bold text-primary-foreground">
                    {overallScore}
                  </span>
                </div>
                <div>
                  <p className="text-primary-foreground font-display font-bold text-lg">Overall Trust Score</p>
                  <p className="text-primary-foreground/70 text-sm">
                    Based on 4 evaluated dimensions
                  </p>
                </div>
              </div>

              {/* Dimensions */}
              <div className="space-y-4">
                {dimensions.map((dim, i) => (
                  <motion.div
                    key={dim.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="p-4 rounded-xl border border-border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: dim.color, color: "white" }}
                        >
                          {dim.icon}
                        </div>
                        <span className="font-display font-semibold text-foreground">{dim.name}</span>
                      </div>
                      <span className="font-display font-bold text-lg text-foreground">
                        {dim.score}<span className="text-muted-foreground text-sm font-normal">/{dim.maxScore}</span>
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-secondary mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: dim.color }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {dim.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Evaluated under the Amsterdam AI Trust Framework v1.0 · Last assessed March 2026
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gemeente Amsterdam · Bureau Digitalisering & Innovatie
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
