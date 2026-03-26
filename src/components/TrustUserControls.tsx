import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, ChevronDown, ChevronUp, Shield } from "lucide-react";

interface PrivacyControl {
  id: string;
  label: string;
  description: string;
  impactLabel: string;
  impactScore: number;
  defaultEnabled: boolean;
  category: "data-sharing" | "location" | "personalization";
}

const privacyControls: PrivacyControl[] = [
  {
    id: "dob-sharing",
    label: "Share date of birth",
    description: "Improve matching with relevant service providers. This information is only used by internal algorithms — no human access.",
    impactLabel: "+3 to service quality",
    impactScore: -2,
    defaultEnabled: true,
    category: "data-sharing",
  },
  {
    id: "location-access",
    label: "Location access: While Using App",
    description: "Reduce from 'Always' to 'While Using App' to improve your privacy posture without impacting core functionality.",
    impactLabel: "+5 to privacy score",
    impactScore: 5,
    defaultEnabled: false,
    category: "location",
  },
  {
    id: "health-history",
    label: "Share anonymised health trends",
    description: "Contribute anonymised patterns to improve AI diagnosis accuracy for the community. Individual data is never exposed.",
    impactLabel: "+2 to community benefit",
    impactScore: -1,
    defaultEnabled: false,
    category: "data-sharing",
  },
  {
    id: "third-party-analytics",
    label: "Block third-party analytics",
    description: "Prevent usage data from being shared with external analytics providers. May reduce personalised recommendations.",
    impactLabel: "+4 to privacy score",
    impactScore: 4,
    defaultEnabled: false,
    category: "personalization",
  },
  {
    id: "data-retention",
    label: "Auto-delete data after 90 days",
    description: "Automatically purge your personal data from servers every 90 days. You can export before deletion.",
    impactLabel: "+3 to privacy score",
    impactScore: 3,
    defaultEnabled: false,
    category: "data-sharing",
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
      className="mt-6 rounded-2xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary text-primary-foreground">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">Your Privacy Controls</p>
            <p className="text-xs text-muted-foreground">Adjust data sharing to improve your trust score</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {privacyBoost !== 0 && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${privacyBoost > 0 ? "bg-trust-green/10 text-trust-green" : "bg-destructive/10 text-destructive"}`}>
              {privacyBoost > 0 ? "+" : ""}{privacyBoost} privacy
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-4 pb-4 space-y-3"
        >
          {privacyControls.map((control) => (
            <div
              key={control.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border"
            >
              <button
                onClick={() => handleToggle(control.id)}
                className={`mt-0.5 w-10 h-6 rounded-full flex-shrink-0 relative transition-colors ${toggles[control.id] ? "bg-primary" : "bg-muted-foreground/20"}`}
              >
                <motion.div
                  animate={{ x: toggles[control.id] ? 18 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{control.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${control.impactScore > 0 ? "bg-trust-green/10 text-trust-green" : "bg-muted text-muted-foreground"}`}>
                    {control.impactLabel}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{control.description}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Shield className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Changes apply instantly. Your adjusted privacy posture is reflected in real-time scoring.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrustUserControls;
