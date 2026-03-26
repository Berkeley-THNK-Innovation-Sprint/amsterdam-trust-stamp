import { useState } from "react";
import { Heart, Activity, Menu, User, ChevronRight, Shield, FileText, CalendarDays, Pill } from "lucide-react";
import { motion } from "framer-motion";
import AmsterdamTrustBadge from "./AmsterdamTrustBadge";
import TrustDetailPanel from "./TrustDetailPanel";

const MockHealthApp = ({ approved = true }: { approved?: boolean }) => {
  const [showDetails, setShowDetails] = useState(false);
  const highScores = { freedom: 95, openness: 90, connection: 85, inclusivity: 88, sustainability: 75 };
  const lowScores = { freedom: 38, openness: 30, connection: 42, inclusivity: 35, sustainability: 28 };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen bg-background overflow-hidden font-sans">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <Menu className="w-5 h-5 text-foreground" />
        <span className="font-display font-bold text-foreground text-lg tracking-tight">MedAI</span>
        <User className="w-5 h-5 text-foreground" />
      </div>

      {/* Hero */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[hsl(200,80%,45%)] to-[hsl(210,70%,35%)]">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-16 -left-8 w-44 h-44 rounded-full opacity-10 bg-white" />

        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">AI Health Assistant</p>
            <h2 className="text-white text-xl font-display font-bold mt-1">Your Health,<br />Your Data</h2>
            <p className="text-white/60 text-sm mt-2">AI-powered diagnostics & medical records</p>
          </div>

          <div className="absolute top-4 right-4">
            <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="md" approved={approved} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-4 space-y-4">
        {/* Health summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-card border border-border shadow-sm"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Today's Health Summary</p>
          <div className="grid grid-cols-3 gap-3">
            <HealthStat icon={<Heart className="w-4 h-4" />} label="Heart Rate" value="72 bpm" />
            <HealthStat icon={<Activity className="w-4 h-4" />} label="Blood Pressure" value="120/80" />
            <HealthStat icon={<Pill className="w-4 h-4" />} label="Medication" value="On track" />
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary">
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-foreground text-sm">Dr. van der Berg</span>
            <p className="text-xs text-muted-foreground mt-0.5">AI pre-screening ready · Tomorrow 10:00</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* AI diagnosis card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-foreground text-sm">AI Symptom Analysis</span>
            <p className="text-xs text-muted-foreground mt-0.5">Your medical data stays within EU servers</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* Trust callout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          onClick={() => setShowDetails(true)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl ${approved ? "bg-primary/5 border border-primary/10 hover:bg-primary/10" : "bg-destructive/5 border border-destructive/15 hover:bg-destructive/10"} transition-colors text-left`}
        >
          <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="sm" approved={approved} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-semibold text-foreground">{approved ? "Amsterdam AI Verified" : "Not Amsterdam Approved"}</p>
            <p className="text-xs text-muted-foreground">{approved ? "Your health data is protected · Tap for details" : "Tap to see why this app didn't pass evaluation"}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.button>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-base tracking-wide hover:opacity-90 transition-opacity"
        >
          Start AI Consultation
        </motion.button>
      </div>

      <TrustDetailPanel
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        appName="MedAI"
        approved={approved}
        scores={approved ? highScores : lowScores}
      />
    </div>
  );
};

const HealthStat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="text-center p-2 rounded-lg bg-secondary/50">
    <div className="flex justify-center text-primary mb-1">{icon}</div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

export default MockHealthApp;
