import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, ChevronDown, ChevronUp, Shield, Gift } from "lucide-react";

interface PrivacyControl {
  id: string;
  label: string;
  description: string;
  impactLabel: string;
  impactScore: number;
  defaultEnabled: boolean;
  isLowStakes?: boolean;
}

const privacyControls: PrivacyControl[] = [
  {
    id: "dob-sharing",
    label: "Share date of birth",
    description: "Improve matching with relevant service providers. Only used by internal algorithms — no human access.",
    impactLabel: "+3 service quality",
    impactScore: -2,
    defaultEnabled: true,
  },
  {
    id: "location-access",
    label: "Location: While Using App only",
    description: "Restrict from 'Always' to 'While Using' to improve your privacy posture.",
    impactLabel: "+5 privacy",
    impactScore: 5,
    defaultEnabled: false,
  },
  {
    id: "language-pref",
    label: "Share preferred language",
    description: "Get localised tips and content. A small, safe step to experience AI personalisation with zero risk.",
    impactLabel: "+1 privacy",
    impactScore: 1,
    defaultEnabled: false,
    isLowStakes: true,
  },
  {
    id: "health-history",
    label: "Share anonymised health trends",
    description: "Contribute anonymised patterns to improve AI diagnosis accuracy. Individual data is never exposed.",
    impactLabel: "+2 community",
    impactScore: -1,
    defaultEnabled: false,
  },
  {
    id: "third-party-analytics",
    label: "Block third-party analytics",
    description: "Prevent usage data from being shared with external analytics providers.",
    impactLabel: "+4 privacy",
    impactScore: 4,
    defaultEnabled: false,
  },
  {
    id: "data-retention",
    label: "Auto-delete data after 90 days",
    description: "Automatically purge personal data every 90 days. Export available before deletion.",
    impactLabel: "+3 privacy",
    impactScore: 3,
    defaultEnabled: false,
  },
];

const TrustUserControls = () => {
  const [expanded, setExpanded] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(privacyControls.map((c) => [c.id, c.defaultEnabled]))
  );

  const privacyBoost = privacyControls.reduce(
    (sum, c) => sum + (toggles[c.id] ? c.impactScore : 0),
    0
  );

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-5 rounded-2xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3.5 text-left hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">Your Privacy Controls</p>
            <p className="text-[11px] text-muted-foreground">Adjust data sharing · try AI safely</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {privacyBoost !== 0 && (
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${privacyBoost > 0 ? "bg-trust-green/10 text-trust-green" : "bg-destructive/10 text-destructive"}`}>
              {privacyBoost > 0 ? "+" : ""}{privacyBoost}
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-3.5 pb-3.5 space-y-2"
        >
          {privacyControls.map((control) => (
            <div
              key={control.id}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg border ${control.isLowStakes ? "bg-trust-blue/5 border-trust-blue/15" : "bg-secondary/30 border-border"}`}
            >
              <button
                onClick={() => handleToggle(control.id)}
                className={`mt-0.5 w-9 h-5 rounded-full flex-shrink-0 relative transition-colors ${toggles[control.id] ? "bg-primary" : "bg-muted-foreground/20"}`}
              >
                <motion.div
                  animate={{ x: toggles[control.id] ? 16 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {control.isLowStakes && <Gift className="w-3 h-3 text-trust-blue" />}
                  <span className="text-xs font-semibold text-foreground">{control.label}</span>
                  <span className={`text-[9px] px-1 py-px rounded-full font-medium ${
                    control.isLowStakes ? "bg-trust-blue/10 text-trust-blue" :
                    control.impactScore > 0 ? "bg-trust-green/10 text-trust-green" : "bg-muted text-muted-foreground"
                  }`}>
                    {control.impactLabel}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{control.description}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
            <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <p className="text-[10px] text-muted-foreground">
              Changes apply instantly to your privacy posture.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrustUserControls;
