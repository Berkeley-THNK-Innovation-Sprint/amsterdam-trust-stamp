import { useState } from "react";
import { Beer, ShoppingCart, Menu, User, ChevronRight, MapPin, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";
import AmsterdamTrustBadge from "./AmsterdamTrustBadge";
import TrustDetailPanel from "./TrustDetailPanel";

const MockHeinekenApp = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen bg-background overflow-hidden font-sans">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <Menu className="w-5 h-5 text-foreground" />
        <span className="font-display font-bold text-foreground text-lg tracking-tight" style={{ color: "hsl(var(--heineken-green))" }}>Heineken</span>
        <ShoppingCart className="w-5 h-5 text-foreground" />
      </div>

      {/* Hero banner */}
      <div className="relative h-56 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--heineken-green)), hsl(var(--heineken-green-dark)))" }}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full opacity-10 bg-white" />
        
        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">AI-Powered</p>
            <h2 className="text-white text-xl font-display font-bold mt-1">Personalized<br/>Beer Finder</h2>
            <p className="text-white/60 text-sm mt-2">AI recommends brews based on your taste profile</p>
          </div>
          
          {/* Badge on banner */}
          <div className="absolute top-4 right-4">
            <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="md" approved={false} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-4 space-y-4">
        {/* AI recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-card border border-border shadow-sm"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">AI Pick For You</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--heineken-green))" }}>
              <Beer className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">Heineken Silver</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <Star className="w-3 h-3" /> 4.2 · Light Lager · 4% ABV
              </div>
            </div>
            <span className="font-display font-bold text-foreground">€2.49</span>
          </div>
        </motion.div>

        {/* Delivery option */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary">
            <Truck className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-foreground text-sm">Deliver to home</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3" /> Prinsengracht 263, Amsterdam
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* Trust warning callout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowDetails(true)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/15 hover:bg-destructive/10 transition-colors text-left"
        >
          <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="sm" approved={false} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-semibold text-foreground">Not Amsterdam Approved</p>
            <p className="text-xs text-muted-foreground">Tap to see why this app didn't pass evaluation</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.button>

        {/* Order button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full py-4 rounded-2xl font-display font-bold text-base tracking-wide text-white hover:opacity-90 transition-opacity"
          style={{ background: "hsl(var(--heineken-green))" }}
        >
          Add to Cart
        </motion.button>
      </div>

      {/* Detail panel */}
      <TrustDetailPanel
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        appName="Heineken AI"
        approved={false}
        scores={{ freedom: 35, openness: 25, connection: 40, inclusivity: 30, sustainability: 45 }}
      />
    </div>
  );
};

export default MockHeinekenApp;
