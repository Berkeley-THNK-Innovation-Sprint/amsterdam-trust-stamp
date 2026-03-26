import { useState } from "react";
import { TrendingUp, CreditCard, Menu, Bell, ChevronRight, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import AmsterdamTrustBadge from "./AmsterdamTrustBadge";
import TrustDetailPanel from "./TrustDetailPanel";

const MockFinanceApp = ({ approved = false }: { approved?: boolean }) => {
  const [showDetails, setShowDetails] = useState(false);
  const highScores = { freedom: 90, openness: 88, connection: 82, inclusivity: 85, sustainability: 78 };
  const lowScores = { freedom: 30, openness: 20, connection: 25, inclusivity: 35, sustainability: 40 };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen bg-background overflow-hidden font-sans">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <Menu className="w-5 h-5 text-foreground" />
        <span className="font-display font-bold text-foreground text-lg tracking-tight">WealthBot</span>
        <Bell className="w-5 h-5 text-foreground" />
      </div>

      {/* Hero */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[hsl(260,50%,30%)] to-[hsl(280,40%,20%)]">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-16 -left-8 w-44 h-44 rounded-full opacity-10 bg-white" />

        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">AI Investment Advisor</p>
            <h2 className="text-white text-xl font-display font-bold mt-1">Smart Money,<br />Zero Oversight</h2>
            <p className="text-white/60 text-sm mt-2">AI trades & manages your portfolio automatically</p>
          </div>

          <div className="absolute top-4 right-4">
            <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="md" approved={approved} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-4 space-y-4">
        {/* Portfolio summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-card border border-border shadow-sm"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">AI-Managed Portfolio</p>
          <p className="text-2xl font-display font-bold text-foreground">€24,381.50</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-trust-green" />
            <span className="text-sm text-trust-green font-semibold">+3.2%</span>
            <span className="text-xs text-muted-foreground ml-1">this month</span>
          </div>
        </motion.div>

        {/* Recent AI trades */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-2"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Recent AI Decisions</p>
          <TradeItem name="Bought ASML" amount="+€1,200" positive desc="AI decided autonomously" />
          <TradeItem name="Sold Shell plc" amount="-€800" positive={false} desc="No explanation provided" />
        </motion.div>

        {/* Risk alert */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary">
            <PiggyBank className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-foreground text-sm">Credit Score Sharing</span>
            <p className="text-xs text-muted-foreground mt-0.5">Your data shared with 14 third parties</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* Trust warning */}
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
            <p className="text-xs text-muted-foreground">{approved ? "Your financial data is protected · Tap for details" : "Lacks transparency in AI trading decisions"}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.button>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="w-full py-4 rounded-2xl bg-foreground text-background font-display font-bold text-base tracking-wide hover:opacity-90 transition-opacity"
        >
          Start Investing
        </motion.button>
      </div>

      <TrustDetailPanel
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        appName="WealthBot"
        approved={approved}
        scores={approved ? highScores : lowScores}
      />
    </div>
  );
};

const TradeItem = ({ name, amount, positive, desc }: { name: string; amount: string; positive: boolean; desc: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${positive ? "bg-trust-green/10" : "bg-destructive/10"}`}>
      {positive ? <ArrowUpRight className="w-4 h-4 text-trust-green" /> : <ArrowDownRight className="w-4 h-4 text-destructive" />}
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
    <span className={`text-sm font-display font-bold ${positive ? "text-trust-green" : "text-destructive"}`}>{amount}</span>
  </div>
);

export default MockFinanceApp;
